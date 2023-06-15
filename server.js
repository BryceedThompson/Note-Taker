const express = require('express');

const path = require('path');

const api = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.use('/api/notes',api);

app.use(express.static('public'));


app.use('/',(req,res) =>
res.sendFile(path.join(__dirname,'/public/index.html'))
);

app.use('/',(req,res) =>
res.sendFile(path.join(__dirname,'/public/notes.html'))
);

app.listen(PORT,() => 
console.log('app listening at http://localhost:${PORT}')
);


