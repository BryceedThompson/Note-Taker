// const { param } = require('express/lib/router');
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const promiseWriteFS = util.promisify(fs.writeFile);



const writeFile = (location, content) =>{
promiseWriteFS(location, JSON.stringify(content,null,4),(err) =>{
err ? console.error(err) : console.info('\nData written to ${location}')
});
};

const readAppend = (content, file) => {
    fs.readFile(file, 'utf-8',(err,data) =>{
        if (err){
            console.error(err);
        } else{
            const pars = JSON.parse(data);
            pars.push(content);
            writeFile(file, pars);
        };
    });
};

module.exports = {readFromFile, writeFile, readAppend};

