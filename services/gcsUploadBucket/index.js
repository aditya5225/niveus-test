const express = require('express');
const app = express();
const PORT = process.env.PORT || 5003;
const { serverPort } = require('../../config/server');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

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

const storage = new Storage();
const upload = multer();

app.post('/gcs_upload/upload', upload.single('file'), async (req, res) => {
  try {
    // const BUCKET_NAME = 'my-bucket';

    // if (!req.file) {
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }

    // const bucket = storage.bucket(BUCKET_NAME);
    // const blob = bucket.file(req.file.originalname);

    // const stream = blob.createWriteStream({
    //   resumable: false,
    //   contentType: req.file.mimetype,
    // });

    // stream.on('error', (err) => {
    //   return res.status(500).json({ error: 'Error uploading file to GCS' });
    // });

    // stream.on('finish', () => {
    //   return res.status(200).json({ message: 'File uploaded successfully' });
    // });

    // stream.end(req.file.buffer);

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Transactions service running on port ${PORT}`);
});