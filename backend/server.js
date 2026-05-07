const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const mockData = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// STOCKS
// =======================
app.get('/api/stocks', (req, res) => {
  res.json(mockData.stocks);
});

app.get('/api/stocks/:symbol', (req, res) => {
  const stock = mockData.stocks.find(
    s => s.symbol.toLowerCase() === req.params.symbol.toLowerCase()
  );

  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  res.json(stock);
});

// =======================
// CRYPTO
// =======================
app.get('/api/crypto', (req, res) => {
  res.json(mockData.cryptocurrencies);
});

app.get('/api/crypto/:symbol', (req, res) => {
  const crypto = mockData.cryptocurrencies.find(
    c => c.symbol.toLowerCase() === req.params.symbol.toLowerCase()
  );

  if (!crypto) {
    return res.status(404).json({ error: 'Cryptocurrency not found' });
  }

  res.json(crypto);
});

// =======================
// PORTFOLIO
// =======================
app.get('/api/portfolio', (req, res) => {
  res.json(mockData.portfolio || {});
});

// =======================
// NEWS
// =======================
app.get('/api/news', (req, res) => {
  res.json(mockData.news || []);
});

// =======================
// ALERTS
// =======================
app.get('/api/alerts', (req, res) => {
  res.json(mockData.alerts || []);
});

// =======================
// EVENTS
// =======================
app.get('/api/events', (req, res) => {
  res.json(mockData.events || []);
});

app.get('/api/events/upcoming', (req, res) => {
  const upcoming = (mockData.events || []).filter(e => e.isUpcoming);
  res.json(upcoming);
});

// =======================
// INSIGHTS
// =======================
app.get('/api/insights', (req, res) => {
  res.json(mockData.insights || []);
});

// =======================
// INFLUENCERS
// =======================
app.get('/api/influencers', (req, res) => {
  res.json(mockData.influencers || []);
});

// =======================
// DASHBOARD
// =======================
app.get('/api/dashboard', (req, res) => {
  res.json({
    recentNews: mockData.news?.slice(0, 5) || [],
    topStocks: mockData.stocks?.slice(0, 5) || [],
    alerts: mockData.alerts?.slice(0, 5) || [],
    portfolio: mockData.portfolio || {}
  });
});

// =======================
// HEALTH CHECK
// =======================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Zenith API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// =======================
// ERROR HANDLER
// =======================
app.use(errorHandler);

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Zenith Backend running on port ${PORT}`);
  console.log(`📊 API base: /api`);
});