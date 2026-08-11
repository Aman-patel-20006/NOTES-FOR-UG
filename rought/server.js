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
// const credentials = require("../credentials.json");
// const token = require("../uploadAccessValue.json"); 
//  const token={"access_token":"ya29.a0AT3oNZ8LVikmXdzfm1KbEnv7_kI9Mz4c4ujeMDuuj5aUHEc7rzPHqdedRQV5pg5hjmTb01ijsWOTVMaDWeZRj4smbVs6nzhxp0GJSAuBNLEGKUeJ6fsAGTax7nPmAcj0hVU7f8KhquehrOewYBStvS_U18aTVXGpreGAGv_IrEVmTmFnP10ZF3sqxXP1sZN6HwA0i7QaCgYKAeISARMSFQHGX2MiEhy30EQFki6EoiX7Z_enMQ0206","refresh_token":"1//0gFiK_9j8_FbLCgYIARAAGBASNwF-L9IrAMd1mf7S_8M9IHht6hDMkzR4UTg_yr-K_q5Elt3_u3kbzltk7_73VXmvUrufC3pprWM","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1783675836452}
const token = require("../token.json");// token access
//  const token={"access_token":"ya29.a0ARGnu0amAwWdJzjK7Zac8SxfrAP5N9hhomdNAfN5zgcUrKwL0Ozqs_Di049UjjmadMCYivs6mZwHhL9xPLTx9JfpxdJuJUrPtBHhTK79dpb7Vttd0xxC5_CQjYsevx4AIBBl1MDjGEuX0-YgsWIaKlmhkSapy990nvNAuB3odoS-Ma_aiBVbGrNSX0KDL84LGq1uwf0aCgYKAZ4SARMSFQHGX2MiIJh0XoIuv_N0DoIsYnP8Mw0206","refresh_token":"1//0gKjBvXQHr74eCgYIARAAGBASNwF-L9IrT6VMoVL6-Pby4rEA7P-uhROJg7Mcl2PfbiVPdnGQwfJ52ED3eUu8FYFqYWUh2jqUXiQ","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1786298901277};
const { insertData, deleteChapter } = require("../insertfile/insertData.js");
const { namedata, getData, secDatafind, getDatasem2, namedatasem2 } = require("../fuctionData/fuction.js");
const expressError = require("../expressError.js");
const { nextTick } = require("process");
// const { client_id, client_secret, redirect_uris } = credentials.installed;
// console.log(process.env.CLIENT_SECRET,process.env.CLIENT_ID,process.env.REDIRECT_URI);
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  // client_id,
  // client_secret,
  //change redirect uri for local and production level
  //redirect_uris[0],
  //for production level
  process.env.REDIRECT_URI
);
router.use(express.urlencoded({ extended: true })); // for parsing form data
oAuth2Client.setCredentials(token);
const drive = google.drive({ version: "v3", auth: oAuth2Client });
// 🔹 1. Home page (upload form)
router.get("/upload-page", (req, res) => {
  res.render("fileupload/upload.ejs");
});
//  2. Upload API (POST)
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    let { subject, title, Semester, secSubject, mojor_minor } = req.body;
    //  console.log(subject, title, Semester,mojor_minor);
    if (!subject, !title, !Semester) {
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
        name: title || file.originalname,
        // parents: [FOLDER_ID], // 👈 yaha folder add
        parents: [process.env.PARENTSID]
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
    if (subject === "sec" || subject == "Sec") {
      subject = secSubject;
    }
    await insertData(
      title,
      `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`,
      subject,
      Semester,
      req.user._id,
      mojor_minor
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    console.log("error comming on upload file ");
    next(err);
  }
});
// =====================Delete rought =============================
router.delete("/deletechapter", async (req, res, next) => {
  let { subject, Semester, objectID, fileID, major_minor } = req.body;
  // console.log(req.get("Referer"));
  //  console.log(subject, Semester, objectID, fileID,major_minor);
  if (!subject || !Semester || !objectID || !fileID) {
    console.log("subject data  and Semester data wrong");
    throw new expressError("please try again some thing internal problem", 400);
  }
  try {
    //data base call
    await getData();
    await secDatafind();
    await getDatasem2();
    let result = await deleteChapter(subject, Semester, objectID, req.user._id, req.user.admin, major_minor);
    if (result != null && !result.success) {
      throw new expressError(result.message, 400);
    } else if (!result) {
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
    // rediret on file afer delete 
    // res.redirect(`/chapter/${Semester}?name=${subject}`);
    let olduri = req.get("Referer");
    if (olduri) {
      res.redirect(olduri);
    } else if (major_minor) {
      res.redirect(`/chapter/${Semester}?name=${subject}&major_minor=${major_minor}`);
    } else { res.redirect(`/chapter/${Semester}?name=${subject}`); }
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