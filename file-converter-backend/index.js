
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send('File Converter API is running! Use POST /convert');
});

app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const inputPath = req.file.path;
  const outputPath = inputPath + '.converted';

  // Example conversion: rename file for now (placeholder)
  fs.rename(inputPath, outputPath, (err) => {
    if (err) return res.status(500).send('Conversion failed');

    res.download(outputPath, req.file.originalname + '.converted', (err) => {
      if (err) console.error(err);
      fs.unlink(outputPath, () => {});
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
