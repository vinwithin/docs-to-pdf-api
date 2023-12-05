const express = require('express')

const multer = require("multer");
const uploadFiles = require('./src/handler');
    




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
    
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/upload_files", upload.single("file"), uploadFiles)
  uploadFiles;

    


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})