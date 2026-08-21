//for data validat
const fileupload = document.getElementsByClassName('file-upload');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('file-name');
// input of title and name
fileInput.addEventListener('change', () => {
  fileupload[0].style.background = "transparent";
  fileName.textContent = fileInput.files.length
    ? fileInput.files[0].name
    : 'No file chosen';
});
// access dom element
const subsem = document.getElementById("subsem");
const selectSem = document.getElementById('SEMESTER');// SEMETER OPTION
const selectSub = document.getElementById('SUBJECT');// SUBJECT OPTION
const selectSec = document.getElementById('secFirstsem');//SEMEMTER FIRST OPTIONN
const secSecondsem = document.getElementById("secSecondsem");//SEC SECOND SEMESTER OPTION 
const major_minor = document.getElementById("mojor_minor");// major and minor select
const thirdsemsec = document.getElementById("thirdsemsec");// sec third sem 
//   // first sec sem 
selectSec.style.display = "none";
// //second sem 
secSecondsem.style.display = "none";
//   //major minor option
major_minor.style.display = "none";
//sec third sem 
thirdsemsec.style.display = "none";
// THIS IS SELETE SEMEMTER ONE TWO THIRD
selectSem.addEventListener('change', () => {
  let selectSubValue = selectSub.selectedOptions[0].value;
  if (selectSem.selectedOptions[0].value === "First" && (selectSub.selectedOptions[0].value == "sec")) {
    selectSec.style.display = ""; // DISPLAYA ON SCREEN 
    selectSec.disabled = false;// DISPLAY SELECTION VALUE
    //second sem 
    secSecondsem.style.display = "none";
    secSecondsem.disabled = true;
    //third sem major minor 
    major_minor.style.display = "none";
    major_minor.disabled = true;
    //sec third sem 
    thirdsemsec.style.display = "none";
    thirdsemsec.disabled = true;
  } else if (selectSem.selectedOptions[0].value === "Second" && (selectSub.selectedOptions[0].value == "sec")) {
    //second semester
    secSecondsem.style.display = "";
    secSecondsem.disabled = false;
    //first sem
    selectSec.style.display = "none";
    selectSec.disabled = true;
    //third sem major minor 
    major_minor.style.display = "none";
    major_minor.disabled = true;
    //sec third sem 
    thirdsemsec.style.display = "none";
    thirdsemsec.disabled = true;
  } else if ((selectSem.selectedOptions[0].value === "Third") && (selectSub.selectedOptions[0].value == "sec")) {
    //sec third sem 
    thirdsemsec.style.display = '';
    thirdsemsec.disabled = false;
    // first sem
    selectSec.style.display = "none";
    selectSec.disabled = true;
    //third sem major minor 
    major_minor.style.display = "none";
    major_minor.disabled = true;
    //second semester
    secSecondsem.style.display = "none";
    secSecondsem.disabled = true;
  } else if ((selectSem.selectedOptions[0].value === "Third")&&(selectSub.selectedOptions[0].value == "computerscience" || selectSub.selectedOptions[0].value == "physics" || selectSub.selectedOptions[0].value == "chemistry" || selectSub.selectedOptions[0].value == "math" || selectSub.selectedOptions[0].value == "statistics" || selectSub.selectedOptions[0].value == "geologie")){
       //major minor option
    major_minor.style.display ='';
    major_minor.disabled = false;
    //  first sem 
    selectSec.style.display = "none"; // DISPLAYA ON SCREEN 
    selectSec.disabled = true;// DISPLAY SELECTION VALUE
    //second sem 
    secSecondsem.style.display = "none";
    secSecondsem.disabled = true;
   //sec third sem 
    thirdsemsec.style.display = "none";
    thirdsemsec.disabled = true;
   } 
  else if (selectSem.selectedOptions[0].value === "First" || selectSem.selectedOptions[0].value === "Second") {
    //major minor option
    major_minor.style.display = "none";
    major_minor.disabled = ture;
     //  first sem 
    selectSec.style.display = "none"; // DISPLAYA ON SCREEN 
    selectSec.disabled = true;// DISPLAY SELECTION VALUE
    //second sem 
    secSecondsem.style.display = "none";
    secSecondsem.disabled = true;
   //sec third sem 
    thirdsemsec.style.display = "none";
    thirdsemsec.disabled = true;
  }
})
selectSub.addEventListener('change', () => {
  let sub = selectSub.selectedOptions[0].value;
  if (sub != "sec") {
    //sec second semester
    secSecondsem.style.display = "none";
    secSecondsem.disabled = true;
    //sec fist semsester
    selectSec.style.display = "none";
    selectSec.disabled = true;
    //sec third sem 
    thirdsemsec.style.display = "none";
    thirdsemsec.disabled = true;
    if ((selectSem.selectedOptions[0].value === "Third") && (selectSub.selectedOptions[0].value == "computerscience" || selectSub.selectedOptions[0].value == "physics" || selectSub.selectedOptions[0].value == "chemistry" || selectSub.selectedOptions[0].value == "math" || selectSub.selectedOptions[0].value == "statistics" || selectSub.selectedOptions[0].value == "geologie")) {
      //major minor option
      major_minor.style.display = "";
      major_minor.disabled = false;
    } else {
      //third sem major minor 
      major_minor.style.display = "none";
      major_minor.disabled = true;
    }
  } else {
    if (selectSem.selectedOptions[0].value === "First") {
      //fist sem 
      selectSec.style.display = "";
      selectSec.disabled = false;
      //second sem 
      secSecondsem.style.display = "none";
      secSecondsem.disabled = true;
      //third sem major minor 
      major_minor.style.display = "none";
      major_minor.disabled = true;
      //sec third sem 
      thirdsemsec.style.display = "none";
      thirdsemsec.disabled = true;
    } else if (selectSem.selectedOptions[0].value === "Second") {
      //second semester
      secSecondsem.style.display = "";
      secSecondsem.disabled = false;
      //first semester
      selectSec.style.display = "none";
      selectSec.disabled = true;
      //sec third sem 
      thirdsemsec.style.display = "none";
      thirdsemsec.disabled = true;
      //third sem major minor 
      major_minor.style.display = "none";
      major_minor.disabled = true;
    } else if ((selectSem.selectedOptions[0].value === "Third")) {
      selectSec.style.display = "none"; // DISPLAYA ON SCREEN 
      selectSec.disabled = true;// DISPLAY SELECTION VALUE
      //second sem 
      secSecondsem.style.display = "none";
      secSecondsem.disabled = true;
      //sec third sem 
      thirdsemsec.style.display = '';
      thirdsemsec.disabled = false;
      //third sem major minor 
      major_minor.style.display = "none";
      major_minor.disabled = true;
    }
  }
  let n = 7;
  switch (selectSub.selectedOptions[0].value) {
    case "md" :n=4; break;
    case "sec": n = 4; break;
    case "Aec": n = 5; break;
    case "ayurveda": n = 3; break;
    case "environment": n = 3; break;
    case "yoga": n = 3; break;
    default: n=7;
  }
  for(let i=0;i<n;i++){
    selectSem[i].style.display ='';
  }
  for (let i = n; i <= 6; i++) {
    selectSem[i].style.display = "none";
  };
  //   //row chage 
  //   if (suj !="sec"){
  //     console.dir(selectSem);
  //       // subsem.style.gridColumnStart= "3";
  //    subsem.style.gridRowStart= "3";
  //   }else{  subsem.style.gridTemplateColumns = "repeat(3, 1fr)";}
}
)
//title validat
document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const namevalid = document.getElementById('name');
  const Semester = document.getElementById('SEMESTER').value;
  const major_minor = document.getElementById("mojor_minor").value;// major and minor select
  //  console.dir(selectSec.selectedOptions[0].value);
let subject=selectSub.selectedOptions[0].value; 
  let secSubjectvalue = null;
   if(subject=== "sec"){ 
    if(Semester == "First"){
      secSubjectvalue=selectSec.selectedOptions[0].value;
    }else if(Semester == "Second"){
      secSubjectvalue=secSecondsem.selectedOptions[0].value;
    }else{
      secSubjectvalue=thirdsemsec.selectedOptions[0].value;
    }}
  const title = namevalid.value.trim();
  const response = await fetch(`/check-title?title=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}&Semester=${encodeURIComponent(Semester)}&major_minor=${encodeURIComponent(major_minor)}&secSubject=${encodeURIComponent(secSubjectvalue)}`);
const data = await response.json();
 console.log(data.exist);
 console.log(data.message); // 👈 fetch text response
  if (data.exist) {
    alert(data.message);
  } else {
    // Disable button
    document.getElementById("filesubmitBtn").disabled = true;
    // Optional: poori screen block
    document.body.style.pointerEvents = "none";
    document.body.style.opacity = "0.6";
    let overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    this.submit();
  }
});
