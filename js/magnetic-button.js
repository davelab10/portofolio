/* FILE: js/magnetic-button.js */


/* =====================================
   MAGNETIC BUTTON SYSTEM
===================================== */


const magneticElements =
  document.querySelectorAll(
    ".magnetic"
  );





/* =====================================
   MAGNETIC EFFECT
===================================== */


magneticElements.forEach(
  (element) => {


    element.addEventListener(
      "mousemove",
      (event) => {


        if(
          window.innerWidth <= 900
        )
          return;



        const rect =
          element.getBoundingClientRect();



        const x =
          event.clientX -
          rect.left -
          rect.width / 2;



        const y =
          event.clientY -
          rect.top -
          rect.height / 2;



        element.style.transform =

          `
          translate3d(
            ${x * .25}px,
            ${y * .25}px,
            0
          )
          `;


      }
    );





    element.addEventListener(
      "mouseleave",
      () => {


        element.style.transform =
          "translate3d(0,0,0)";


      }
    );


  }
);





/* =====================================
   CLEANUP
===================================== */


window.addEventListener(
  "resize",
  () => {


    if(
      window.innerWidth <= 900
    ){


      magneticElements.forEach(
        (element) => {


          element.style.transform =
            "none";


        }
      );


    }


  }
);