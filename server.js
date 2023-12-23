const express = require('express')
var docxConverter = require('docx-pdf');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const multer = require("multer");
const fs = require("fs");
const projectID = process.env.PROJECT_ID;
const keyFileName = process.env.KEYFILENAME;
const storageBucket = new Storage({projectID, keyFileName});
const bucketName = process.env.BUCKET_NAME;
const date  = new Date();
const file_name = date + ".pdf";


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

app.post("/upload_files", upload.single("file"), async function(req, res){
  const file = req.file.filename;
  const file_path = `uploads/${file}`
  
  docxConverter(`uploads/${file}`, `uploads/${file_name}`, function(err, result){
    if(err){
      console.log("convert fail");
    }
      console.log("success convert");
  });
  const options = {
    destination: file_name,
    
  };
  await storageBucket.bucket(bucketName).upload(file_path, options);
  fs.rmSync(file_path, {
    force: true,
  });

res.json({ message: "Successfully uploaded files" });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})