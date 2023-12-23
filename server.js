const express = require('express')

const multer = require("multer");

const router = require("./src/handler")




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

app.use("/upload_files", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})