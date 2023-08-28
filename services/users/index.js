const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
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

const usersRoute = require('./routes/usersRoute');

app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.send('test Var sssss' + ' ' + process.env.SERVER_PORT)
})

app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`);
});