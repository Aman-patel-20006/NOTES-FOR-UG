//file upload
const { PassThrough } = require("stream");
const { google } = require("googleapis");
const multer = require("multer");
require("dotenv").config();
const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage: storage });
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const conect = require("./mongoconect.js");
const port = process.env.PORT;
const { namedata, getData, secDatafind, getDatasem2, namedatasem2 } = require("./fuctionData/fuction.js");
const { viewLink, downloadurl } = require("./fuctionData/urlLink.js");
const insertData = require("./insertfile/insertData.js");
const dotenv = require('dotenv');
dotenv.config();

// set ejs-mate as the rendering engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res) => {
  res.render("main.ejs", { title: "Home Page" });  // render main.ejs
});
//forsec subj 
app.get("/sec/:semester", async (req, res) => {
  await secDatafind();
  let semester = req.params.semester;
  res.render("secpage/sec.ejs",{semester});
})
app.get("/secChapter", (req, res) => {
  const { title: chapterName, name } = req.query;
  // variable to store link
  let chapterData = namedata(name);
  //view link
  let srcLink = viewLink(chapterData, chapterName);
  //download link
  let downloadLink = downloadurl(srcLink);
  res.render("pdf", { srcLink, downloadLink });
})
//called function
// for subject page
app.get("/semList", async (req, res) => {
  await getData();
  await getDatasem2();
  let name = req.query.name.toLocaleLowerCase();
  let sem = req.query.sem;
  res.render("semester.ejs", { name: name, sem });
})
app.get("/chapter/:semester", async (req, res) => {
  let name = req.query.name.toLowerCase();
  let semester = req.params.semester;
  let data=null;
  if (semester.trim() === "First") {
    data =await namedata(name);
  } else if (semester.trim() === "Second") {
    data = await namedatasem2(name);
  }
  if (name === "sec") { res.redirect(`/sec/${semester}`) } else {
    res.render("chapter/chapterlist.ejs", { data, name, semester })
  };
})
//pdf open karne ke liye
app.get("/allchapter/:semester", (req, res) => {
  let semester = req.params.semester;
  const { title: chapterName, name } = req.query;
  // variable to store link
  let chapterData=null;
  if (semester.trim() === "First") {
    chapterData = namedata(name);
  } else if (semester.trim() === "Second") {
    chapterData = namedatasem2(name);
  }
  //view link
  let srcLink = viewLink(chapterData, chapterName);
  //download link
  let downloadLink = downloadurl(srcLink);
  res.render("pdf", { srcLink, downloadLink });
})
//file upload 
  const link="https://notes-for-ug.onrender.com/oauth2callback"
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
   link
    // process.env.REDIRECT_URI,
  
);
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
app.get("/auth", (req, res) => {
  if (process.env.REFRESH_TOKEN) {
    return res.redirect("/upload-page");
  }
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    //  prompt: 'consent',    
    scope: SCOPES,
  });
  res.redirect(authUrl);
});
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No code received");
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    process.env.REFRESH_TOKEN = tokens.refresh_token;
    console.log(process.env.REFRESH_TOKEN, tokens.refresh_token);
    res.redirect("/upload-page");
  } catch (err) {
    console.error(err);
    res.send("Error retrieving tokens");
  }
});
app.get("/upload-page", (req, res) => {
  if (!process.env.REFRESH_TOKEN) {
    return res.redirect("/auth");
  }
  res.render("fileupload/upload.ejs");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  let { subject, title, Semester } = req.body;
  //only for sec subject
  let secSubject = req.body.secSubject;
  if (subject == "sec") {
    subject = secSubject;
  }
  if (!req.file) return res.status(400).send("No file uploaded");
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const fileMetadata = {
    name: req.file.originalname,
    //test id
      //parents: ["1y7E4ju-7WFQ3Ose3dXRqfJ0z_iLsJfR4"],// 👈 Folder where file will be uploaded
      //not test real 
    parents: ["1dzzNv8QpZYY7MhLvm4Jn_uQR2ZXF_zRW"],// 👈 Folder where file will be uploaded
  };
  const bufferStream = new PassThrough();
  bufferStream.end(req.file.buffer);
  const media = {
    mimeType: req.file.mimetype,
    body: bufferStream,
  };
  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });
  await insertData(title, `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`, subject, Semester);
  res.redirect("/");
  // res.send(`<a href="https://drive.google.com/file/d/${response.data.id}/view" target="_blank">View File</a>`);
})
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
//check validate title
app.get("/check-title", async (req, res) => {
    await getData();
  await getDatasem2();
  await secDatafind();
  const { subject, title, Semester } = req.query;
  let databack = null;
  // console.log(subject, title, Semester );
  if (Semester.trim() =="First".trim()) {
    databack = await namedata(subject);
    // console.log("fiest sem ", databack);
  } else if (Semester.trim() =="Second".trim()) {
    databack = await namedatasem2(subject);
    // console.log("secondsem ", databack);
  }
  if (!databack || !Array.isArray(databack)) {
    console.log("No data found for subject:", subject);
    return res.send("false");
  }
  const exist = databack.find(
    item => item.title.toLowerCase() === title.toLowerCase()
  );
  res.send(exist ? "true" : "false");
});
app.listen(port, '0.0.0.0');
