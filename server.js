const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const PORT = 3001;
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) {
          console.error(error)
        } 
        res.json(JSON.parse(data)) })
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error)
   } else {
    const notes = JSON.parse(data);
    const newNote = {id:uuidv4(),...req.body};
    notes.push(newNote);
   fs.writeFile('./db/db.json', JSON.stringify(notes), (error, data) => {
    if (error) {
        console.error(error)
    } else {
        res.json(newNote);
        console.log(newNote);
        return newNote;
    };
   });
};
});
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  