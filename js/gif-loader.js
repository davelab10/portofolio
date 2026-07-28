/* FILE: js/gif-loader.js */


/* =====================================
   GIF LAZY LOADER SYSTEM
===================================== */


const gifImages =
  document.querySelectorAll(
    ".project-media img"
  );





/* =====================================
   OBSERVER CONFIG
===================================== */


const gifObserver =
  new IntersectionObserver(
    (entries) => {


      entries.forEach(
        (entry) => {


          if(entry.isIntersecting){


            const image =
              entry.target;



            image.classList.add(
              "loaded"
            );



            gifObserver.unobserve(
              image
            );


          }


        }
      );


    },
    {

      threshold:0.15,

      rootMargin:
        "150px"

    }
  );





/* =====================================
   INIT GIF OBSERVER
===================================== */


gifImages.forEach(
  (image) => {


    gifObserver.observe(
      image
    );


  }
);





/* =====================================
   IMAGE ERROR FALLBACK
===================================== */


gifImages.forEach(
  (image) => {


    image.addEventListener(
      "error",
      () => {


        image.src =
          "assets/gif/placeholder.gif";


        image.classList.add(
          "error"
        );


      }
    );


  }
);





/* =====================================
   GIF LOAD EFFECT
===================================== */


gifImages.forEach(
  (image) => {


    image.addEventListener(
      "load",
      () => {


        image.classList.add(
          "loaded"
        );


      }
    );


  }
);