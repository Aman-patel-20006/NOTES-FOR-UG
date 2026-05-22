const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { google } = require("googleapis");
const app = express();
const upload = multer({ dest: "uploads/" });
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
// OAuth setup
const credentials = require("../credentials.json");
const token = require("../token.json"); 
const { insertData, deleteChapter } = require("../insertfile/insertData.js");
const { namedata, getData, secDatafind, getDatasem2, namedatasem2 } = require("../fuctionData/fuction.js");
const expressError = require("../expressError.js");
const { nextTick } = require("process");
const { client_id, client_secret, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  //change redirect uri for local and production level
  //redirect_uris[0],
  //for production level
     redirect_uris[1]
);
router.use(express.urlencoded({ extended: true })); // for parsing form data
oAuth2Client.setCredentials(token);
const drive = google.drive({ version: "v3", auth: oAuth2Client });
// 🔹 1. Home page (upload form)
router.get("/upload-page", (req, res) => {
  res.render("fileupload/upload.ejs");
});
//  2. Upload API (POST)
router.post("/upload", upload.single("file"), async (req, res,next) => {
  try {
    let { subject, title, Semester,secSubject } = req.body;
    // console.log(subject, title, Semester,secSubject);
    if(!subject, !title, !Semester){
      console.log("req data not comming from fronted");
          throw new expressError("please try again some thing internal problem", 400);
    }
    // console.log(subject, title, Semester);
    if (!req.file) {
      console.log("file not comming from fronted");
            throw new expressError("please try again some thing internal problem", 400);
    }
    const file = req.file;
    const response = await drive.files.create({
      requestBody: {
        // name: file.originalname,
         name: title ||file.originalname,
       // parents: [FOLDER_ID], // 👈 yaha folder add
       parents:[ process.env.PARENTSID]
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
      fields: "id, name, webViewLink",
    });
    // delete temp file
    fs.unlinkSync(file.path);
    //for sec subject
    if(subject==="sec" || subject=="Sec"){
      subject=secSubject;
    }
    await insertData(
   title,
   `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`,
   subject,
   Semester,
   req.user._id,
);
    res.redirect("/");
  } catch (err) {
    console.error(err);
   console.log("error comming on upload file ");
   next(err);
  }
});
router.delete("/deletechapter", async (req, res, next) => {
  let { subject, Semester, objectID, fileID } = req.body;
  //  console.log(subject, Semester, objectID, fileID);
  if (!subject || !Semester || !objectID || !fileID) {
    console.log("subject data  and Semester data wrong");
      throw new expressError("please try again some thing internal problem", 400);
  }
  try {
    let result = await deleteChapter(subject, Semester, objectID, req.user._id,req.user.admin);
      //data base call
   await getData();
    await secDatafind();
    await getDatasem2();
        if (result!=null && !result.success) {
      throw new expressError(result.message, 400);
    }else if (!result) {
      console.log("result problem is comming");
      throw new expressError("please try again some thing internal problem", 400);
    }
    if (result) {
      try {
        let fileResult = await drive.files.delete({
          fileId: fileID,
        });
      } catch (err) {
        console.log("error occured on file deletion")
        //  throw new expressError("please try again some thing internal problem", 400);
      }
    }
      res.redirect(`/chapter/${Semester}?name=${subject}`);
    //  console.log(fileResult);
  } catch (err) {
    console.log("problem is coming on deletion process");
    next(err);
  }
})

// //show all flies in folder
// app.get("/files", async (req, res) => {
//   try {
//     const response = await drive.files.list({
//       pageSize: 100, // kitni files dikhani hai
//       fields: "files(id, name, webViewLink)",
//     });

//     const files = response.data.files;

//     let html = `<h2>My Files </h2>`;

//   html += `<br><a href="/">Upload File</a>`;
//     files.forEach(file => {
//       html += `
//         <div style="margin-bottom:10px;">
//           <b>${file.name}</b><br>
//           <a href="${file.webViewLink}" target="_blank">View</a> |
//           <a href="/delete/${file.id}">Delete</a>
//         </div>
//       `;
//     });



//     res.send(html);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to fetch files ");
//   }
// });

module.exports = router;