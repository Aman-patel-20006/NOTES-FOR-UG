const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const conect = require("./mongoconect.js");
// const ayorData=require("./data/ayorvega.js");
//mongo schema
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static, ayurveda } = require("./Model.js");
//mongos
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/subject")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(" Connection error:", err));
const dotenv = require('dotenv');
dotenv.config()
//data define
let aecdata = [];
let chemistryData = [];
let csData = [];
let phydata = [];
let staticdata = []
let mathData = [];
let yogaData = [];
let webData = [];
let manData = [];
 let ayorData=[];
//to find mongodb data base
async function getData() {
  try {
    aecdata = await Aec.find();
    chemistryData = await chemistry.find();
    csData = await computerscience.find();
    phydata = await physics.find();
    mathData = await math.find();
    yogaData = await yoga.find();
    webData = await secWeb.find();
    staticdata = await static.find();
    manData = await manAndEnvironment.find();
    ayorData=await ayurveda.find();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData();
// set ejs-mate as the rendering engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render("main.ejs", { title: "Home Page" });  // render main.ejs
});
//forsec subj 
app.get("/sec", (req, res) => {
  res.render("secpage/sec.ejs");
})
// for subject page
app.get("/semList", (req, res) => {
  let name = req.query.name.toLocaleLowerCase();
  let sem = req.query.sem;
  res.render("semester.ejs", { name: name, sem });
})
app.get("/chapter", async (req, res) => {
  let name = req.query.name.toLocaleLowerCase();
  switch (name) {
    case "computer": res.render("chapter/chapterlist.ejs", { data: csData, name });
      break;
    case "physics": res.render("chapter/chapterlist.ejs", { data: phydata, name });
      break;
    case "aec": res.render("chapter/chapterlist.ejs", { data: aecdata, name });
      break;
    case "statistics": res.render("chapter/chapterlist.ejs", { data: staticdata, name });
      break;
    case "mathematics": res.render("chapter/chapterlist.ejs", { data: mathData, name })
      break;
    case "yoga": res.render("chapter/chapterlist.ejs", { data: yogaData, name })
      break;
    case "web designing": res.render("chapter/chapterlist.ejs", { data: webData, name })
      break;
    case "man and environment": res.render("chapter/chapterlist.ejs", { data: manData, name })
      break;
    case "chemistry": res.render("chapter/chapterlist.ejs", { data: chemistryData, name })
      break;
      case "ayurveda":res.render("chapter/chapterlist.ejs",{data:ayorData,name});
  }
})
//pdf open karne ke liye
app.get("/allchapter", (req, res) => {
  const { title: chapterName, name } = req.query;
  let srcLink = null; // variable to store link
  let chapterData = null; // variable to store data subject

  switch (name) {
    case "computer": chapterData = csData;
      break;
    case "physics": chapterData = phydata;
      break;
    case "aec": chapterData = aecdata;
      break;
    case "computer": chapterData = csData;
      break;
    case "statistics": chapterData = staticdata;
      break;
    case "mathematics": chapterData = mathData;
      break;
    case "yoga": chapterData = yogaData;
      break;
    case "web designing": chapterData = webData;
      break;
    case "man and environment": chapterData = manData;
      break;
    case "chemistry": chapterData = chemistryData;
    break;
    case "ayurveda":chapterData=ayorData;
  }
  for (const item of chapterData) {
    let Name = item.title.toLocaleLowerCase();
    if (Name === chapterName.toLocaleLowerCase()) {
      srcLink = item.src;
      break;
    } else {
      srcLink = "https://drive.google.com/file/d/1qWZW0RkCy90Wn2woazMtfd8fG3-Uu10i/view?usp=sharing"
    }
  };
  const first = srcLink.indexOf("/view");
  const part = srcLink.slice(0, first).concat("/preview");


  // Find start index of file ID
  const start = srcLink.indexOf("/d/") + 3;
  // Find end index of file ID
  const end = srcLink.indexOf("/", start);
  // Extract file ID using slice
  const fileId = srcLink.slice(start, end);
  const downloadLink = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : srcLink;
  // get from query
  res.render("pdf", { srcLink: part, downloadLink });
})
// app.listen(8080, () => {
//   console.log("Server running on http://localhost:8080");
// });
const port = process.env.PORT;
app.listen(port, '0.0.0.0');
