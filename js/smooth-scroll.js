/* FILE: js/smooth-scroll.js */


/* =====================================
   SMOOTH SCROLL SYSTEM
===================================== */


const scrollLinks =
  document.querySelectorAll(
    'a[href^="#"]'
  );





scrollLinks.forEach(
  (link) => {


    link.addEventListener(
      "click",
      (event) => {


        const targetId =
          link.getAttribute(
            "href"
          );



        const target =
          document.querySelector(
            targetId
          );



        if(!target) return;



        event.preventDefault();



        target.scrollIntoView({

          behavior:
            "smooth",

          block:
            "start"

        });


      }
    );


  }
);





/* =====================================
   HEADER SCROLL EFFECT
===================================== */


const header =
  document.querySelector(
    ".header"
  );





const handleHeader =
  () => {


    if(!header) return;



    if(window.scrollY > 60){


      header.classList.add(
        "scrolled"
      );


    } else {


      header.classList.remove(
        "scrolled"
      );


    }


  };





window.addEventListener(
  "scroll",
  handleHeader,
  {

    passive:true

  }
);





/* =====================================
   ACTIVE SECTION TRACKING
===================================== */


const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navigationLinks =
  document.querySelectorAll(
    ".header nav a"
  );





const updateActiveSection =
  () => {


    let currentSection =
      "";



    sections.forEach(
      (section) => {


        const sectionTop =
          section.offsetTop - 180;



        if(
          window.scrollY >= sectionTop
        ){


          currentSection =
            section.id;


        }


      }
    );



    navigationLinks.forEach(
      (link) => {


        link.classList.remove(
          "active"
        );



        if(
          link.getAttribute(
            "href"
          )
          ===
          `#${currentSection}`
        ){


          link.classList.add(
            "active"
          );


        }


      }
    );


  };





window.addEventListener(
  "scroll",
  updateActiveSection,
  {

    passive:true

  }
);





/* =====================================
   INITIAL CHECK
===================================== */


handleHeader();

updateActiveSection();