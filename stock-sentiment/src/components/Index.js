import React from 'react';
import '../styles/Index.css';

function Index({ onGetStarted }) {
  return (
    <div className="index-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>📈 Stock Sentiment Analyzer</h1>
          <p>Real-time sentiment analysis from Reddit & News</p>
          <button className="cta-button" onClick={onGetStarted}>
            Get Started →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Use Our Analyzer?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Real-time Analysis</h3>
            <p>Get instant sentiment insights from Reddit discussions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>News Sentiment</h3>
            <p>Analyze latest financial news articles about stocks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Visual Trends</h3>
            <p>See sentiment trends over time with charts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>AI-Powered</h3>
            <p>Using FinBERT for accurate sentiment detection</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Enter Stock Name</h4>
            <p>Type any stock symbol (e.g., RELIANCE, TCS, INFY)</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Fetch Data</h4>
            <p>API fetches latest data from Reddit & News sources</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Analyze Sentiment</h4>
            <p>AI model processes texts and classifies sentiments</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>View Results</h4>
            <p>See beautiful charts and sentiment breakdown</p>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="data-sources">
        <h2>Data Sources</h2>
        <div className="sources-grid">
          <div className="source-card reddit">
            <h3>Reddit 🤖</h3>
            <p>Latest discussions from r/IndianStockMarket</p>
            <ul>
              <li>Real community sentiment</li>
              <li>30+ recent posts</li>
              <li>Comments analysis</li>
            </ul>
          </div>
          <div className="source-card news">
            <h3>News 📰</h3>
            <p>Financial news from NewsAPI</p>
            <ul>
              <li>Latest articles</li>
              <li>50+ articles per search</li>
              <li>Multi-source coverage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sentiment Legend */}
      <section className="legend">
        <h2>Investment Signal Classification</h2>
        <div className="legend-items">
          <div className="legend-item strong-buy">
            <span className="dot"></span>
            <div>
              <strong>Strong Buy</strong>
              <p>Very positive sentiment (Buy Signal 💹)</p>
            </div>
          </div>
          <div className="legend-item buy">
            <span className="dot"></span>
            <div>
              <strong>Buy</strong>
              <p>Positive sentiment (Moderate Buy 📈)</p>
            </div>
          </div>
          <div className="legend-item sell">
            <span className="dot"></span>
            <div>
              <strong>Sell</strong>
              <p>Negative sentiment (Moderate Sell 📉)</p>
            </div>
          </div>
          <div className="legend-item strong-sell">
            <span className="dot"></span>
            <div>
              <strong>Strong Sell</strong>
              <p>Very negative sentiment (Sell Signal ⚠️)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="index-footer">
        <p>Built with React, Flask & FinBERT | Stock Sentiment Analysis Project</p>
      </footer>
    </div>
  );
}

export default Index;
