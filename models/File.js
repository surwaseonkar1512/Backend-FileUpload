const mongoose = require("mongoose");
const nodemailer =require("nodemailer")
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


//post middelwarer


fileSchema.post("save",async function(doc){

    try {
          
    console.log("doc:",doc);


  //transporter

  let transporter =nodemailer.createTransport({

    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
  })
 

  //sendmail

  let info = await transporter.sendMail(
    {
        from:`codehelp`,
        to:doc.email,
        subject:"new file uploded on cloudinary",
        html:`<h2>hi</h2> <p>file uploaded</p>view here:<a href="${doc.imageUrl}>${doc.imageUrl}</a>"`
    }
  )
  console.log(info);


    } catch (error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;