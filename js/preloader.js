/* FILE: js/preloader.js */


/* =====================================
   PRELOADER SYSTEM
===================================== */


const preloader =
  document.querySelector(
    ".preloader"
  );


const loaderProgress =
  document.querySelector(
    ".loader-progress"
  );





let progress = 0;

let loadingFinished = false;

const startTime =
  Date.now();

const minimumTime =
  2500;





/* =====================================
   PROGRESS ANIMATION
===================================== */


const progressTimer =
  setInterval(
    () => {


      if(progress < 90){


        progress +=
          Math.floor(
            Math.random() * 8
          ) + 2;


      }



      if(loaderProgress){


        loaderProgress.style.width =
          `${progress}%`;


      }


    },
    120
  );





/* =====================================
   COMPLETE LOADING
===================================== */


function completeLoader(){


  if(loadingFinished)
    return;


  loadingFinished = true;


  clearInterval(
    progressTimer
  );


  progress = 100;


  if(loaderProgress){


    loaderProgress.style.width =
      "100%";


  }



  setTimeout(
    () => {


      if(!preloader)
        return;



      preloader.classList.add(
        "hide"
      );



      document.body.classList.add(
        "loaded"
      );



      setTimeout(
        () => {


          preloader.remove();


        },
        1000
      );


    },
    500
  );


}





/* =====================================
   WINDOW LOAD CONTROL
===================================== */


window.addEventListener(
  "load",
  () => {


    const elapsed =
      Date.now() -
      startTime;



    const remaining =
      minimumTime -
      elapsed;



    if(remaining > 0){


      setTimeout(
        completeLoader,
        remaining
      );


    } else {


      completeLoader();


    }


  }
);





/* =====================================
   FAILSAFE
===================================== */


setTimeout(
  () => {


    completeLoader();


  },
  5000
);