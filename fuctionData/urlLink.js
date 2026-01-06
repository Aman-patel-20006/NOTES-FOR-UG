function viewLink(chapterData,chapterName){
     let srcLink = null;
       for (const item of chapterData) {
    let Name = item.title.toLocaleLowerCase();
    if (Name === chapterName.toLocaleLowerCase()) {
      srcLink = item.src;
      break;
    } else {
      srcLink = "https://drive.google.com/file/d/1qWZW0RkCy90Wn2woazMtfd8fG3-Uu10i/view?usp=sharing"
    }
  };
  const first = srcLink.indexOf("/view");
    return srcLink.slice(0, first).concat("/preview");

}

function downloadurl(srcLink){
 // Find start index of file ID
  const start = srcLink.indexOf("/d/") + 3;
  // Find end index of file ID
  const end = srcLink.indexOf("/", start);
  // Extract file ID using slice
  const fileId = srcLink.slice(start, end);
  const downloadLink = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : srcLink;
return downloadLink;
}
module.exports={viewLink,downloadurl};