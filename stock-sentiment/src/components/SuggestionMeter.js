import React, { useEffect, useState } from 'react';
import './SuggestionMeter.css';

const SuggestionMeter = ({ sentimentCounts }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!sentimentCounts) return;

    const pos = sentimentCounts.positive || 0;
    const neu = sentimentCounts.neutral || 0;
    const neg = sentimentCounts.negative || 0;
    const total = pos + neu + neg;

    if (total === 0) {
      setScore(0);
      return;
    }

    const posPct = pos / total;
    const negPct = neg / total;
    const netScore = posPct - negPct; // Range: -1 to 1

    setScore(netScore);
  }, [sentimentCounts]);

  // Determine category based on score
  let category = 'Neutral';
  let categoryClass = 'neutral';
  
  if (score <= -0.75) {
    category = 'Strong Sell';
    categoryClass = 'strong-sell';
  } else if (score < -0.25) {
    category = 'Sell';
    categoryClass = 'sell';
  } else if (score <= 0.25) {
    category = 'Neutral';
    categoryClass = 'neutral';
  } else if (score < 0.75) {
    category = 'Buy';
    categoryClass = 'buy';
  } else {
    category = 'Strong Buy';
    categoryClass = 'strong-buy';
  }

  // Convert score (-1 to 1) to percentage (0% to 100%)
  const needlePosition = ((score + 1) / 2) * 100;

  return (
    <div className="suggestion-meter-container">
      <div className="suggestion-meter-header">
        <span className="suggestion-meter-title">Recommendation Signal</span>
        <span className={`suggestion-category-badge ${categoryClass}`}>
          {category}
        </span>
      </div>
      <div style={{ padding: '0 10px' }}>
        <div className="meter-wrapper">
          <div className="meter-track"></div>
          <div 
            className="meter-needle-container" 
            style={{ left: `${needlePosition}%` }}
          >
            <div className="meter-needle"></div>
          </div>
        </div>
        
        <div className="meter-labels">
          <span>Strong Sell</span>
          <span>Sell</span>
          <span>Neutral</span>
          <span>Buy</span>
          <span>Strong Buy</span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionMeter;
