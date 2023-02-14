const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3977;
const uri = `mongodb+srv://admin:${process.env.MONGO_PSW}@cluster0.btzsiml.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err);
  }
}

connect();

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hola TinCode!' });
});
app.post('/welcome', (req, res) => {
  const { username } = req.body;
  res.status(200).send({ msg: `Hola, ${username})` });
});

app.listen(PORT, () => {
  console.log(`En marcha en: ${PORT}`);
});
