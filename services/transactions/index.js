const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const bodyParser = require('body-parser')
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.SERVER_PORT, {
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

module.exports = app.listen(PORT, () => {
  console.log(`Transactions service running on port ${PORT}`);
});