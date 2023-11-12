const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
app.use(express.json());

const { v4: uuidv4 } = require('uuid');


app.use(express.static('public'))
const fs = require('fs');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });

// GET api notes, a json file:

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading JSON file');
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      //send the data:
      res.json(jsonData);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).send('Error parsing JSON file');
    }
  });
});

// POST 

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    const reqData = req.body    
    
    const notes = require('./db/db.json')
    notes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Data has been written to the file');
    }) 
res.json(notes);
});

// DELETE

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  // reading the json file
  const data = JSON.parse(fs.readFileSync('./db/db.json'));

  const index = data.findIndex(item => item.id === id);

  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
      
    // success 
    res.json({ message: 'Data deleted successfully'});
    }
    else {
    // error
    res.status(404).json({ error: 'Data not found'})
    };
})


app.listen(PORT, (req,res) => {
    console.log(`Server is now listening on port http://localhost:${PORT}`);
});