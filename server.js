const express = require('express');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

//express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//notes path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // api path
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  // Html path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // post path
  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,  "./db/db.json"), 'utf8', (err, data) => {
      let db = JSON.parse(data);
      db.push({
        id: uuid.v4(),
        ...req.body,
      });
      fs.writeFile(
        path.join(__dirname,  "./db/db.json"),
        JSON.stringify(db, null, 2),
        (err, data) => {
          if (err) throw err;
          res.json(db);
        }
      );
    });
  });

  //link through terminal
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
