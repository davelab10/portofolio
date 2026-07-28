/* FILE: js/theme.js */


/* =====================================
   THEME SYSTEM
===================================== */


const themeButton =
  document.querySelector(
    ".theme-toggle"
  );


const root =
  document.documentElement;





/* =====================================
   GET SAVED THEME
===================================== */


const savedTheme =
  localStorage.getItem(
    "theme"
  );





const systemTheme =
  window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches
    ? "light"
    : "dark";





const initialTheme =
  savedTheme ||
  systemTheme;





root.setAttribute(
  "data-theme",
  initialTheme
);





/* =====================================
   UPDATE ICON
===================================== */


const updateThemeIcon =
  (theme) => {


    if(!themeButton)
      return;



    themeButton.textContent =
      theme === "dark"
        ? "☾"
        : "☀";


  };





updateThemeIcon(
  initialTheme
);





/* =====================================
   TOGGLE THEME
===================================== */


if(themeButton){


  themeButton.addEventListener(
    "click",
    () => {


      const currentTheme =
        root.getAttribute(
          "data-theme"
        );



      const nextTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";



      root.setAttribute(
        "data-theme",
        nextTheme
      );



      localStorage.setItem(
        "theme",
        nextTheme
      );



      updateThemeIcon(
        nextTheme
      );


    }
  );


}





/* =====================================
   SYSTEM THEME CHANGE
===================================== */


const systemThemeListener =
  window.matchMedia(
    "(prefers-color-scheme: light)"
  );





systemThemeListener.addEventListener(
  "change",
  (event) => {


    const hasSavedTheme =
      localStorage.getItem(
        "theme"
      );



    if(hasSavedTheme)
      return;



    const newTheme =
      event.matches
        ? "light"
        : "dark";



    root.setAttribute(
      "data-theme",
      newTheme
    );



    updateThemeIcon(
      newTheme
    );


  }
);