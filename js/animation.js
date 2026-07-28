/* FILE: js/scroll-animation.js */


/* =====================================
   SCROLL REVEAL SYSTEM
===================================== */


const revealElements =
  document.querySelectorAll(
    `
    .hero-content,
    .project-card,
    footer
    `
  );





/* =====================================
   OBSERVER SETTINGS
===================================== */


const revealObserver =
  new IntersectionObserver(
    (entries) => {


      entries.forEach(
        (entry) => {


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

      rootMargin:
        "0px 0px -80px"

    }
  );





/* =====================================
   INITIALIZE
===================================== */


revealElements.forEach(
  (element) => {


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
    (element) => {


      element.classList.add(
        "visible"
      );


    }
  );


}





/* =====================================
   STAGGER EFFECT
===================================== */


const projectCards =
  document.querySelectorAll(
    ".project-card"
  );





projectCards.forEach(
  (card,index) => {


    card.style.transitionDelay =
      `${index * 80}ms`;


  }
);