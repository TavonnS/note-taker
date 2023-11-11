const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())
const fs = require('fs');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Develop/public/index.html');
  });

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/Develop/public/notes.html');
  });

app.get('/api/notes', (req, res) => {
    const jsonData = require('./Develop/db/db.json');
    res.json(jsonData);
  });

app.post('/api/notes', (req, res) => {
    const reqData = req.body    
    console.log(reqData)
    fs.writeFile('./Develop/db/db.json/', 'reqData', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Data has been written to the file');
    })
    
});




app.listen(PORT, (req,res) => {
    console.log(`Server is now listening on port http://localhost:${PORT}`);
});