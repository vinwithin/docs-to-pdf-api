var docxConverter = require('docx-pdf');



docxConverter('./input.docx','./output.pdf',function(err,result){
  if(err){
    console.log(err);
  }
  console.log('result'+result);
});

