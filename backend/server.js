const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");

  app.get('/api/data', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.json(data);
  });

  app.post('/api/data', async (req, res) => {
    const newData = req.body;
    await collection.insertOne(newData);
    res.json(newData);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
