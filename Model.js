const mongoose = require("mongoose");
const Schemamodel = new mongoose.Schema({
  title:  {
    type: String,
    required: true,
        unique: true   // 👈 isse same title dubara upload nahi hoga
  },
  src:  {
    type: String,
    required: true
  }
});

const Aec = mongoose.model("Aec", Schemamodel);
const chemistry = mongoose.model("chemistry", Schemamodel);
const physics = mongoose.model("physics", Schemamodel);
const computerscience = mongoose.model("computerscience", Schemamodel);
const manAndEnvironment = mongoose.model("manAndEnvironment", Schemamodel);
const math = mongoose.model("math", Schemamodel);
const secWeb = mongoose.model("secWeb", Schemamodel);
const yoga = mongoose.model("yoga", Schemamodel);
const   statistics=mongoose.model("statistics",Schemamodel);
const ayurveda=mongoose.model("ayurveda",Schemamodel);
const datavalid=mongoose.model("datavalid",Schemamodel);
const digitalliteracie=mongoose.model("digitalliteracie",Schemamodel);
const environment=mongoose.model("environment",Schemamodel);
const geologie=mongoose.model("geologie",Schemamodel);
const mxexcel=mongoose.model("mxexcel",Schemamodel);
const quanintychemistrie=mongoose.model("quanintychemistrie",Schemamodel);
const smartphonegeoscience=mongoose.model("smartphonegeoscience",Schemamodel);
const mathproblemsolving=mongoose.model("mathproblemsolving",Schemamodel);

const models = [
  "Aecsem2",
  "chemistrysem2",
  "physicssem2",
  "computersciencesem2",
  "mathsem2",
  "yogasem2",
  "statisticssem2",
  "ayurvedasem2",
  "environmentsem2",
  "geologiesem2",
"earthsciencesem2",
"zoologysem2"
];
const mongooseModels = models .reduce((oje, name) => {
  oje[name] = mongoose.model(name, Schemamodel);
  return oje;
}, {});
 module.exports={Aec,chemistry,physics,computerscience,manAndEnvironment,math,secWeb
  ,yoga,  statistics,ayurveda,datavalid,digitalliteracie,environment,geologie,mxexcel,quanintychemistrie,smartphonegeoscience,mathproblemsolving,...mongooseModels};
