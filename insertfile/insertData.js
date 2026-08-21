const mongoose = require("mongoose");
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, statistics, ayurveda,
  datavalid, digitalliteracie, environment, geologie, mxexcel, quanintychemistrie, smartphonegeoscience, mathproblemsolving, Aecsem2,
  chemistrysem2,
  physicssem2,
  computersciencesem2,
  mathsem2,
  statisticssem2,
  ayurvedasem2,
  geologiesem2,
  earthsciencesem2,
  zoologysem2,
  mobileDevelopment, basicsofremoteSensing, computationalMathematics, dataAnalysis, energyConversion, latexTypesetting,
  preservationandManagement, foodPreservatives, instrumentationinChemical, gemology, riskFactors, websiteLegal, md, mdsem2, csMajor_one, csMajor_two, csMinor_one,
  physicsMajor_one, physicsMajor_two, physicsMinor_one,
  chemistryMajor_one, chemistryMajor_two, chemistryMinor_one, statisticsMajor_one, statisticsMajor_two, statisticsMinor_one,
  mathMajor_one, mathMajor_two, mathMinor_one,
  geologyMajor_one, geologyMajor_two, geologyMinor_one, Aecsem3, mdsem3, PythonProgramming, GeographyofTourism, PythonProgrammingforDataAnalytics,
  DataAnalysisusingR, ProgrammingandDataAnalysis,
  SageMathforBeginners, Ethnobotany, MicroscopyandHistologyandHistochemistry, SyntheticMethodologies,
  GeologicalFieldTraining, GeneticCounsellingandPreventionofGeneticDisorders } = require("../Model.js");
const models = {
  aec: Aec,
  Aec: Aec,
  chemistry,
  physics,
  computerscience,
  "man and environment": manAndEnvironment,
  math,
  "web designing": secWeb,
  yoga,
  statistics,
  ayurveda,
  datavalid,
  "digital literacy": digitalliteracie,
  environment,
  geologie,
  "data analysis using excel": mxexcel,
  "quality control in chemical analysis": quanintychemistrie,
  "smartphone geosciences": smartphonegeoscience,
  "ethics in academia and mathematical exploration": mathproblemsolving,
  md,
};
let models2 = {
  Aec: Aecsem2,
  aec: Aecsem2,
  chemistry: chemistrysem2,
  physics: physicssem2,
  computerscience: computersciencesem2,
  math: mathsem2,
  yoga: yoga,
  statistics: statisticssem2,
  ayurveda: ayurvedasem2,
  environment: environment,
  geologie: geologiesem2,
  earthscience: earthsciencesem2,
  zoology: zoologysem2,
  "mobile application development": mobileDevelopment,
  "basics of remote sensing": basicsofremoteSensing,
  "computational mathematics with sagemath": computationalMathematics,
  "data analysis using spss": dataAnalysis,
  "energy conversion and storage for sustainable development": energyConversion,
  "latex typesetting for beginners": latexTypesetting,
  "preservation and management of microbial resources": preservationandManagement,
  "food, preservatives and adulterants": foodPreservatives,
  "instrumentation in chemical industry": instrumentationinChemical,
  "gemology": gemology,
  "risk factors for genetic disorders": riskFactors,
  "md": mdsem2
}
let modelsem3 = {
  computerscience: { major_one: csMajor_one, major_two: csMajor_two, minor_one: csMinor_one, },
  physics: { major_one: physicsMajor_one, major_two: physicsMajor_two, minor_one: physicsMinor_one, },
  chemistry: { major_one: chemistryMajor_one, major_two: chemistryMajor_two, minor_one: chemistryMinor_one, },
  statistics: { major_one: statisticsMajor_one, major_two: statisticsMajor_two, minor_one: statisticsMinor_one, },
  math: { major_one: mathMajor_one, major_two: mathMajor_two, minor_one: mathMinor_one, },
  geologie: { major_one: geologyMajor_one, major_two: geologyMajor_two, minor_one: geologyMinor_one, },
  Aec: Aecsem3,
  aec: Aecsem3,
  md: mdsem3
}
// function SubjectSecModel(secSubject) {
//   console.log("subjectSecModel run",secSubject);
//   switch (secSubject.trim().toLowerCase()) {
//     case "python programming":
//       return PythonProgramming;

//     case "geography of tourism":
//       return GeographyofTourism;

//     case "python programming for data analytics":
//       return PythonProgrammingforDataAnalytics;

//     case "data analysis using r":
//       return DataAnalysisusingR;

//     case "programming and data analysis":
//       return ProgrammingandDataAnalysis;

//     case "sagemath for beginners":
//       return SageMathforBeginners;

//     case "ethnobotany":
//       return Ethnobotany;

//     case "microscopy and histology and histochemistry":
//       return MicroscopyandHistologyandHistochemistry;

//     case "synthetic methodologies":
//       return SyntheticMethodologies;

//     case "geological field training":
//       return GeologicalFieldTraining;

