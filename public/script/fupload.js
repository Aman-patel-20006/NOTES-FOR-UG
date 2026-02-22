//for data validat
const fileupload = document.getElementsByClassName('file-upload');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('file-name');
fileInput.addEventListener('change', () => {
  fileupload[0].style.background = "transparent";
  fileName.textContent = fileInput.files.length
    ? fileInput.files[0].name
    : 'No file chosen';
});
// access dom element
const selectSem = document.getElementById('SEMESTER');
const selectSub = document.getElementById('SUBJECT');
const selectSec = document.getElementById('secFirstsem');
const secSecondsem = document.getElementById("secSecondsem");
  secSecondsem.style.display ="none";
secSecondsem.disabled = true;  // hide element
selectSem.addEventListener('change', () => {
  if(selectSem.selectedOptions[0].value === "First" && (selectSub.selectedOptions[0].value == "sec") ){
       selectSec.style.display = "";
       //second sem 
         secSecondsem.style.display ="none";
       secSecondsem.disabled = true; 
  }else if (selectSem.selectedOptions[0].value === "Second" && (selectSub.selectedOptions[0].value == "sec")) {
    selectSec.style.display = "none";
    //second semester
    secSecondsem.style.display ="";
    secSecondsem.disabled = false;
  }
})
selectSub.addEventListener('change', () => {
  let sub = selectSub.selectedOptions[0].value;
  if (sub != "sec" ) {
        //sec second semester
  secSecondsem.style.display ="none";
    secSecondsem.disabled = true;
    //sec fist semsester
    selectSec.style.display = "none";
    selectSec.disabled = true;
  } else {
     selectSec.style.display = '';
    selectSec.disabled = false;
    if(selectSem.selectedOptions[0].value === "First"){
 selectSec.style.display = "";
       //second sem 
         secSecondsem.style.display ="none";
       secSecondsem.disabled = true; 
    }else if(selectSem.selectedOptions[0].value === "Second"){
   selectSec.style.display = "none";
    //second semester
    secSecondsem.style.display ="";
    secSecondsem.disabled = false;
    }
   
  }
  let n = 7;
  switch (selectSub.selectedOptions[0].value) {
    case "sec": n = 4; break;
    case "Aec": n = 4; break;
    case "ayurveda": n = 3; break;
    case "environment": n = 3; break;
    case "yoga": n = 3; break;
    default: n = 7;
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
  let subj = selectSub.selectedOptions[0].value;
  let subject = (subj === "sec") ? selectSec.selectedOptions[0].value : subj;
  const title = namevalid.value.trim();
  const res = await fetch(`/check-title?title=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}&Semester=${encodeURIComponent(Semester)}`);
  const text = await res.text(); // 👈 fetch text response
  if (text === "true") {
    alert("Chapter name already exists ! Please Change Name Like This [CHAPER NAME Notes-1]");
  } else {
    this.submit();
  }
});
