from flask import Blueprint, request, jsonify
from .reddit_client import fetch_reddit_data
from .sentiment import analyze_sentiment
from .news_sentiment import fetch_news_and_analyze  # Import the new function for news sentiment analysis
from .spell_checker import normalize_stock_name
import os
from dotenv import load_dotenv

load_dotenv()

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return 'Welcome to the Sentiment Analysis API. Use the /analyze endpoint with a stock name.'

@bp.route('/analyze', methods=['GET'])
def analyze():
    stock = request.args.get('stock')
    if not stock:
        return jsonify({'error': 'Stock name is required'}), 400
    
    # Normalize stock name (case-insensitive + spell correction)
    normalized = normalize_stock_name(stock)
    stock_corrected = normalized['stock']
    
    try:
        print(f"Processing: /analyze?stock={stock}")
        if normalized['was_corrected']:
            print(f"Stock corrected: {stock} -> {stock_corrected}")
        
        df = fetch_reddit_data(stock_corrected)
        
        if df.empty:
            print(f"No data found for stock: {stock_corrected}")
            return jsonify({
                'sentiment_counts': {'positive': 0, 'neutral': 0, 'negative': 0},
                'trend_data': [],
                'stock_searched': stock_corrected,
                'was_corrected': normalized['was_corrected'],
                'original_input': normalized['original']
            }), 200
        
        sentiment_counts, trend_data = analyze_sentiment(df)
        return jsonify({
            'sentiment_counts': sentiment_counts,
            'trend_data': trend_data,
            'stock_searched': stock_corrected,
            'was_corrected': normalized['was_corrected'],
            'original_input': normalized['original']
        })
    except Exception as e:
        import traceback
        error_msg = str(e)
        print(f"Error analyzing {stock_corrected}: {error_msg}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to analyze stock: {error_msg}'}), 500


@bp.route('/news-analyze', methods=['GET'])
def news_analyze():
    stock = request.args.get('stock')
    if not stock:
        return jsonify({'error': 'Stock name is required'}), 400
    
    # Normalize stock name (case-insensitive + spell correction)
    normalized = normalize_stock_name(stock)
    stock_corrected = normalized['stock']
    
    api_key = os.getenv('NEWSAPI_KEY')
    if not api_key:
        return jsonify({'error': 'NewsAPI key not configured'}), 500
    
    try:
        print(f"Processing: /news-analyze?stock={stock}")
        if normalized['was_corrected']:
            print(f"Stock corrected: {stock} -> {stock_corrected}")
        
        sentiment_counts, trend_data = fetch_news_and_analyze(stock_corrected, api_key)
        return jsonify({
            'sentiment_counts': sentiment_counts,
            'trend_data': trend_data,
            'stock_searched': stock_corrected,
            'was_corrected': normalized['was_corrected'],
            'original_input': normalized['original']
        })
    except Exception as e:
        import traceback
        error_msg = str(e)
        print(f"Error analyzing news for {stock_corrected}: {error_msg}")
        print(traceback.format_exc())
        return jsonify({'error': f'Failed to fetch news: {error_msg}'}), 500