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
const insertData = require("./insertfile/insertData.js");
const { uploadtoken } = require("./Model.js");
//method override
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
// set ejs-mate as the rendering engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//routher
const pageRouter = require("./rought/page.js");
const Server = require("./rought/server.js");
const loginAndsignup=require("./rought/loginAndsignup.js");
// console.log(loginAndsignup);
app.use("/",loginAndsignup);
app.use("/", pageRouter);
app.use("/", Server);
app.get("/profile", (req, res) => {
   console.log(req.user);
console.log(req.session);
   res.send(req.user,req.session);
});
const expressError = require("./expressError.js");
//warp error
const asyncWrap = require("./asyncWarp/wrapError.js");
app.get("/check-title", async (req, res) => {
  await getData();
  await getDatasem2();
  await secDatafind();
  const { subject, title, Semester } = req.query;
  let databack = null;
    // console.log(subject, title, Semester );
  if (Semester.trim() == "First".trim()) {
    databack = await namedata(subject);
    // console.log("fiest sem ", databack);
  } else if (Semester.trim() == "Second") {
    databack = await namedatasem2(subject);
    //  console.log("secondsem ", databack);
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
//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message || 'Internal Server Error');
})
app.listen(port, '0.0.0.0');
