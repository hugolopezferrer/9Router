const express = require('express');
const path = require('path');
const TokenFlow = require('./index.js');

const app = express();
const tokenflow = new TokenFlow();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.get('/api/status', (req, res) => {
  res.json(tokenflow.getFullStatus());
});

app.get('/api/budget', (req, res) => {
  res.json(tokenflow.tokenManager.getFullReport());
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 TokenFlow Dashboard running at http://localhost:${PORT}\n`);
});
