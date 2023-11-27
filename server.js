const express = require('express')

const multer = require("multer");

    
var docxConverter = require('docx-pdf');



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

app.post("/upload_files", upload.single("file"), uploadFiles);

    async function uploadFiles(req, res) {
        const file = req.file.filename;
        const input = `./${file}`;
        docxConverter('uploads/'+ input, 'uploads/output.pdf', function(err,result){
            if(err){
              console.log(err);
            }
            console.log('result'+result);
          });
        // console.log(input);
        res.json({ message: "Successfully uploaded files" });
    }


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})