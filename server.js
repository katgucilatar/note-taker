const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = 5000;

const app = express();

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/api/notes', (req, res) => res.json(noteData));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  