//     case "genetic counselling and prevention of genetic disorders":
//       return GeneticCounsellingandPreventionofGeneticDisorders;
//     default:
//       return null;
//   }
// }
let SubjectSecModel = {
    "python programming": PythonProgramming,
    "geography of tourism": GeographyofTourism,
    "python programming for data analytics": PythonProgrammingforDataAnalytics,
    "data analysis using r": DataAnalysisusingR,
    "programming and data analysis": ProgrammingandDataAnalysis,
    "sagemath for beginners": SageMathforBeginners,
    "ethnobotany": Ethnobotany,
    "microscopy and histology and histochemistry": MicroscopyandHistologyandHistochemistry,
    "synthetic methodologies": SyntheticMethodologies,
    "geological field training": GeologicalFieldTraining,
    "genetic counselling and prevention of genetic disorders":GeneticCounsellingandPreventionofGeneticDisorders
};
//delete object
async function deleteChapter(subject, Semester, id, currUserID, admin,major_minor = '',secSubject) {
  let subjectModel = null;
  console.log(subject, Semester, id, currUserID, admin,major_minor ,secSubject);
  if (Semester.trim() === "First") {
    //for sec subject
    if ((subject === "sec" || subject == "Sec")) {
      subjectModel = models[secSubject];
    } else {
      subjectModel = models[subject];
    }

  } else if (Semester.trim() === "Second") {
    if ((subject === "sec" || subject == "Sec")) {
      subjectModel = models2[secSubject];
    } else {
      subjectModel = models2[subject];
    }
  } else if (Semester.trim() === "Third") {
    if (subject == "md" || subject == "Aec" || subject == "aec") {
      subjectModel = modelsem3[subject];
    } else if (subject == 'sec') {
      // console.log("sec subject find is run",secSubject);
      subjectModel =SubjectSecModel[secSubject];
      // console.log(subjectModel, secSubject);
    }else {
      let subject_major_minor = modelsem3[subject];
      // console.log(subject_major_minor);
      subjectModel = subject_major_minor[major_minor];
      //  console.log(subjectModel);
    }
  }
  // ✅ get actual model from name
  if (!subjectModel) {
    console.log("Invalid subject for model:", subject);
    return {
      success: false,
      message: "Please try again some thing internal problem"
    }
  }
  try {
    let charObject = await subjectModel.findById(id);
    // if (admin || (charObject.uploadedBy)?.toString() === currUserID.toString() ) {
    if (admin || String(charObject?.uploadedBy) === String(currUserID)) {
      let result = await subjectModel.findByIdAndDelete(id);
      return {
        success: true,
        message: "Deletion is success full",
      }
    } else {
      return {
        success: false,
        message: "You are not allowed to delete this pdf"
      }
    };
  } catch (err) {
    console.log("error occured on delete object");
    console.log(err);
    return {
      success: false,
      message: "Please try again some thing internal problem"
    }
  }
}
async function insertData(title, src, subject, Semester, userId, major_minor="major_minor_null", secSubject="secSubject_null") {
  let subjectModel = null;
  // console.log(title, src, subject, Semester, major_minor, secSubject,"insert data function use");
  if (Semester.trim() === "First") {
    //for sec subject
    if ((subject === "sec" || subject == "Sec")) {
      subjectModel = models[secSubject];
    } else {
      subjectModel = models[subject];
    }

  } else if (Semester.trim() === "Second") {
    if ((subject === "sec" || subject == "Sec")) {
      subjectModel = models[secSubject];
    } else {
      subjectModel = models2[subject];
    }
  } else if (Semester.trim() === "Third") {
    if (subject == "md" || subject == "Aec" || subject == "aec") {
      subjectModel = modelsem3[subject];
    } else if (subject == 'sec') {
      // console.log("sec subject find is run",secSubject);
      subjectModel =SubjectSecModel[secSubject];
      // console.log(subjectModel, secSubject);
    }else {
      let subject_major_minor = modelsem3[subject];
      // console.log(subject_major_minor);
      subjectModel = subject_major_minor[major_minor];
      //  console.log(subjectModel);
    }
  }
  //  get actual model from name
  if (!subjectModel) {
    console.log("Invalid subject:",subject,"secsubject vale",secSubject);
    return;
  }
  try {
    const result = await subjectModel.create({ title, src, uploadedBy: userId });
    // console.log(result);
  } catch (err) {
    console.log("Error inserting document:", err);
  }
};

// require("dotenv").config(); 
//  const url=process.env.URL;
// function conect(){mongoose.connect(url)
//    .then(() => console.log("MongoDB Atlas connected successfully!"))
//   .catch(err => console.error(" Connection error:", err))};
// conect();
// async function insertDatawithFile() {
//   try {
//     const result = await websiteLegal.create({ title:"privacy_policy", src:"https://drive.google.com/file/d/1jApMMqqODroMLjMjqxGtWtZZek52HCsb/view?usp=sharing" });
//   } catch (err) {
//     console.log("Error inserting document:", err);
//     } finally {
//       await mongoose.connection.close();
//       console.log("MongoDB connection closed");
//   }
// }

module.exports = { insertData, deleteChapter };