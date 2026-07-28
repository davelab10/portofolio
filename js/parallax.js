/* FILE: js/parallax.js */


/* =====================================
   PARALLAX SYSTEM
===================================== */


const parallaxElements =
  document.querySelectorAll(
    "[data-parallax]"
  );





/* =====================================
   MOUSE PARALLAX
===================================== */


let mousePosition = {


  x:0,


  y:0


};





window.addEventListener(
  "mousemove",
  (event) => {


    mousePosition.x =
      (
        event.clientX /
        window.innerWidth
      ) - .5;



    mousePosition.y =
      (
        event.clientY /
        window.innerHeight
      ) - .5;


  }
);





/* =====================================
   ANIMATION LOOP
===================================== */


const updateParallax =
  () => {


    parallaxElements.forEach(
      (element) => {


        const speed =
          Number(
            element.dataset.parallax
          ) || .1;



        const moveX =
          mousePosition.x *
          40 *
          speed;



        const moveY =
          mousePosition.y *
          40 *
          speed;



        element.style.transform =

          `
          translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )
          `;


      }
    );



    requestAnimationFrame(
      updateParallax
    );


  };





updateParallax();





/* =====================================
   SCROLL PARALLAX
===================================== */


window.addEventListener(
  "scroll",
  () => {


    const scrollY =
      window.scrollY;



    parallaxElements.forEach(
      (element) => {


        const speed =
          Number(
            element.dataset.parallax
          ) || .1;



        element.style.translate =
          `
          0
          ${scrollY * speed * .08}px
          `;


      }
    );


  },
  {

    passive:true

  }
);





/* =====================================
   MOBILE DISABLE
===================================== */


if(
  window.matchMedia(
    "(max-width:900px)"
  ).matches
){


  parallaxElements.forEach(
    (element) => {


      element.style.transform =
        "none";


      element.style.translate =
        "none";


    }
  );


}