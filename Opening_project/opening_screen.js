// start button new page

const page = document.getElementById("page");
const novel = document.getElementById("novel");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {
    page.classList.add("inactive"); //kicks opening_screen page ID to the curb
    page.inert = true; //inactive set to true
    novel.hidden = false; //hidden is false so now visible
});

//FUCK YEAH