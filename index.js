const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let locations = {};

app.post('/locations/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { lat, lng, name } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng' });
  }
  if (!locations[sessionId]) {
    locations[sessionId] = [];
  }
  locations[sessionId].push({ lat, lng, name: name || 'Unnamed' });
  res.send('Location added');
});

app.get('/locations/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  res.json({ locations: locations[sessionId] || [] });
});

// Debug endpoint
app.get('/debug', (req, res) => {
  res.json({ message: 'Debug active', locations });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
