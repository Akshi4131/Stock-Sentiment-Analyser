// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import PieChartComponent from './components/PieChartComponent';
import BarChartComponent from './components/BarChartComponent';
import SuggestionMeter from './components/SuggestionMeter';
import Index from './components/Index';
import './App.css';

function App() {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [stock, setStock] = useState('');
  const [redditCounts, setRedditCounts] = useState(null);
  const [redditTrend, setRedditTrend] = useState(null);
  const [newsCounts, setNewsCounts] = useState(null);
  const [newsTrend, setNewsTrend] = useState(null);
  const [newsName, setNewsName] = useState('');
  const [redditName, setRedditName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [correctedStock, setCorrectedStock] = useState('');
  const [wasCorrected, setWasCorrected] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stock.trim()) {
      setError('Please enter a stock name');
      return;
    }

    setLoading(true);
    setError(null);
    setCorrectedStock('');
    setWasCorrected(false);
    
    try {
      const newsRes = await axios.get(`http://localhost:5000/news-analyze?stock=${stock}`);
      setNewsCounts(newsRes.data.sentiment_counts);
      setNewsTrend(newsRes.data.trend_data);
      setNewsName(newsRes.data.stock_searched);
      
      if (newsRes.data.was_corrected) {
        setCorrectedStock(newsRes.data.stock_searched);
        setWasCorrected(true);
      }

      const redditRes = await axios.get(`http://localhost:5000/analyze?stock=${stock}`);

      setRedditCounts(redditRes.data.sentiment_counts);
      setRedditTrend(redditRes.data.trend_data);
      setRedditName(redditRes.data.stock_searched);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStock('');
    setRedditCounts(null);
    setRedditTrend(null);
    setNewsCounts(null);
    setNewsTrend(null);
    setNewsName('');
    setRedditName('');
    setError(null);
    setShowAnalyzer(false);
  };

  const getCombinedCounts = () => {
    const combined = { positive: 0, neutral: 0, negative: 0 };
    if (newsCounts) {
      combined.positive += newsCounts.positive || 0;
      combined.neutral += newsCounts.neutral || 0;
      combined.negative += newsCounts.negative || 0;
    }
    if (redditCounts) {
      combined.positive += redditCounts.positive || 0;
      combined.neutral += redditCounts.neutral || 0;
      combined.negative += redditCounts.negative || 0;
    }
    return combined;
  };

  return (
    <>
      {!showAnalyzer ? (
        <Index onGetStarted={() => setShowAnalyzer(true)} />
      ) : (
        <div className="app-container">
          <div className="app-header">
            <h1>📈 Stock Sentiment Analyzer</h1>
            <p>Analyze stock sentiment from Reddit and News in real-time</p>
            <button className="back-button" onClick={handleReset}>
              ← Back to Home
            </button>
          </div>

          <div className="form-wrapper">
            <InputForm stock={stock} setStock={setStock} handleSubmit={handleSubmit} />
          </div>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing sentiment data...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span>❌ {error}</span>
              <button onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}

          {wasCorrected && (
            <div className="correction-message">
              <span>🔍 Did you mean: <strong>{correctedStock}</strong>?</span>
            </div>
          )}

          {(newsCounts || redditCounts) && (
            <div className="analysis-section">
              <h2 className="section-title">Overall Recommendation Signal</h2>
              <div className="signals-parallel" style={{ justifyContent: 'center' }}>
                <div className="parallel-signal" style={{ width: '100%', maxWidth: '700px' }}>
                  <h3 className="signal-label">🌐 Combined Average (News + Reddit)</h3>
                  <SuggestionMeter sentimentCounts={getCombinedCounts()} />
                </div>
              </div>
            </div>
          )}

          {newsCounts && newsTrend && (
            <div className="analysis-section">
              <h2 className="section-title">📰 News Breakdown</h2>
              <div className="pie-charts">
                <div className="chart-card">
                  <h2>Donut Chart Breakdown</h2>
                  <PieChartComponent sentimentCounts={newsCounts} />
                </div>
                <div className="chart-card bar-chart-card">
                  <h2>Sentiment Trend</h2>
                  <BarChartComponent trendData={newsTrend} />
                </div>
              </div>
            </div>
          )}

          {redditCounts && redditTrend && (
            <div className="analysis-section">
              <h2 className="section-title">🤖 Reddit Breakdown</h2>
              <div className="pie-charts">
                <div className="chart-card">
                  <h2>Donut Chart Breakdown</h2>
                  <PieChartComponent sentimentCounts={redditCounts} />
                </div>
                <div className="chart-card bar-chart-card">
                  <h2>Sentiment Trend</h2>
                  <BarChartComponent trendData={redditTrend} />
                </div>
              </div>
            </div>
          )}

          {!loading && !newsCounts && !redditCounts && !error && (
            <div className="empty-state">
              <p>Enter a stock name above to analyze sentiment</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

