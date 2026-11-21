// Start of the visual novel :D
const page = document.getElementById("page");
const novel = document.getElementById("novel");
const startButton = document.getElementById("start-button");

const dialogueText = document.getElementById("dialogue-text");
const continueButton = document.getElementById("continue-button");

// Intro narration
const introDialogue = [
    "After a series of failed relationships, you decide to give dating another chance.",

    "Encouraged by a friend, you agree to attend a blind date mixer at your college.",

    "The event is supposed to be a casual opportunity to meet new people, but things don't go exactly as planned..."
];

let dialogueIndex = 0;

// Show the first narration when Start is clicked
startButton.addEventListener("click", function() {
    page.classList.add("inactive");
    page.inert = true;

    novel.hidden = false;

    dialogueIndex = 0;
    dialogueText.textContent = introDialogue[dialogueIndex];
});

// Continue to the next narration
continueButton.addEventListener("click", function() {
    dialogueIndex++;

    if (dialogueIndex < introDialogue.length) {
        dialogueText.textContent = introDialogue[dialogueIndex];
    } else {
        dialogueText.textContent = "You take a deep breath and step into the mixer...";
        continueButton.textContent = "Meet the Characters";

        // then after that next chara scene can come 
    }
});
