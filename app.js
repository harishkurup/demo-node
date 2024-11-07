const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


function getData() {
  const dataPath = path.join(__dirname, 'data.json');
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}

// Search route
app.get('/search/:id', (req, res) => {
  const refId = req.params.id;
  const data = getData();

  // Find data by reference ID
  const item = data.find((entry) => entry.id === refId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
