var docxConverter = require('docx-pdf');

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
module.exports = uploadFiles;