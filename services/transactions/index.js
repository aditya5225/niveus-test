const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const { serverPort } = require('../../config/server');
const bodyParser = require('body-parser')

const mongoose = require('mongoose');

mongoose.connect(serverPort, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const transactionsRoute = require('./routes/transactionsRoute');

app.use('/transactions', transactionsRoute);

app.listen(PORT, () => {
  console.log(`Transactions service running on port ${PORT}`);
});