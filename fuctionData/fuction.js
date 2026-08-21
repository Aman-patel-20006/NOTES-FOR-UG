const conect = require("../mongoconect.js");
const expressError = require("../expressError.js");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, statistics, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience, mathproblemsolving
  , Aecsem2, chemistrysem2, physicssem2, computersciencesem2, mathsem2, yogasem2, statisticssem2, ayurvedasem2, geologiesem2,
  earthsciencesem2, zoologysem2, mobileDevelopment, basicsofremoteSensing, computationalMathematics, dataAnalysis, energyConversion, latexTypesetting,
  preservationandManagement, foodPreservatives, instrumentationinChemical, gemology, riskFactors, websiteLegal, md, mdsem2, csMajor_one, csMajor_two, csMinor_one,
  physicsMajor_one, physicsMajor_two, physicsMinor_one,
  chemistryMajor_one, chemistryMajor_two, chemistryMinor_one, statisticsMajor_one, statisticsMajor_two, statisticsMinor_one,
  mathMajor_one, mathMajor_two, mathMinor_one,
  geologyMajor_one, geologyMajor_two, geologyMinor_one, Aecsem3, mdsem3, PythonProgramming, GeographyofTourism, PythonProgrammingforDataAnalytics,
  DataAnalysisusingR, ProgrammingandDataAnalysis,
  SageMathforBeginners, Ethnobotany, MicroscopyandHistologyandHistochemistry, SyntheticMethodologies,
  GeologicalFieldTraining, GeneticCounsellingandPreventionofGeneticDisorders } = require("../Model.js");
