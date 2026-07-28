/* FILE: js/scroll-animation.js */


/* =====================================
   SCROLL REVEAL SYSTEM
   Premium Motion Effect
===================================== */


const revealElements =
  document.querySelectorAll(
    ".project-card, .hero-content, footer"
  );





/* =====================================
   OBSERVER CONFIG
===================================== */


const revealObserver =
  new IntersectionObserver(
    (entries) => {


      entries.forEach(
        entry => {


          if(entry.isIntersecting){


            entry.target.classList.add(
              "visible"
            );



            revealObserver.unobserve(
              entry.target
            );


          }


        }
      );


    },
    {

      threshold:0.15,

      rootMargin:"0px 0px -80px"

    }
  );





/* =====================================
   INIT
===================================== */


revealElements.forEach(
  element => {


    element.classList.add(
      "reveal"
    );


    revealObserver.observe(
      element
    );


  }
);





/* =====================================
   FALLBACK SUPPORT
===================================== */


if(
  !("IntersectionObserver" in window)
){


  revealElements.forEach(
    element => {


      element.classList.add(
        "visible"
      );


    }
  );


}