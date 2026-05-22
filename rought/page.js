const express = require('express')
const router = express.Router()
// require functions
const { namedata, getData, secDatafind, getDatasem2, namedatasem2 } = require("../fuctionData/fuction.js");
const { viewLink, downloadurl } = require("../fuctionData/urlLink.js");
router.get('/', async (req, res) => {
  res.render("main.ejs");  // render main.ejs
});
//warp error
const asyncWrap = require("../asyncWarp/wrapError.js");
//error handling
const expressError = require("../expressError.js");
//forsec subj 
router.get("/sec/:semester", asyncWrap(async (req, res) => {
  await secDatafind();
  let semester = req.params.semester;
  if (!semester) {
    console.log("semester list not coming in sec path");
    throw new expressError("Some internal error occurred Please try again And refresh the page", 400);
  }
  res.render("secpage/sec.ejs", { semester });
}))
//for sec chaper view 
router.get("/secChaper/:semester", asyncWrap(async (req, res) => {
  let data = null;
  let name = (req.query.name || "").toLowerCase();
    let semester = req.params.semester;
  // console.log(name,semester);
  if (semester.trim() === "First") {
    data = await namedata(name);
  } else if (semester.trim() === "Second") {
    data = await namedatasem2(name); }
  // console.log(data);
  //same  (!data || data.length === 0)  (!data?.length)
  if (!Array.isArray(data) || !data) {
   if (!(data==null)  && data.length  == 0) { console.log("data is comming from data base but data not present") }
    else {
      console.log("data is not coming from data base please check");
    }
    data=[];
  }
  res.render("secpage/secChapter.ejs", { data, name, semester })
}
))

// for subject page
router.get("/semList", asyncWrap(async (req, res) => {
  await getData();
  await getDatasem2();
  if (!req.query.name) {
    console.log("Subject name is required");
    throw new expressError("Some internal error occurred Please try again And refresh the page", 400);
  }
  let name = req.query.name.toLocaleLowerCase();
  let sem = req.query.sem || 3;
  if(name=="sec"){  sem = (sem <= 3 && sem >= 1) ? sem : 3};
  res.render("semester.ejs", { name: name, sem });
}))
//called function
router.get("/chapter/:semester", asyncWrap(async (req, res) => {
  if (!req.query.name) {
    console.log("name is not comming in path of query and error is occured");
    throw new expressError("Some internal error occurred Please try again And refresh the page", 400);
  }
  if (!req.params.semester) {
    console.log("semester not comming and error is occured");
    throw new expressError("Some internal error occurred Please try again And refresh the page", 400);
  }
   await getData();
    await secDatafind();
    await getDatasem2();
  let name = (req.query.name || "").toLowerCase();
  let semester = req.params.semester;
  if (name === "sec") {
    res.redirect(`/sec/${semester}`)
  } else {
    let data = null;
    if (semester.trim() === "First") {
      data = await namedata(name);
    } else if (semester.trim() === "Second") {
      data = await namedatasem2(name);
    }
    //same  (!data || data.length === 0)  (!data?.length)
    if (!Array.isArray(data) || !data) {
      if (!(data==null)  && data.length  == 0){ console.log("data is comming from data base but data not present") }
      else {
        console.log("data is not coming from data base please check");
      }
      data = [];
    }
    res.render("chapter/chapterlist.ejs", { data, name, semester })
  };
}))
//pdf open karne ke liye
router.get("/viewsChapterpdf", (req, res) => {
  const { src } = req.query;
  if (!src) {
    console.log("src not comming in query");
    throw new expressError("this pdf not view please try again");
  }
  let first = src.indexOf("/view");
  let srcLink = src.slice(0, first).concat("/preview");
  //download link
  let downloadLink = downloadurl(srcLink);
  res.render("pdf", { srcLink, downloadLink });
})
// websites term and codion
router.get("/legal/:value", asyncWrap(async (req, res) => {
  let { value } = req.params;
  if (!value) {
    console.log("parameter value is not comming plesase check");
  }
  await getData();
  let chapterData = await namedata("websiteLegal");
  if (!Array.isArray(chapterData) || chapterData?.length == 0) {
    if (chapterData.length == 0) { console.log("data is coming from data base  and empty"); } else {
      console.log("data is empty no value is assined on legal path");
    }
    chapterData = await namedata("comingSoon");
  }
  let srcLink = viewLink(chapterData, value);
  //download link
  let downloadLink = downloadurl(srcLink);
  res.render("pdf", { srcLink, downloadLink });
}))

module.exports = router;