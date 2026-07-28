/* FILE: js/cursor.js */


/* =====================================
   CUSTOM CURSOR SYSTEM
===================================== */


const cursor =
  document.createElement(
    "div"
  );


cursor.className =
  "custom-cursor";


document.body.appendChild(
  cursor
);





/* =====================================
   CURSOR POSITION
===================================== */


let mouseX = 0;

let mouseY = 0;


let cursorX = 0;

let cursorY = 0;





window.addEventListener(
  "mousemove",
  (event) => {


    mouseX =
      event.clientX;


    mouseY =
      event.clientY;


  }
);





/* =====================================
   SMOOTH FOLLOW
===================================== */


const updateCursor =
  () => {


    cursorX +=
      (
        mouseX -
        cursorX
      ) * .15;



    cursorY +=
      (
        mouseY -
        cursorY
      ) * .15;



    cursor.style.left =
      `${cursorX}px`;



    cursor.style.top =
      `${cursorY}px`;



    requestAnimationFrame(
      updateCursor
    );


  };





updateCursor();





/* =====================================
   HOVER INTERACTION
===================================== */


const hoverTargets =
  document.querySelectorAll(
    `
    a,
    button,
    .magnetic,
    .project-card,
    .project-media
    `
  );





hoverTargets.forEach(
  (element) => {


    element.addEventListener(
      "mouseenter",
      () => {


        cursor.classList.add(
          "active"
        );


      }
    );



    element.addEventListener(
      "mouseleave",
      () => {


        cursor.classList.remove(
          "active"
        );


      }
    );


  }
);





/* =====================================
   CLICK EFFECT
===================================== */


window.addEventListener(
  "mousedown",
  () => {


    cursor.classList.add(
      "click"
    );


  }
);





window.addEventListener(
  "mouseup",
  () => {


    cursor.classList.remove(
      "click"
    );


  }
);





/* =====================================
   WINDOW VISIBILITY
===================================== */


document.addEventListener(
  "mouseleave",
  () => {


    cursor.style.opacity =
      "0";


  }
);





document.addEventListener(
  "mouseenter",
  () => {


    cursor.style.opacity =
      "1";


  }
);





/* =====================================
   MOBILE DISABLE
===================================== */


const isMobile =
  window.matchMedia(
    "(max-width:900px)"
  );





if(
  isMobile.matches
){


  cursor.remove();


}





/* =====================================
   RESIZE HANDLER
===================================== */


window.addEventListener(
  "resize",
  () => {


    if(
      window.innerWidth <= 900 &&
      cursor
    ){


      cursor.remove();


    }


  }
);