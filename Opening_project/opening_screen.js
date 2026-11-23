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

const page = document.getElementById("page");
const novel = document.getElementById("novel");
const startButton = document.getElementById("start-button");

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


// The next scene after you open the game lol
const sceneHeading = document.getElementById("scene-heading");
const characterImage = document.getElementById("character-image");
const speakerName = document.getElementById("speaker-name");
const dialogueText = document.getElementById("dialogue-text");
const choices = document.getElementById("choices");
const affectionText = document.getElementById("affection");


let charactersMet = [];
let htmlPoints = 0;
let htmlSceneIndex = 0;

const characterNames = {
    html: "HTML",
    css: "CSS",
    js: "JavaScript"
};

const htmlStory = [
    {
        name: "HTML",
        image: "htmlhappy.png",
        text: "Hello! It's nice to meet you. My name is HTML. I hope you're enjoying the event!",
        next: "Continue"
    },
    {
        name: "HTML",
        image: "htmltalk.png",
        text: "Are you a student here too? I actually help organize some of the campus events!",
        next: "Continue"
    },
    {
        name: "You",
        image: "htmlhappy.png",
        text: "How do you respond?",
        options: [
            {
                text: "You seem really nice! It's cute how involved you are.",
                points: 1,
                image: "htmlshy.png"
            },
            {
                text: "Wow, sounds like a lot of work. I'd hate that...",
                points: -1,
                image: "htmlsad.png"
            }
        ]
    },
    {
        name: "HTML",
        image: "htmlconcern.png",
        text: "Sometimes I spend so much time helping everyone else that I forget to do things for myself.",
        next: "Continue"
    },
    {
        name: "You",
        image: "htmllooking.png",
        text: "What do you say?",
        options: [
            {
                text: "You deserve a break too, you know.",
                points: 1,
                image: "htmlhappy.png"
            },
            {
                text: "Well, you chose to be responsible.",
                points: -1,
                image: "htmlsad.png"
            }
        ]
    },
    {
        name: "HTML",
        image: "htmltalk.png",
        text: "So, what do you enjoy doing in your free time? I like to study... Is that boring? I also like reading manga.",
        next: "Continue"
    },
    {
        name: "You",
        image: "htmllooking.png",
        text: "What do you say?",
        options: [
            {
                text: "I don't think it's boring at all. It's great to see someone hardworking in their studies!",
                points: 1,
                image: "htmlhappy.png"
            },
            {
                text: "You should try something more fun, like going out with friends or playing games.",
                points: -1,
                image: "htmlsad.png"
            }
        ]
    },
    {
        name: "HTML",
        image: "htmlshy.png",
        text: "I've really enjoyed talking with you. Would you like to see me again?",
        options: [
            {
                text: "I'd like to go on a date with you!",
                ending: "romance"
            },
            {
                text: "I think we'd be better as friends.",
                ending: "friendship"
            }
        ]
    }
];


startButton.addEventListener("click", function() {
    page.classList.add("inactive");
    page.inert = true;
    novel.hidden = false;
    showIntro();
});

// Show one intro scene before the player chooses a character.
function showIntro() {
    sceneHeading.textContent = "Friday Night - The Mixer";
    characterImage.hidden = true;
    speakerName.textContent = "Narration";
    affectionText.textContent = "";
    dialogueText.textContent =
        "Your friend Ilia invited you to a college mixer to help you move on from your breakup. After you arrive, Ilia points out three people they think you should meet.";

    choices.innerHTML = "";
    addButton("Continue", showCharacterPicker);
}


// the chara options to choose from hehe I lwk would pick html :3
function showCharacterPicker() {

    novel.classList.add("character-selection");
    sceneHeading.textContent = "The Mixer";
    speakerName.textContent = "Narration";
    affectionText.textContent = "";

    characterImage.hidden = true;

    dialogueText.textContent =
        "Who will you walk over to?";

    choices.innerHTML = "";
    choices.classList.add("character-picker");

    // Character choices
    let characters = [
        {
            name: characterNames.html,
            image: "../images/htmldefault.png",
            id: "html"
        },
        {
            name: characterNames.css,
            image: "../images/cssdefault.png",
            id: "css"
        },
        {
            name: characterNames.js,
            image: "../images/jsdefault.png",
            id: "js"
        }
    ];

    characters.forEach(function(character) {

        let button = document.createElement("button");
        button.classList.add("character-choice");

        let image = document.createElement("img");
        image.src = character.image;
        image.alt = character.name;

        let name = document.createElement("span");
        name.textContent = character.name;

        button.appendChild(image);
        button.appendChild(name);

        // Disable characters already met
        if (charactersMet.includes(character.id)) {
            button.disabled = true;
            name.textContent = character.name + " (Met)";
        }

        button.addEventListener("click", function() {
            showCharacterRoute(character.id);
        });

        choices.appendChild(button);

    });

}


