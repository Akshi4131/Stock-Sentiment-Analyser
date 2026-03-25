import praw
import re
import pandas as pd
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

reddit = praw.Reddit(client_id=os.getenv('REDDIT_CLIENT_ID'),
                     client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
                     user_agent='Scrapper/for/Senti',
                     check_for_async=False)

def clean_text(text):
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'@\S+', '', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def fetch_reddit_data(stock):
    subreddit_name = "IndianStockMarket"
    search_query = stock

    metadata = []
    texts_to_analyze = []

    for submission in reddit.subreddit(subreddit_name).search(search_query, sort='hot', limit=15):
        try:
            # Skip fetching individual post comments to drastically speed up Reddit search
            # PRAW searches take 1 second for submissions, but fetching comments for 30 posts takes ~30 seconds due to rate limits
            post_text = f"{submission.title} {submission.selftext}"
            full_text = clean_text(post_text)

            if len(full_text) < 10:  # Relaxed minimum length restriction slightly
                continue

            metadata.append({
                "post_title": submission.title,
                "post_body": submission.selftext,
                "combined_comments": "",
                "created_utc": datetime.utcfromtimestamp(submission.created_utc)
            })
            texts_to_analyze.append(full_text)
        except Exception as e:
            print(f"Skipped post due to error: {e}")
            continue

    df = pd.DataFrame(metadata)
    if df.empty:
        print(f"No Reddit posts found for {stock}")
        return df
    df['full_text'] = texts_to_analyze
    print(f"Fetched {len(df)} Reddit posts for {stock}")
    return df
