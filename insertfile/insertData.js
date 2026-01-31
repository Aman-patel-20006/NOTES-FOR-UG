const mongoose = require("mongoose");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience,mathproblemsolving } = require("../Model.js");
  const models = {
  Aec,
  chemistry,
  physics,
  computerscience,
  manAndEnvironment,
  math,
  secWeb,
  yoga,
  static,
  ayurveda,
  datavalid,
  digitalliteracie,
  environment,
  geologie,
  mxexcel,
  quanintychemistrie,
  smartphonegeoscience,
  mathproblemsolving
};
async function insertData(title,src,subject) {
  const subjectModel = models[subject]; // ✅ get actual model from name
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
module.exports=insertData;