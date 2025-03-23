let locations = {};

module.exports = (req, res) => {
  const { method, path } = req;
  const sessionId = path.split('/locations/')[1] || '';

  if (method === 'POST' && path.startsWith('/locations/')) {
    const { lat, lng, name } = req.body || {};
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing lat or lng' });
    }
    if (!locations[sessionId]) {
      locations[sessionId] = [];
    }
    locations[sessionId].push({ lat, lng, name: name || 'Unnamed' });
    return res.status(200).send('Location added');
  }

  if (method === 'GET' && path.startsWith('/locations/')) {
    return res.status(200).json({ locations: locations[sessionId] || [] });
  }

  if (method === 'GET' && path === '/debug') {
    return res.status(200).json({ message: 'Debug active', locations });
  }

  res.status(404).json({ error: 'Not Found' });
};