const ExpressError = require("../expressError.js");
//data define
let aecdata = null;
// chemistryData = null;
// csData = null;
// phydata = null;
// staticdata = null;
// mathData = null;
// yogaData = null;
// webData = null;
// manData = null;
// ayorData = null;
datacorrec = null;
digitalData = null;
// environmentData = null;
geologieData = null;
mxexcelData = null;
quanintychemistrieData = null;
smartphonegeoscienceData = null;
mathsolveData = null;
// AecDatasem2 = null;
// chemistryDatasem2 = null;
// physicsDatasem2 = null;
// computerscienceDatasem2 = null;
// mathDatasem2 = null;
// statisticsDatasem2 = null;
// ayurvedaDatasem2 = null;
// environmentDatasem2 = null;
// geologieDatasem2 = null;
// earthscienceDatasem2 = null;
// zoologyDatasem2 = null;
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
webLegal = null;
// mdvalue = null;
// mdsem2value = null;
csMajor_onedata = null;
csMajor_twodata = null;
csMinor_onedata = null;
physicsMajor_onedata = null;
physicsMajor_twodata = null;
physicsMinor_onedata = null;
chemistryMajor_onedata = null;
chemistryMajor_twodata = null;
chemistryMinor_onedata = null;
statisticsMajor_onedata = null;
statisticsMajor_twodata = null;
statisticsMinor_onedata = null;
mathMajor_onedata = null;
mathMajor_twodata = null;
mathMinor_onedata = null;
geologyMajor_onedata = null;
geologyMajor_twodata = null;
geologyMinor_onedata = null;
Aecsem3data = null;
mdsem3data = null;
// sec sem three data
// PythonProgrammingDataSecThird=null;
// GeographyofTourismDataSecThird=null;
// PythonProgrammingforDataAnalyticsDataSecThird=null;
//   DataAnalysisusingRDataSecThird=null;
//   ProgrammingandDataAnalysisDataSecThird=null;
//   SageMathforBeginnersDataSecThird=null;
//   EthnobotanyDataSecThird=null;
//   MicroscopyandHistologyandHistochemistryDataSecThird=null;
//   SyntheticMethodologiesDataSecThird=null;
//   GeologicalFieldTrainingDataSecThird=null;
//   GeneticCounsellingandPreventionofGeneticDisordersDataSecThird=null;
// to find sec data frome 
//to find mongodb dat
async function getDataThirdSemSec(name) {
      console.log(name);
  switch (name) {
    case "python programming": return await PythonProgramming.find().sort({ _id: 1 }).populate("uploadedBy");
    case "geography of tourism": return await GeographyofTourism.find().sort({ _id: 1 }).populate("uploadedBy");
    case "python programming for data analytics": return await PythonProgrammingforDataAnalytics.find().sort({ _id: 1 }).populate("uploadedBy");
    case "data analysis using r": return await DataAnalysisusingR.find().sort({ _id: 1 }).populate("uploadedBy");
    case "programming and data analysis": return await ProgrammingandDataAnalysis.find().sort({ _id: 1 }).populate("uploadedBy");
    case "sagemath for beginners": return await SageMathforBeginners.find().sort({ _id: 1 }).populate("uploadedBy");
    case "ethnobotany": return await Ethnobotany.find().sort({ _id: 1 }).populate("uploadedBy");
    case "microscopy and histology and histochemistry": return await MicroscopyandHistologyandHistochemistry.find().sort({ _id: 1 }).populate("uploadedBy");
    case "synthetic methodologies": return await SyntheticMethodologies.find().sort({ _id: 1 }).populate("uploadedBy");
    case "geological field training": return await GeologicalFieldTraining.find().sort({ _id: 1 }).populate("uploadedBy");
    case "genetic counselling and prevention of genetic disorders": return await GeneticCounsellingandPreventionofGeneticDisorders.find().sort({ _id: 1 }).populate("uploadedBy");
  }
}
async function getData() {
  try {
    datacorrec = await datavalid.find().sort({ _id: 1 }).populate("uploadedBy");
    // aecdata = await Aec.find().sort({ _id: 1 }).populate("uploadedBy");
    // chemistryData = await chemistry.find().sort({ _id: 1 }).populate("uploadedBy");
    // csData = await computerscience.find().sort({ _id: 1 }).populate("uploadedBy");
    // phydata = await physics.find().sort({ _id: 1 }).populate("uploadedBy");
    // mathData = await math.find().sort({ _id: 1 }).populate("uploadedBy");
    // yogaData = await yoga.find().sort({ _id: 1 }).populate("uploadedBy");
    // staticdata = await statistics.find().sort({ _id: 1 }).populate("uploadedBy");
    // ayorData = await ayurveda.find().sort({ _id: 1 }).populate("uploadedBy");
    // environmentData = await environment.find().sort({ _id: 1 }).populate("uploadedBy");
    // geologieData = await geologie.find().sort({ _id: 1 }).populate("uploadedBy");
    // webLegal = await websiteLegal.find().sort({ _id: 1 }).populate("uploadedBy");
    // mdvalue = await md.find().sort({ _id: 1 }).populate("uploadedBy");
  } catch (error) {
    console.log(error);
  }
}

