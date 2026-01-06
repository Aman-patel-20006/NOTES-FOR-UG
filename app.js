const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const conect = require("./mongoconect.js");
const { namedata, getData, secDatafind } = require("./fuctionData/fuction.js");
const { viewLink, downloadurl } = require("./fuctionData/urlLink.js");
//mongo schema
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static, ayurveda } = require("./Model.js");
//mongos
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/subject")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(" Connection error:", err));
const dotenv = require('dotenv');
dotenv.config();

// set ejs-mate as the rendering engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res) => {
  await getData();
  res.render("main.ejs", { title: "Home Page" });  // render main.ejs
});
//forsec subj 
app.get("/sec", async (req, res) => {
  await secDatafind();
  res.render("secpage/sec.ejs");
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
app.get("/semList", (req, res) => {
  let name = req.query.name.toLocaleLowerCase();
  let sem = req.query.sem;
  res.render("semester.ejs", { name: name, sem });
})
app.get("/chapter", async (req, res) => {
  let name = req.query.name.toLocaleLowerCase();
  if (name === "sec") { res.redirect("/sec") } else {
    let data = namedata(name);
    res.render("chapter/chapterlist.ejs", { data, name })
  };
})
//pdf open karne ke liye
app.get("/allchapter", (req, res) => {
  const { title: chapterName, name } = req.query;
  // variable to store link
  let chapterData = namedata(name);
  //view link
  let srcLink = viewLink(chapterData, chapterName);
  //download link
  let downloadLink = downloadurl(srcLink);
  res.render("pdf", { srcLink, downloadLink });
})
// app.listen(8080, () => {
//   console.log("Server running on http://localhost:8080");
// });
const port = process.env.PORT;
app.listen(port, '0.0.0.0');
