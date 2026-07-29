/* FILE: js/projects.js */



/* =====================================
   PROJECT CARD INTERACTION
===================================== */


const projectCards =
  document.querySelectorAll(
    ".project-card"
  );





projectCards.forEach(
  card => {


    card.addEventListener(
      "mouseenter",
      () => {


        card.classList.add(
          "active"
        );


      }
    );



    card.addEventListener(
      "mouseleave",
      () => {


        card.classList.remove(
          "active"
        );


      }
    );


  }
);





/* =====================================
   IMAGE MOTION EFFECT
===================================== */


const projectImages =
  document.querySelectorAll(
    ".project-media img"
  );





projectImages.forEach(
  image => {


    image.addEventListener(
      "mousemove",
      (event) => {


        const rect =
          image.getBoundingClientRect();



        const x =
          (
            event.clientX -
            rect.left
          ) / rect.width - 0.5;



        const y =
          (
            event.clientY -
            rect.top
          ) / rect.height - 0.5;



        image.style.transform =

          `
          scale(1.05)
          translate(
            ${x * 15}px,
            ${y * 15}px
          )
          `;


      }
    );





    image.addEventListener(
      "mouseleave",
      () => {


        image.style.transform =
          "scale(1)";


      }
    );


  }
);





/* =====================================
   PROJECT IMAGE ERROR FALLBACK
===================================== */


projectImages.forEach(
  image => {


    image.addEventListener(
      "error",
      () => {


        image.src =
          "assets/gif/placeholder.gif";


      }
    );


  }
);