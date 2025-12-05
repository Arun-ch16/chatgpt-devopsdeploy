// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Basic request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Root endpoint for quick smoke check
app.get('/', (req, res) => {
  res.send('chatgpt-devopsdeploy — Patient Care Service');
});

// Health endpoint for k8s/cloud readiness/liveness checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Sample API endpoint
app.get('/patients', (req, res) => {
  const sample = [
    { id: 1, name: "John Doe", age: 45 },
    { id: 2, name: "Jane Smith", age: 37 }
  ];
  // optional query filter ?minAge=40
  const minAge = parseInt(req.query.minAge, 10);
  const items = !isNaN(minAge) ? sample.filter(p => p.age >= minAge) : sample;
  res.json({ items });
});

// start server
app.listen(PORT, () => {
  console.log(`chatgpt-devopsdeploy listening on ${PORT}`);
});
