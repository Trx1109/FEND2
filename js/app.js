/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const VALUE = 150;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function onNavClick(e) {
  e.preventDefault();
  let current = e.target;
  if (current.tagName === "LI" && current.classList.contains("menu__link")) {
    let sectionId = current.dataset["sectionId"];
    scrollTo(sectionId);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
  let sections = document.getElementsByTagName("section");
  let sectionContents = [];
  // let sectionContents = sections.map(section => { id: section.id })
  for (let section of sections) {
    sectionContents.push({ id: section.id, content: section.dataset["nav"] });
  }
  let navContainer = document.getElementById("navbar__list");
  for (let section of sectionContents) {
    let navSection = document.createElement("li");
    navSection.id = `nav-${section.id}`;
    navSection.innerText = section.content;
    navSection.className = "menu__link";
    navSection.dataset["sectionId"] = section.id;
    navContainer.appendChild(navSection);
  }
}
// Add class 'active' to section when near top of viewport
function makeActive() {
  let sections = document.getElementsByTagName("section");
  for (let section of sections) {
    const box = section.getBoundingClientRect();
    //Find a value that works best, but 150 seems to be a good start.
    if (box.top <= VALUE && box.bottom >= VALUE) {
      //apply active state on current section and corresponding Nav link
      section.classList.add("active-section");
      let nav = document.querySelector(`li#nav-${section.id}`);
      nav.classList.add("active-nav");
    } else {
      //Remove active state from other section and corresponding Nav link
      section.classList.remove("active-section");
      let nav = document.querySelector(`li#nav-${section.id}`);
      nav.classList.remove("active-nav");
    }
  }
}
// Scroll to anchor ID using scrollTO event
function scrollTo(id) {
  let section = document.getElementById(id);
  section.scrollIntoView();
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click
document.addEventListener("click", onNavClick);
// Set sections as active
document.addEventListener("scroll", function () {
  makeActive();
});