async function secDatafind() {
  try {
    digitalData = await digitalliteracie.find().sort({ _id: 1 }).populate("uploadedBy");
    webData = await secWeb.find().sort({ _id: 1 }).populate("uploadedBy");
    manData = await manAndEnvironment.find().sort({ _id: 1 }).populate("uploadedBy");
    mxexcelData = await mxexcel.find().sort({ _id: 1 }).populate("uploadedBy");
    quanintychemistrieData = await quanintychemistrie.find().sort({ _id: 1 }).populate("uploadedBy");
    smartphonegeoscienceData = await smartphonegeoscience.find().sort({ _id: 1 }).populate("uploadedBy");
    mathsolveData = await mathproblemsolving.find().sort({ _id: 1 }).populate("uploadedBy");
    mobileDevelopmentData = await mobileDevelopment.find().sort({ _id: 1 }).populate("uploadedBy");
    basicsofremoteSensingData = await basicsofremoteSensing.find().sort({ _id: 1 }).populate("uploadedBy");
    computationalMathematicsData = await computationalMathematics.find().sort({ _id: 1 }).populate("uploadedBy");
    dataAnalysisData = await dataAnalysis.find().sort({ _id: 1 }).populate("uploadedBy");
    energyConversionData = await energyConversion.find().sort({ _id: 1 }).populate("uploadedBy");
    latexTypesettingData = await latexTypesetting.find().sort({ _id: 1 }).populate("uploadedBy");
    preservationandManagementData = await preservationandManagement.find().sort({ _id: 1 }).populate("uploadedBy");
    foodPreservativesData = await foodPreservatives.find().sort({ _id: 1 }).populate("uploadedBy");
    instrumentationinChemicalData = await instrumentationinChemical.find().sort({ _id: 1 }).populate("uploadedBy");
    gemologyData = await gemology.find().sort({ _id: 1 }).populate("uploadedBy");
    riskFactorsData = await riskFactors.find().sort({ _id: 1 }).populate("uploadedBy");
  } catch (error) {
    console.error("Error fetching sec data:", error);
    throw new ExpressError("Please try again later internal server error", 500);
  }
}
async function namedata(name) {
  switch (name) {
    case "computer":
    case "computerscience": return await computerscience.find().sort({ _id: 1 }).populate("uploadedBy");
    case "physics": return await physics.find().sort({ _id: 1 }).populate("uploadedBy");
    case "Aec": return await Aec.find().sort({ _id: 1 }).populate("uploadedBy");
    case "aec": return await Aec.find().sort({ _id: 1 }).populate("uploadedBy");
    case "statistics": return await statistics.find().sort({ _id: 1 }).populate("uploadedBy");
    case "mathematics":
    case "math": return await math.find().sort({ _id: 1 }).populate("uploadedBy");
    case "yoga": return await yoga.find().sort({ _id: 1 }).populate("uploadedBy");
    case "web designing": return webData;
    case "secWeb": return webData;
    case "manAndEnvironment":
    case "man and environment": return await environment.find().sort({ _id: 1 }).populate("uploadedBy");
    case "chemistry": return chemistryData;
    case "ayurveda": return await ayurveda.find().sort({ _id: 1 }).populate("uploadedBy");
    case "geologie":
    case "geology": return await geologie.find().sort({ _id: 1 }).populate("uploadedBy");
    case "md": return await md.find().sort({ _id: 1 }).populate("uploadedBy");
    case "digitalliteracie":
    case "digital literacy": return digitalData;
    case "mxexcel":
    case "data analysis using excel": return mxexcelData;
    case "quanintychemistrie":
    case "quality control in chemical analysis": return quanintychemistrieData;
    case "smartphonegeoscience":
    case "smartphone geosciences": return smartphonegeoscienceData;
    case "environment": return environmentData;
    case "mathproblemsolving": return mathsolveData;
    case "ethics in academia and mathematical exploration": return mathsolveData;
    case "websiteLegal": return await websiteLegal.find().sort({ _id: 1 }).populate("uploadedBy");

    // case "comingSoon":return datacorrec;
    default: return datacorrec;
  }
}
async function getDatasem2() {
  try {
    // AecDatasem2 = await Aecsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // chemistryDatasem2 = await chemistrysem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // physicsDatasem2 = await physicssem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // computerscienceDatasem2 = await computersciencesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // mathDatasem2 = await mathsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // statisticsDatasem2 = await statisticssem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // ayurvedaDatasem2 = await ayurvedasem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // geologieDatasem2 = await geologiesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // earthscienceDatasem2 = await earthsciencesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // zoologyDatasem2 = await zoologysem2.find().sort({ _id: 1 }).populate("uploadedBy");
    // mdsem2value = await mdsem2.find().sort({ _id: 1 }).populate("uploadedBy");
  } catch (error) {
    console.error("Error fetching sec data:", error);
    throw new ExpressError("Please try again later internal server error", 500);
  }
}

