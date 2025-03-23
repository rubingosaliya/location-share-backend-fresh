let locations = {};

module.exports = (req, res) => {
  const { method, url } = req;
  const sessionId = url.split('/locations/')[1] || '';

  if (method === 'POST' && url.includes('/locations/')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { lat, lng, name } = JSON.parse(body || '{}');
      if (!locations[sessionId]) {
        locations[sessionId] = [];
      }
      locations[sessionId].push({ lat, lng, name: name || 'Unnamed' });
      res.status(200).send('Location added');
    });
    return;
  }

  if (method === 'GET' && url.includes('/locations/')) {
    res.status(200).json({ locations: locations[sessionId] || [] });
    return;
  }

  res.status(200).json({ message: 'Backend is live' });
};