// Character route scenes
function showCharacterRoute(character) {

    novel.classList.remove("character-selection");
    choices.classList.remove("character-picker");

    if (character === "html") {
        htmlPoints = 0;
        htmlSceneIndex = 0;
        showHtmlScene();
        return;
    }

    choices.innerHTML = "";

    characterImage.hidden = false;
    affectionText.textContent = "";

    // CSS route
    if (character === "css") {

        sceneHeading.textContent = "Friday Night - The Mixer";
        speakerName.textContent = characterNames.css;
        characterImage.src = "../images/cssdefault.png";

        dialogueText.textContent =
            "Tch. Fine, whatever. I'm CSS. Let's just get this over with...";

    }

    // JavaScript route
    else if (character === "js") {

        sceneHeading.textContent = "Friday Night - The Mixer";
        speakerName.textContent = characterNames.js;
        characterImage.src = "../images/jsdefault.png";

        dialogueText.textContent =
            "Hey there! Haven't seen you around here before! I'm JavaScript, but friends call me JS!";

    }

    // Temporary ending for each character route
    addButton("Continue", function() {

        speakerName.textContent = characterNames[character];

        dialogueText.textContent =
            "It was nice talking with you! I should probably go check on my friends. See you around!";

        characterImage.hidden = true;
        choices.innerHTML = "";

        addButton("Return to the Mixer", function() {

            // Remember that this character was met
            finishCharacterRoute(character);

        });

    });

}

function showHtmlScene() {
    const scene = htmlStory[htmlSceneIndex];

    sceneHeading.textContent = "Friday Night - The Mixer";
    speakerName.textContent = scene.name;
    characterImage.src = "../images/" + scene.image;
    characterImage.alt = "HTML character";
    characterImage.hidden = false;
    dialogueText.textContent = scene.text;
    affectionText.textContent = "HTML Affection: " + htmlPoints;
    choices.innerHTML = "";

    if (scene.options) {
        scene.options.forEach(function(option) {
            addButton(option.text, function() {
                if (option.points !== undefined) {
                    htmlPoints += option.points;
                }

                if (option.image) {
                    characterImage.src = "../images/" + option.image;
                }

                if (option.ending) {
                    showHtmlEnding(option.ending);
                } else {
                    htmlSceneIndex++;
                    showHtmlScene();
                }
            });
        });
        return;
    }

    addButton(scene.next, function() {
        htmlSceneIndex++;
        showHtmlScene();
    });
}

function showHtmlEnding(ending) {
    const hasRomanceEnding = ending === "romance" && htmlPoints >= 2;

    speakerName.textContent = hasRomanceEnding ? "Romance Ending" : "Friendship Ending";
    characterImage.src = "../images/htmlhappy.png";
    dialogueText.textContent = hasRomanceEnding
        ? "Really? I was hoping you'd ask. I'd love to see you again."
        : "That's alright! I'm still really glad we got to meet. I hope we can stay friends.";
    affectionText.textContent = "Final HTML Affection: " + htmlPoints;
    choices.innerHTML = "";

    addButton("Return to the Mixer", function() {
        finishCharacterRoute("html");
    });
}

function finishCharacterRoute(character) {
    if (!charactersMet.includes(character)) {
        charactersMet.push(character);
    }

    if (charactersMet.length === 3) {
        showFinalScene();
    } else {
        showCharacterPicker();
    }
}


// final scenes after player meets all three charas 
function showFinalScene() {

    sceneHeading.textContent = "Friday Night - The Mixer";

    characterImage.hidden = true;
    speakerName.textContent = "Narration";
    affectionText.textContent = "";

    dialogueText.textContent =
        "After meeting everyone at the mixer, you take a moment to think about the interesting people you've met tonight. Maybe this event wasn't such a bad idea after all...";

    choices.innerHTML = "";

    addButton("Finish", function() {

        dialogueText.textContent =
            "Thanks for playing Love Triangle!";

        choices.innerHTML = "";

    });

}


// Button function to add the stuff to the choices div
function addButton(buttonText, action) {

    let button = document.createElement("button");

    button.textContent = buttonText;

    button.addEventListener("click", action);

    choices.appendChild(button);

}

