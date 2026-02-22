const mongoose = require("mongoose");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, statistics, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience, mathproblemsolving, Aecsem2,
  chemistrysem2,
  physicssem2,
  computersciencesem2,
  mathsem2,
  yogasem2,
  statisticssem2,
  ayurvedasem2,
  environmentsem2,
  geologiesem2,
  earthsciencesem2,
  zoologysem2,
  mobileDevelopment, basicsofremoteSensing, computationalMathematics, dataAnalysis, energyConversion, latexTypesetting,
  preservationandManagement, foodPreservatives, instrumentationinChemical, gemology, riskFactors } = require("../Model.js");
const models = {
  Aec,
  chemistry,
  physics,
  computerscience,
  manAndEnvironment,
  math,
  secWeb,
  yoga,
  statistics,
  ayurveda,
  datavalid,
  digitalliteracie,
  environment,
  geologie,
  mxexcel,
  quanintychemistrie,
  smartphonegeoscience,
  mathproblemsolving,

};
let models2 = {
  Aec: Aecsem2,
  chemistry: chemistrysem2,
  physics: physicssem2,
  computerscience: computersciencesem2,
  math: mathsem2,
  yoga: yogasem2,
  statistics: statisticssem2,
  ayurveda: ayurvedasem2,
  environment: environmentsem2,
  geologie: geologiesem2,
  earthscience: earthsciencesem2,
  zoology: zoologysem2,
  mobileDevelopment,
  basicsofremoteSensing,
  computationalMathematics,
  dataAnalysis,
  energyConversion,
  latexTypesetting,
  preservationandManagement,
  foodPreservatives,
  instrumentationinChemical,
gemology,
  riskFactors
}
async function insertData(title, src, subject, Semester) {
  let subjectModel;
  if (Semester.trim() === "First") {
    subjectModel = models[subject];
  } else if (Semester.trim() === "Second") {
    subjectModel = models2[subject];
  }
  // ✅ get actual model from name
  if (!subjectModel) {
    console.log("Invalid subject:", subject);
    return;
  }
  try {
    const result = await subjectModel.create({ title, src });
  } catch (err) {
    console.log("Error inserting document:", err);
    // } finally {
    //   await mongoose.connection.close();
    //   console.log("MongoDB connection closed");
  }
};
// insertData();
module.exports = insertData;