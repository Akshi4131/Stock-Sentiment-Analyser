import torch
import numpy as np
import pandas as pd
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Lazy loading - load model only on first use
tokenizer = None
model = None
device = None

def _load_model():
    global tokenizer, model, device
    if tokenizer is None:
        print("Loading sentiment model...")
        # Using a simpler model that doesn't require sentencepiece
        model_name = "distilbert-base-uncased-finetuned-sst-2-english"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSequenceClassification.from_pretrained(model_name)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.to(device)
        
        # Optimize model for CPU inference speed using dynamic quantization
        if device.type == "cpu":
            model = torch.quantization.quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8)
            
        print("Model loaded successfully!")

def batch_analyze_sentiment(texts, batch_size=16):
    _load_model()
    sentiments = []
    
    # Ensure all texts are strings to avoid tokenizer errors
    texts = [str(t) if pd.notna(t) else "" for t in texts]
    
    # Process in batches to prevent Out-Of-Memory (OOM) errors and speed up processing
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i+batch_size]
        # max_length=128 reduces computation by 16x compared to 512, massively speeding up inference
        inputs = tokenizer(batch_texts, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
        
        with torch.no_grad():
            outputs = model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=1)
            
        for prob in probs:
            # DistilBERT has 2 classes: [NEGATIVE (0), POSITIVE (1)]
            neg_score = prob[0].item()
            pos_score = prob[1].item()
            
            # Map to 3-class sentiment: positive, neutral, negative
            # High confidence in either direction, otherwise neutral
            if pos_score > 0.65:
                sentiment = "positive"
            elif neg_score > 0.65:
                sentiment = "negative"
            else:
                sentiment = "neutral"  # Low confidence = neutral
            sentiments.append(sentiment)
            
    return sentiments

def analyze_sentiment(df):
    if df is None or df.empty:
        print("Warning: Empty DataFrame received")
        return {'positive': 0, 'neutral': 0, 'negative': 0}, []
    
    if 'full_text' not in df.columns:
        print("Error: 'full_text' column not found in DataFrame")
        return {'positive': 0, 'neutral': 0, 'negative': 0}, []
    
    df['sentiment'] = batch_analyze_sentiment(df['full_text'].tolist())
    # User requested to use today's date with correct timezone for all data
    df['date'] = pd.Timestamp.now(tz='Asia/Kolkata').strftime('%Y-%m-%d')

    sentiment_counts = df['sentiment'].value_counts().reindex(['positive', 'neutral', 'negative']).fillna(0).astype(int).to_dict()
    
    # fill_value=0 stops pandas from dropping missing combinations immediately
    trend_data = df.groupby(['date', 'sentiment']).size().unstack(fill_value=0)
    
    # Ensure all sentiment columns exist for frontend consistency
    for col in ['positive', 'neutral', 'negative']:
        if col not in trend_data.columns:
            trend_data[col] = 0
            
    # Filter to only expected columns and cast to integer
    trend_data = trend_data[['positive', 'neutral', 'negative']]
    trend_data = trend_data.replace([np.inf, -np.inf], 0).fillna(0).astype(int)
    trend_data = trend_data.reset_index().to_dict(orient='records')

    return sentiment_counts, trend_data

# Pre-load the AI model into memory upon server startup instead of waiting for the first query
try:
    _load_model()
except Exception as e:
    print(f"Failed to pre-load sentiment model: {e}")
