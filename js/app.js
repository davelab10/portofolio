const projectsContainer = document.getElementById("projects");

/* ==========================================
PROJECT RENDER
========================================== */

function renderProjects() {

    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    projects.forEach(project => {

        const section = document.createElement("section");

        section.className = "project";

        section.innerHTML = `

            <div class="project-header">

                <span class="project-number">
                    ${project.number}
                </span>

                <span class="project-category">
                    ${project.category}
                </span>

            </div>

            <div class="project-title">

                <h2>
                    ${project.title}
                </h2>

            </div>

            <div class="project-preview">

                <img
                    src="${project.gif}"
                    alt="${project.title}"
                    loading="lazy">

            </div>

            <div class="project-footer">

                <div class="project-description">

                    ${project.description}

                </div>

                <div class="project-meta">

                    <div class="project-tags">

                        ${project.tags.map(tag=>`

                            <span>${tag}</span>

                        `).join("")}

                    </div>

                    <a
                        href="${project.link}"
                        class="project-link">

                        View Case Study →

                    </a>

                </div>

            </div>

        `;

        projectsContainer.appendChild(section);

    });

}

renderProjects();

/* ==========================================
LOADER
========================================== */

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

setTimeout(()=>{

loader.style.opacity="0";
loader.style.visibility="hidden";

},1200);

});

/* ==========================================
NAVBAR
========================================== */

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

navbar.classList.toggle(

"scrolled",

window.scrollY>40

);

});

/* ==========================================
REVEAL
========================================== */

const observer=new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.18

}

);

document.querySelectorAll(

".project"

).forEach(el=>observer.observe(el));

/* ==========================================
SMOOTH SCROLL
========================================== */

document.querySelectorAll(

'a[href^="#"]'

).forEach(anchor=>{

anchor.addEventListener(

"click",

e=>{

const target=document.querySelector(

anchor.getAttribute("href")

);

if(!target) return;

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

);

});
