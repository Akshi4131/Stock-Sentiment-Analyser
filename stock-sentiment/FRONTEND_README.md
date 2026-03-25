# Stock Sentiment Analyzer - Frontend

## 📋 Overview

A modern React-based web interface for analyzing stock sentiment from Reddit and financial news in real-time using AI-powered sentiment analysis (FinBERT).

---

## 🎨 Features

### Landing Page (Index Component)
- **Hero Section** - Eye-catching introduction
- **Features Showcase** - Quick overview of capabilities
- **How It Works** - Step-by-step explanation
- **Data Sources** - Information about Reddit & News APIs
- **Sentiment Legend** - Color-coded sentiment classification

### Analyzer Page
- **Real-time Search** - Enter any stock name
- **Dual Analysis** - Simultaneous Reddit & News sentiment
- **Visual Charts**:
  - **Pie Charts** - Overall sentiment distribution
  - **Bar Charts** - Sentiment trends over time
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during data fetch

---

## 🏗️ Project Structure

```
stock-sentiment/
├── src/
│   ├── components/
│   │   ├── Index.js              # Landing page
│   │   ├── InputForm.js          # Search form
│   │   ├── PieChartComponent.js  # Sentiment distribution
│   │   ├── BarChartComponent.js  # Trend visualization
│   │   ├── InputForm.css
│   ├── styles/
│   │   └── Index.css             # Landing page styles
│   ├── App.js                    # Main application component
│   ├── App.css                   # Application styles
│   ├── index.js
│   └── index.css
├── public/
│   ├── index.html
│   └── favicon
├── package.json
└── README.md
```

---

## 📦 Dependencies

- **React** - UI framework
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization library

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Flask backend running on `http://localhost:5000`

### Installation

```bash
# Navigate to frontend directory
cd stock-sentiment

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

---

## 🎯 How to Use

### 1. **Landing Page**
   - Click "Get Started" button to proceed to analyzer

### 2. **Search for Stock**
   - Enter stock symbol (e.g., RELIANCE, TCS, INFY)
   - Click "Search & Analyze"

### 3. **View Results**
   - **News Sentiment**:
     - Pie chart showing positive/neutral/negative ratio
     - Bar chart showing sentiment trend
   - **Reddit Sentiment**:
     - Community sentiment analysis
     - Discussion trends over time

### 4. **Return to Home**
   - Click "← Back to Home" to restart

---

## 🎨 UI Components

### Index Component
**File:** `src/components/Index.js`
- Landing page with feature showcase
- Beautiful gradient background
- Call-to-action button
- Responsive grid layouts

### InputForm Component
**File:** `src/components/InputForm.js`
- Text input for stock names
- Auto-converts to uppercase
- Submit button with loading state

### PieChartComponent
**File:** `src/components/PieChartComponent.js`
- Visualizes sentiment distribution
- Color-coded: Green (positive), Yellow (neutral), Red (negative)
- Percentage labels

### BarChartComponent
**File:** `src/components/BarChartComponent.js`
- Stacked bar chart showing sentiment trends
- X-axis: Date
- Y-axis: Count
- Color-coded bars by sentiment

---

## 🌈 Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Positive Sentiment | Green | #66bb6a |
| Neutral Sentiment | Yellow | #ffee58 |
| Negative Sentiment | Red | #ef5350 |
| Primary Button | Blue | #1976d2 |
| Background | Light Gray | #f7f9fc |

---

## 📱 Responsive Design

- **Desktop** (1200px+): Full-width charts side-by-side
- **Tablet** (768px-1199px): Stacked layout
- **Mobile** (<768px): Single column layout, full-width inputs

---

## 🔗 API Integration

### Endpoints Used

```javascript
// Reddit Sentiment Analysis
GET http://localhost:5000/analyze?stock=STOCK_NAME

// News Sentiment Analysis
GET http://localhost:5000/news-analyze?stock=STOCK_NAME
```

### Response Format

```json
{
  "sentiment_counts": {
    "positive": 15,
    "neutral": 8,
    "negative": 5
  },
  "trend_data": [
    {
      "date": "2024-03-20",
      "positive": 5,
      "neutral": 2,
      "negative": 1
    },
    ...
  ]
}
```

---

## 🛠️ Customization

### Change Colors
Edit `PieChartComponent.js` and `BarChartComponent.js`:
```javascript
const COLORS = {
  positive: '#66bb6a',
  neutral: '#ffee58',
  negative: '#ef5350'
};
```

### Modify Landing Page
Edit `src/components/Index.js` to customize:
- Hero section text
- Features list
- Data sources information
- Call-to-action buttons

### Update Styling
- Global styles: `src/App.css`
- Landing page: `src/styles/Index.css`
- Components: Individual `.css` files

---

## 🐛 Troubleshooting

### "Connection Failed" Error
- Ensure Flask backend is running on port 5000
- Check CORS configuration in Flask app
- Verify `http://localhost:5000` is accessible

### Charts Not Displaying
- Clear browser cache
- Check console for JavaScript errors
- Verify API response format

### Styling Issues
- Clear Node modules cache: `npm cache clean --force`
- Reinstall dependencies: `npm install`
- Hard reload browser: `Ctrl+Shift+R`

---

## 📊 Sample Usage

```
1. Open http://localhost:3000
2. Click "Get Started"
3. Enter "RELIANCE"
4. Wait for data to load (~3-5 seconds)
5. View sentiment charts for Reddit & News
6. Analyze trends and sentiment distribution
```

---

## 🔐 Security Notes

- API keys are stored in backend `.env` file
- Frontend makes requests to localhost
- No sensitive data stored in frontend code
- CORS configured for development

---

## 📈 Performance Tips

- Charts use `ResponsiveContainer` for dynamic sizing
- Data is cached in component state
- Loading states prevent multiple requests
- Efficient re-rendering with React hooks

---

## 🚀 Deployment

For production deployment:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy `build/` folder to hosting service
3. Update API endpoint from `localhost:5000` to production URL
4. Configure CORS for production domain

---

## 📚 Technologies

- **React 18** - UI framework
- **Recharts** - Chart library
- **Axios** - HTTP requests
- **CSS3** - Styling and animations
- **Responsive Design** - Mobile-first approach

---

## 📝 License

This project is part of the NTCC Stock Sentiment Analysis system.

---

## 🤝 Contributing

To improve the frontend:
1. Create a new branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for errors
- Verify backend is running
- Check API responses in Network tab

