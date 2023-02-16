/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const ME = {
  id: {
    server: 'c.us',
    user: '5491121707442',
    _serialized: '5491121707442@c.us',
  },
};

// MONGO
const uri = `mongodb+srv://admin:${process.env.MONGO_PSW}@cluster0.btzsiml.mongodb.net/?retryWrites=true&w=majority`;

async function connectMongo() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err);
  }
}

connectMongo();

// WHAPP
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('Whatsapp on');
});

client.on('message', async (mes) => {
  console.log(mes);
  await client.sendMessage(ME.id._serialized, 'hola');
});
