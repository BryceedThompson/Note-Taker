const notes = require('express').Router();
const{readFromFile, readAppend} = require('../helpers/fsUtils');
const {v4: uuidv4} = require('uuid');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add note`);
  console.log(req.body);

  const { title, text } = req.body;
  console.log(title)
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
     console.log(newNote);
    readAppend(newNote, './db/db.json');
    res.json(`Notes added`);
  } else {
    res.error('Err adding note');
  }
});

module.exports = notes;