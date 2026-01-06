const conect = require("../mongoconect.js");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience } = require("../Model.js");
//data define
let aecdata = null;
chemistryData = null;
csData = null;
phydata = null;
staticdata = null;
mathData = null;
yogaData = null;
webData = null;
manData = null;
ayorData = null;
datacorrec = null;
digitalData = null;
environmentData = null;
geologieData = null;
mxexcelData = null;
quanintychemistrieData = null;
smartphonegeoscienceData = null;


//to find mongodb dat
async function getData() {
  try {
    aecdata = await Aec.find();
    chemistryData = await chemistry.find();
    csData = await computerscience.find();
    phydata = await physics.find();
    mathData = await math.find();
    yogaData = await yoga.find();
    staticdata = await static.find();
    ayorData = await ayurveda.find();
    datacorrec = await datavalid.find();
    environmentData = await environment.find();
    geologieData = await geologie.find();
   
  } catch (error) {

  }
}
async function secDatafind() {
  try {
       digitalData = await digitalliteracie.find();
    webData = await secWeb.find();
    manData = await manAndEnvironment.find();
     mxexcelData = await mxexcel.find();
    quanintychemistrieData = await quanintychemistrie.find();
    smartphonegeoscienceData = await smartphonegeoscience.find();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function namedata(name) {
  switch (name) {
    case "computer": return csData;
    case "physics": return phydata;
    case "aec": return aecdata;
    case "statistics": return staticdata
    case "mathematics": return mathData;
    case "yoga": return yogaData;
    case "web designing":return webData;
    case "man and environment": return manData;
    case "chemistry": return chemistryData;
    case "ayurveda": return ayorData;
    case "digital literacy": return digitalData;
    case "data analysis using excel": return mxexcelData;
    case "quality control in chemical analysis": return quanintychemistrieData;
    case "smartphone geosciences": return smartphonegeoscienceData;
    case "geology":return geologieData;
    case "environment":return environmentData;
    default: return datacorrec;
  }
}
module.exports = { namedata, getData, secDatafind };
