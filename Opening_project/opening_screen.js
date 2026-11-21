//Hover on sprite show info
const sprites = document.querySelectorAll(".sprite");

sprites.forEach(function (sprite) {
    sprite.addEventListener("mouseenter", function(){
        sprite.classList.add("active");
    });

    sprite.addEventListener("mouseleave", function() {
        sprite.classList.remove("active");
    });
});

// start button >> new page
const page = document.getElementById("page");
const novel = document.getElementById("novel");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {
    page.classList.add("inactive"); //kicks opening_screen page ID to the curb
    page.inert = true; //inactive set to true
    novel.hidden = false; //hidden is false so now visible
});

//FUCK YEAH. . . . now repeat this for the about how to play and feedback. Basically make all of navigation clickable to set new page true to visible or invisible. Can we make it so when the button is clicked again it sets it to off?

const navTabs = document.querySelectorAll(".nav-tab");
const pages = document.querySelectorAll(".page");

let openPageId = null;

function closePage() {

    pages.forEach(function (page) {
        page.classList.remove("open");
    });

    navTabs.forEach(function (tab) {
        tab.classList.remove("selected");
    });

    openPageId = null;
}

navTabs.forEach(function (tab){
    tab.addEventListener("click", function (){
        const pageId = tab.id + "-page";

        if (openPageId == pageId){
            closePage();
            return;
        }

        closePage();
        document.getElementById(pageId).classList.add("open");
        tab.classList.add("selected");
        openPageId = pageId;
    });
});