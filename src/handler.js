const express = require('express')
var docxConverter = require('docx-pdf');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const router = express.Router();
const punycode = require('punycode');
const multer = require("multer");

const projectID = process.env.PROJECT_ID;
const keyFileName = process.env.KEYFILENAME;
const storageBucket = new Storage({projectID, keyFileName});
const bucketName = process.env.BUCKET_NAME;
const file_name  = 'output.pdf';



const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage1 });

router.post("/upload_files", upload.single("file"), async function(req, res, next){
    const file = req.file.filename;
    const input = `./${file}`;
    docxConverter('uploads/'+ input, `uploads/${file_name}`)
    const options = {
      destination: file_name,
      
    };
    try{
    await storageBucket.bucket(bucketName).upload(`uploads/${file_name}`, options);
    fs.rmSync(`uploads/${file_name}`, {
      force: true,
    });
  
      
    // console.log(input);
    
  } catch(error){
      console.log('Error', error)
  }
  res.json({ message: "Successfully uploaded files" });
})

module.exports = router;