const conect = require("../mongoconect.js");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience, mathproblemsolving } = require("../Model.js");
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
mathsolveData = null;

//to find mongodb dat
async function getData() {
  try {
    aecdata = await Aec.find().sort({ _id: 1 });
    chemistryData = await chemistry.find().sort({ _id: 1 });
    csData = await computerscience.find().sort({ _id: 1 });
    phydata = await physics.find().sort({ _id: 1 });
    mathData = await math.find().sort({ _id: 1 });
    yogaData = await yoga.find().sort({ _id: 1 });
    staticdata = await static.find().sort({ _id: 1 });
    ayorData = await ayurveda.find().sort({ _id: 1 });
    datacorrec = await datavalid.find().sort({ _id: 1 });
    environmentData = await environment.find().sort({ _id: 1 });
    geologieData = await geologie.find().sort({ _id: 1 });
  } catch (error) {

  }
}
async function secDatafind() {
  try {
    digitalData = await digitalliteracie.find().sort({ _id: 1 });
    webData = await secWeb.find().sort({ _id: 1 });
    manData = await manAndEnvironment.find().sort({ _id: 1 });
    mxexcelData = await mxexcel.find().sort({ _id: 1 });
    quanintychemistrieData = await quanintychemistrie.find().sort({ _id: 1 });
    smartphonegeoscienceData = await smartphonegeoscience.find().sort({ _id: 1 });
    mathsolveData = await mathproblemsolving.find().sort({ _id: 1 });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function namedata(name) {
  switch (name) {
    case "computer":
    case "computerscience": return csData;
    case "physics": return phydata;
    case "Aec":
    case "aec": return aecdata;
    case "static":
    case "statistics": return staticdata
    case "mathematics":
    case "math": return mathData;
    case "yoga": return yogaData;
    case "web designing":
      case "secWeb": return webData;
    case "manAndEnvironment":
    case "man and environment": return manData;
    case "chemistry": return chemistryData;
    case "ayurveda": return ayorData;
    case "digitalliteracie":
    case "digital literacy": return digitalData;
    case "mxexcel":
    case "data analysis using excel": return mxexcelData;
    case "quanintychemistrie":
    case "quality control in chemical analysis": return quanintychemistrieData;
    case "smartphonegeoscience":
    case "smartphone geosciences": return smartphonegeoscienceData;
    case "geologie":
    case "geology": return geologieData;
    case "environment": return environmentData;
    case "mathproblemsolving":return mathsolveData;
    case "ethics in academia and mathematical exploration": return mathsolveData;
    default: return datacorrec;
  }
}
module.exports = { namedata, getData, secDatafind };
