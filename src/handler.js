var docxConverter = require('docx-pdf');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const projectID = process.env.PROJECT_ID;
const keyFileName = process.env.KEYFILENAME;
const storage = new Storage({projectID, keyFileName});


const file_name  = 'output.pdf';
const bucketName = process.env.BUCKET_NAME;
async function uploadFiles(req, res) {
    const file = req.file.filename;
    const input = `./${file}`;
    docxConverter('uploads/'+ input, `uploads/${file_name}`)
    const options = {
      destination: file_name,
      
    };
    try{
    await storage.bucket(bucketName).upload(`uploads/${file_name}`, options);
    fs.rmSync(`uploads/${file_name}`, {
      force: true,
    });
  
      
    // console.log(input);
    
  } catch(error){
      console.log('Error', error)
  }
  res.json({ message: "Successfully uploaded files" });
}
module.exports = uploadFiles;