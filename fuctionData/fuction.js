const conect = require("../mongoconect.js");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, statistics, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience, mathproblemsolving
  , Aecsem2, chemistrysem2, physicssem2, computersciencesem2, mathsem2, yogasem2, statisticssem2, ayurvedasem2, environmentsem2, geologiesem2,
  earthsciencesem2, zoologysem2, mobileDevelopment, basicsofremoteSensing, computationalMathematics, dataAnalysis, energyConversion, latexTypesetting,
  preservationandManagement, foodPreservatives, instrumentationinChemical, gemology, riskFactors } = require("../Model.js");
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
AecDatasem2 = null;
chemistryDatasem2 = null;
physicsDatasem2 = null;
computerscienceDatasem2 = null;
mathDatasem2 = null;
statisticsDatasem2 = null;
ayurvedaDatasem2 = null;
environmentDatasem2 = null;
geologieDatasem2 = null;
earthscienceDatasem2 = null;
zoologyDatasem2 = null;
mobileDevelopmentData = null;
basicsofremoteSensingData = null;
computationalMathematicsData = null;
dataAnalysisData = null;
energyConversionData = null;
latexTypesettingData = null;
preservationandManagementData = null;
foodPreservativesData = null;
instrumentationinChemicalData = null;
gemologyData = null;
riskFactorsData = null;
//to find mongodb dat
async function getData() {
  try {
    aecdata = await Aec.find().sort({ _id: 1 });
    chemistryData = await chemistry.find().sort({ _id: 1 });
    csData = await computerscience.find().sort({ _id: 1 });
    phydata = await physics.find().sort({ _id: 1 });
    mathData = await math.find().sort({ _id: 1 });
    yogaData = await yoga.find().sort({ _id: 1 });
    staticdata = await statistics.find().sort({ _id: 1 });
    ayorData = await ayurveda.find().sort({ _id: 1 });
    datacorrec = await datavalid.find().sort({ _id: 1 });
    environmentData = await environment.find().sort({ _id: 1 });
    geologieData = await geologie.find().sort({ _id: 1 });
  } catch (error) {
    console.log(error);
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
    mobileDevelopmentData = await mobileDevelopment.find().sort({ _id: 1 });
    basicsofremoteSensingData = await basicsofremoteSensing.find().sort({ _id: 1 });
    computationalMathematicsData = await computationalMathematics.find().sort({ _id: 1 });
    dataAnalysisData = await dataAnalysis.find().sort({ _id: 1 });
    energyConversionData = await energyConversion.find().sort({ _id: 1 });
    latexTypesettingData = await latexTypesetting.find().sort({ _id: 1 });
    preservationandManagementData = await preservationandManagement.find().sort({ _id: 1 });
    foodPreservativesData = await foodPreservatives.find().sort({ _id: 1 });
    instrumentationinChemicalData = await instrumentationinChemical.find().sort({ _id: 1 });
    gemologyData = await gemology.find().sort({ _id: 1 });
    riskFactorsData = await riskFactors.find().sort({ _id: 1 });
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
    case "statistics": return staticdata;
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
    case "mathproblemsolving": return mathsolveData;
    case "ethics in academia and mathematical exploration": return mathsolveData;

    default: return datacorrec;
  }
}
async function getDatasem2() {
  try {
    AecDatasem2 = await Aecsem2.find().sort({ _id: 1 });
    chemistryDatasem2 = await chemistrysem2.find().sort({ _id: 1 });
    physicsDatasem2 = await physicssem2.find().sort({ _id: 1 });
    computerscienceDatasem2 = await computersciencesem2.find().sort({ _id: 1 });
    mathDatasem2 = await mathsem2.find().sort({ _id: 1 });
    yogaDatasem2 = await yogasem2.find().sort({ _id: 1 });
    statisticsDatasem2 = await statisticssem2.find().sort({ _id: 1 });
    ayurvedaDatasem2 = await ayurvedasem2.find().sort({ _id: 1 });
    environmentDatasem2 = await environmentsem2.find().sort({ _id: 1 });
    geologieDatasem2 = await geologiesem2.find().sort({ _id: 1 });
    earthscienceDatasem2 = await earthsciencesem2.find().sort({ _id: 1 });
    zoologyDatasem2 = await zoologysem2.find().sort({ _id: 1 });
  } catch (er) {
    console.log(er);
  }
}
function namedatasem2(name) {
  // console.log("name is",name);
  switch (name) {
    case "computer":
    case "computerscience": return computerscienceDatasem2;
    case "physics": return physicsDatasem2;
    case "Aec":
    case "aec": return AecDatasem2;
    //case "static":return statisticsDatasem2;
    case "statistics": return statisticsDatasem2;
    case "math":
    case "mathematics": return mathDatasem2;
    case "yoga": return yogaData;
    case "chemistry": return chemistryDatasem2;
    case "ayurveda": return ayurvedaDatasem2;
    case "geologie":
    case "geology": return geologieDatasem2;
    case "environment": return environmentDatasem2;
    case "earthscience": return earthscienceDatasem2;
    case "zoology": return zoologyDatasem2;
    case "mobileDevelopment":
    case "mobile application development": return mobileDevelopmentData;
    case "basicsofremoteSensing":
    case "basics of remote sensing": return basicsofremoteSensingData;
    case "computationalMathematics":
    case "computational mathematics with sagemath": return computationalMathematicsData;
    case "dataAnalysis":
    case "data analysis using spss": return dataAnalysisData;
    case "energyConversion":
    case "energy conversion and storage for sustainable development": return energyConversionData;
    case "latexTypesetting":
    case "latex typesetting for beginners": return latexTypesettingData;
    case "preservationandManagement":
    case "preservation and management of microbial resources": return preservationandManagementData;
    case "foodPreservatives":
    case "food, preservatives and adulterants": return foodPreservativesData;
    case "instrumentationinChemical":
    case "instrumentation in chemical industry": return instrumentationinChemicalData;
    case "gemology": return gemologyData;
    case "riskFactors":
    case "risk factors for genetic disorders": return riskFactorsData;
    default: return datacorrec;
  }
}
module.exports = { namedata, getData, secDatafind, getDatasem2, namedatasem2 };
