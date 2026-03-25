# news_sentiment.py
import requests
import pandas as pd
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.nn.functional import softmax
import torch
import os
from dotenv import load_dotenv

load_dotenv()

# Set HuggingFace token if available
hf_token = os.getenv('HUGGINGFACE_TOKEN')
if hf_token:
    os.environ['HF_TOKEN'] = hf_token

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
        
        if device.type == "cpu":
            model = torch.quantization.quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8)
            
        print("Model loaded successfully!")

def batch_analyze_sentiment(texts, batch_size=16):
    _load_model()
    sentiments = []
    
    texts = [str(t) if pd.notna(t) else "" for t in texts]
    
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i+batch_size]
        inputs = tokenizer(batch_texts, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
        
        with torch.no_grad():
            outputs = model(**inputs)
            probs = softmax(outputs.logits, dim=1)
            
        for prob in probs:
            neg_score = prob[0].item()
            pos_score = prob[1].item()
            
            if pos_score > 0.65:
                sentiment_label = 'positive'
            elif neg_score > 0.65:
                sentiment_label = 'negative'
            else:
                sentiment_label = 'neutral'
            sentiments.append(sentiment_label)
            
    return sentiments

def fetch_news_and_analyze(stock_name, api_key):
    url = 'https://newsapi.org/v2/everything'
    params = {
        'q': stock_name,
        'language': 'en',
        'pageSize': 50,
        'apiKey': api_key
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise ValueError(f'NewsAPI request failed: {response.status_code}')

    articles = response.json().get('articles', [])
    if not articles:
        print(f"No news articles found for {stock_name}")
        return {'positive': 0, 'neutral': 0, 'negative': 0}, []
    
    try:
        df = pd.DataFrame(articles)[['title', 'description', 'publishedAt']]
        df.dropna(subset=['description'], inplace=True)
        
        if df.empty:
            print(f"No valid articles with description for {stock_name}")
            return {'positive': 0, 'neutral': 0, 'negative': 0}, []
        
        df['text'] = df['title'] + ". " + df['description']
        df['sentiment'] = batch_analyze_sentiment(df['text'].tolist())
        # Use today's date specifically with IST timezone, matching Reddit logic
        df['date'] = pd.Timestamp.now(tz='Asia/Kolkata').strftime('%Y-%m-%d')

        # Ensure consistent order and lowercase keys
        sentiment_counts = df['sentiment'].value_counts().reindex(['positive', 'neutral', 'negative']).fillna(0).to_dict()

        trend_data = df.groupby(['date', 'sentiment']).size().unstack(fill_value=0)
        trend_data = trend_data.reindex(columns=['positive', 'neutral', 'negative'], fill_value=0)
        trend_data = trend_data.reset_index().to_dict(orient='records')

        print(f"Processed {len(df)} news articles for {stock_name}")
        return sentiment_counts, trend_data
    except Exception as e:
        raise Exception(f"Error processing news articles: {str(e)}")

# Pre-load the AI model into memory upon server startup instead of waiting for the first query
try:
    _load_model()
except Exception as e:
    print(f"Failed to pre-load news sentiment model: {e}")
