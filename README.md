# 📈 Stock Sentiment Analyzer

An enterprise-grade, real-time sentiment analysis dashboard that aggregates and processes financial signals from **Reddit** and **Global News APIs**. Built with a high-performance **Python/Flask** backend using HuggingFace Transformers and a modern **React** frontend.

![Main Dashboard](https://github.com/Akshi4131/Stock-Sentiment-Analyser/raw/main/screenshots/dashboard_preview.png)

## 🚀 Key Features

- **Multi-Source Intelligence**: Scrapes real-time discussions from subreddits like `r/wallstreetbets` and `r/stocks` while simultaneously fetching global financial news.
- **AI-Powered Sentiment**: Utilizes specialized financial NLP models (`ProsusAI/finbert`) for high-accuracy sentiment classification (Positive/Negative/Neutral).
- **Unified Risk Signal**: Mathematically aggregates multiple sentiment counts into a single "Combined Average" recommendation meter (Strong Sell to Strong Buy).
- **Interactive Visualizations**: Dynamic Donut Charts and Trend Bar Charts powered by Recharts for visual data exploration.
- **Enterprise UI**: A clean, elegant light-theme dashboard designed for professional readability and 100% mobile responsiveness.
- **Performance Optimized**: Features model pre-loading and batched inference to deliver results in < 2 seconds.

## 🛠️ Technology Stack

- **Frontend**: React.js, Axios, Recharts, Lucide Icons
- **Backend**: Flask (Python 3.x), PyTorch, HuggingFace Transformers, PRAW (Reddit API)
- **Sentiment Model**: `ProsusAI/finbert` (Quantized for CPU efficiency)

## ⚙️ Setup & Installation

### Prerequisite: API Keys
Create a `.env` file in the `server/` directory:
```env
REDDIT_CLIENT_ID=your_id
REDDIT_CLIENT_SECRET=your_secret
NEWSAPI_KEY=your_newsapi_key
HUGGINGFACE_TOKEN=your_token
```

### 1. Backend Setup
```powershell
cd server

# Run server
python run.py
```

### 2. Frontend Setup
```bash
cd stock-sentiment
npm install
npm start
```

## 📱 Mobile View
The dashboard is fully responsive across mobile, tablet, and desktop viewports.

## 🌐 Deployment Guide (Recommended)

To ensure high performance for the AI models, we recommend the following professional split-deployment:

### 1. Backend (Render / Railway / AWS)
- Host the `server/` directory on a platform that supports long-running Python processes.
- Set your environment variables (`HUGGINGFACE_TOKEN`, `NEWSAPI_KEY`, etc.) in the platform's Dashboard.
- **Start Command:** `gunicorn --worker-class sync --workers 1 --timeout 120 "app:create_app()"`

### 2. Frontend (Vercel)
- Connect your GitHub repo to **Vercel**.
- **Root Directory:** Set to `stock-sentiment`.
- **Environment Variable:** Add `REACT_APP_API_URL` and set it to your deployed Backend URL (e.g., `https://your-backend.onrender.com`).
- Vercel will automatically handle the build and deployment.

---
**Created by Akshi Gupta**  
*NTCC Project - MCA*
