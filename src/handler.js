var docxConverter = require('docx-pdf');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
require('dotenv').config();

const file_name  = 'output.pdf';
const bucketName = process.env.BUCKET_NAME;
async function uploadFiles(req, res) {
    const file = req.file.filename;
    const input = `./${file}`;
    docxConverter('uploads/'+ input, `uploads/${file_name}`)
    const options = {
      destination: output,
      
    };
  
    await storage.bucket(bucketName).upload(`uploads/${file_name}`, options);
    console.log(`${file_name} uploaded to ${bucketName}`);
    fs.rmSync(`uploads/${file_name}`, {
      force: true,
    });
      
    // console.log(input);
    res.json({ message: "Successfully uploaded files" });
}
module.exports = uploadFiles;