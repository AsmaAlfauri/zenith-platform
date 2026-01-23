
# Zenith Platform - Full Stack Market Monitoring

## Platform Mission

**Zenith Platform** is a smart market monitoring engine designed to help investors stay ahead in Stock and Crypto markets. It tracks, filters, and analyzes impactful market events, delivering only what matters, powered by AI insights with high accuracy.

## Project Overview

This is a full-stack personal project built to simulate a professional market monitoring platform. The project includes:

* **Backend**: Node.js/Express API server with realistic mock market data
* **Frontend**: React application with routing and modern UI components
* **Mock Data**: Complex market data including stocks, cryptocurrencies, news, alerts, and AI insights

## Project Structure

```
Zenith-Platform/
├── backend/
│   ├── controllers/       # Request handlers (MVC pattern)
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic layer
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── server.js          # Express API server entry point
│   ├── mockData.js        # Complex mock data for market monitoring
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── ...
│   └── package.json       # Frontend dependencies
├── SETUP.md               # Quick setup guide
└── README.md
```

## Setup Instructions

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Application will run on http://localhost:3000
```

## API Endpoints

The backend provides a comprehensive RESTful API with filtering, sorting, pagination, and statistics.

### Assets Endpoints

* `GET /api/assets` - Get all assets (stocks + crypto)
* `GET /api/assets/stocks` - Get all stocks
* `GET /api/assets/stocks/:symbol` - Get specific stock
* `GET /api/assets/crypto` - Get all cryptocurrencies
* `GET /api/assets/crypto/:symbol` - Get specific cryptocurrency
* `GET /api/assets/:symbol/history` - Get price history for an asset
* `GET /api/assets/stats` - Get market statistics

### News Endpoints

* `GET /api/news` - Get all news
* `GET /api/news/asset/:assetSymbol` - News for specific asset
* `GET /api/news/category/:category` - News by category

### Alerts Endpoints

* `GET /api/alerts` - Get all alerts
* `GET /api/alerts/critical` - Critical alerts only
* `GET /api/alerts/severity/:severity` - Alerts by severity
* `GET /api/alerts/asset/:assetSymbol` - Alerts for specific asset

### Dashboard & Portfolio

* `GET /api/dashboard` - Dashboard summary
* `GET /api/portfolio` - User portfolio data

### Events & Insights

* `GET /api/events` - All market events
* `GET /api/events/upcoming` - Upcoming events
* `GET /api/insights` - AI-powered insights
* `GET /api/influencers` - Influencer predictions

### Health Check

* `GET /api/health` - API health check

### Response Format

All endpoints return:

```json
{
  "success": true,
  "count": 10,
  "pagination": {...},
  "data": [...]
}
```

## Mock Data Structure

* **Stocks**: Example stocks with price history, alerts, sentiment, and metrics
* **Cryptocurrencies**: BTC, ETH, SOL with comprehensive data
* **News**: Market news with categories, impact, and affected assets
* **Alerts**: Real-time alerts with severity levels
* **Influencers**: Social media predictions and sentiment
* **Market Events**: Scheduled events with AI predictions
* **Portfolio**: User portfolio with assets and performance
* **AI Insights**: Pattern recognition and anomaly detection

## Backend Architecture

* **MVC Pattern**: Controllers → Services → Routes → Middleware → Utils
* Features: Pagination, filtering, sorting, validation, error handling, and aggregated statistics

## Technologies

### Backend

* Node.js, Express, CORS
* MVC architecture

### Frontend

* React, React Router, Axios
* Tailwind CSS, Recharts, Vite

### Additional

* MetaMask integration available (optional)

## Example API Usage

Get Stocks between $100–$500, sorted by price descending:

```bash
GET /api/assets?type=stock&minPrice=100&maxPrice=500&sort=price&order=desc
```

Get Technology news with "AI" keyword:

```bash
GET /api/news/category/technology?search=AI&impact=high&page=1&limit=5
```

Get Critical Alerts requiring action:

```bash
GET /api/alerts/critical?actionRequired=true
```

Get Market Statistics:

```bash
GET /api/assets/stats
```


