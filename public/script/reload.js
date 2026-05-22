//for window catch data delete which show on fonten
window.addEventListener("pageshow", (event) => {
  if (event.persisted || performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
    window.location.reload();
  }
});


// window.addEventListener("load", () => {
//   window.addEventListener("pageshow", (event) => {
//     if (
//       event.persisted ||
//       performance.getEntriesByType("navigation")[0]?.type === "back_forward"
//     ) {
//       window.location.reload();
//     }
//   });
// });