async function namedatasem2(name) {
  //  console.log("name is",name);
  switch (name) {
    case "computer":
    case "computerscience": return await computersciencesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "physics": return await physicssem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "Aec": return await Aecsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "aec": return await Aecsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "static":
    case "statistics": return await statisticssem2.find().sort({ _id: 1 }).populate("uploadedBy");;
    case "math":
    case "mathematics": return await mathsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "yoga": return await yoga.find().sort({ _id: 1 }).populate("uploadedBy");
    case "chemistry": return await chemistrysem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "ayurveda": return await ayurvedasem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "geologie":
    case "geology": return await geologiesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "environment": return environmentData;
    case "earthscience": return await earthsciencesem2.find().sort({ _id: 1 }).populate("uploadedBy");
    case "zoology": return await zoologysem2.find().sort({ _id: 1 }).populate("uploadedBy");
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
    case "md": return await mdsem2.find().sort({ _id: 1 }).populate("uploadedBy");
    default: return datacorrec;
  }
}
async function getDatasem3() {
  try {
    csMajor_onedata = await csMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    csMajor_twodata = await csMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    csMinor_onedata = await csMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    physicsMajor_onedata = await physicsMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    physicsMajor_twodata = await physicsMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    physicsMinor_onedata = await physicsMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    chemistryMajor_onedata = await chemistryMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    chemistryMajor_twodata = await chemistryMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    chemistryMinor_onedata = await chemistryMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    statisticsMajor_onedata = await statisticsMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    statisticsMajor_twodata = await statisticsMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    statisticsMinor_onedata = await statisticsMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    mathMajor_onedata = await mathMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    mathMajor_twodata = await mathMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    mathMinor_onedata = await mathMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    geologyMajor_onedata = await geologyMajor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    geologyMajor_twodata = await geologyMajor_two.find().sort({ _id: 1 }).populate("uploadedBy");
    geologyMinor_onedata = await geologyMinor_one.find().sort({ _id: 1 }).populate("uploadedBy");
    Aecsem3data = await Aecsem3.find().sort({ _id: 1 }).populate("uploadedBy");
    mdsem3data = await mdsem3.find().sort({ _id: 1 }).populate("uploadedBy");
  } catch (error) {
    console.log(error);
  }
}
function namedatasem3(subject, major_minor) {
  const data = {
    physics: {
      major_one: physicsMajor_onedata,
      major_two: physicsMajor_twodata,
      minor_one: physicsMinor_onedata
    },
    chemistry: {
      major_one: chemistryMajor_onedata,
      major_two: chemistryMajor_twodata,
      minor_one: chemistryMinor_onedata
    },
    computerscience: {
      major_one: csMajor_onedata,
      major_two: csMajor_twodata,
      minor_one: csMinor_onedata,
    },
    computer: {
      major_one: csMajor_onedata,
      major_two: csMajor_twodata,
      minor_one: csMinor_onedata,
    },
    statistics: {
      major_one: statisticsMajor_onedata,
      major_two: statisticsMajor_twodata,
      minor_one: statisticsMinor_onedata,
    },
    mathematics: {
      major_one: mathMajor_onedata,
      major_two: mathMajor_twodata,
      minor_one: mathMinor_onedata,
    },
    math: {
      major_one: mathMajor_onedata,
      major_two: mathMajor_twodata,
      minor_one: mathMinor_onedata,
    },
    geologie: {
      major_one: geologyMajor_onedata,
      major_two: geologyMajor_twodata,
      minor_one: geologyMinor_onedata,
    },
    geology: {
      major_one: geologyMajor_onedata,
      major_two: geologyMajor_twodata,
      minor_one: geologyMinor_onedata,
    },
    Aec: Aecsem3data,
    aec: Aecsem3data,
    md: mdsem3data,
  };
  if (major_minor) {
    return data[subject]?.[major_minor];
  } else {
    return data[subject];
  }

}
module.exports = { namedata, getData, secDatafind, getDatasem2, namedatasem2, getDatasem3, namedatasem3, getDataThirdSemSec };
