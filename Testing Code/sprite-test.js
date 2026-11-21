// HTML affection points
let htmlPoints = 0;

// Find HTML elements
const characterName = document.getElementById("character-name");
const characterImage = document.getElementById("character-image");
const dialogueText = document.getElementById("dialogue-text");
const choices = document.getElementById("choices");
const affectionText = document.getElementById("affection");

// story starting track thing
let currentScene = 0;


// STORY DIALOGUE
const story = [

    // 0. Opening narration
    {
        name: "Narration",
        image: "htmldefault.png",
        text: "After a series of failed relationships, you decide to give dating another chance. Encouraged by a friend, you agree to attend a blind date mixer at your college. The event is supposed to be a casual opportunity to meet new people, but things don't go exactly as planned...",
        next: "Continue"
    },

    // 1. HTML introduction
    {
        name: "HTML",
        image: "htmlhappy.png",
        text: "Hello! It's nice to meet you. My name is HTML. I hope you're enjoying the event!",
        next: "Continue"
    },

    // 2. First conversation
    {
        name: "HTML",
        image: "htmltalk.png",
        text: "Are you a student here too? I actually help organize some of the campus events!",
        next: "Continue"
    },

    // 3. First choices
    {
        name: "HTML",
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

    // 4. Second conversation
    {
        name: "HTML",
        image: "htmlconcern.png",
        text: "Sometimes I spend so much time helping everyone else that I forget to do things for myself.",
        next: "Continue"
    },

    // 5. Second choices
    {
        name: "HTML",
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

    // 6. Third conversation 
    {
        name: "HTML",
        image: "htmltalk.png",
        text: "So..what do you enjoying doing in your free time? I like to study..ah is that boring? haha..I also like to read manga during my spare time.",
        next: "Continue"
    },
    
    // 7. Third choices
    {
        
        name: "HTML",
        image: "htmllooking.png",
        text: "What do you say?",
        options: [
            {
                text: "I don't think it's boring at all, it's great to see someone hardworking on their academics!",
                points: 1,
                image: "htmlhappy.png"
            },
            {
                text: "Hm. I think you should try to do something more fun in your free time, like going out with friends or playing games.",
                points: -1,
                image: "htmlsad.png"
            }
        ]
    },

    // 7. Choose romance or friendship
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
]; //closes the final scene 


// DISPLAY THE CURRENT SCENE
function showScene() {

    let scene = story[currentScene];

    characterName.textContent = scene.name;
    characterImage.src = "../images/" + scene.image;
    dialogueText.textContent = scene.text;

    // Clear out any old buttons
    choices.innerHTML = "";

    // Display affection points
    affectionText.textContent = "HTML Affection: " + htmlPoints;


    // If there are choices, create choice buttons
    if (scene.options) {

        scene.options.forEach(function(option) {

            let button = document.createElement("button");

            button.textContent = option.text;

            button.addEventListener("click", function() {

                // Add or subtract affection
                if (option.points !== undefined) {
                    htmlPoints += option.points;
                }

                // Change character expression
                if (option.image) {
                    characterImage.src = "../images/" + option.image;
                }

                // Check if player picked an ending
                if (option.ending) {

                    showEnding(option.ending);

                } else {

                    currentScene++;
                    showScene();

                }

            });

            choices.appendChild(button);

        });

    } else {

        // Create Continue button
        let button = document.createElement("button");

        button.textContent = scene.next;

        button.addEventListener("click", function() {

            currentScene++;
            showScene();

        });

        choices.appendChild(button);
    }

}


// Romance or friendzone ending LOL
function showEnding(ending) {

    choices.innerHTML = "";

    affectionText.textContent = "Final HTML Affection: " + htmlPoints;

    if (ending === "romance" && htmlPoints >= 2) {

        characterName.textContent = "Romance Ending";
        characterImage.src = "../images/htmlhappy.png";

        dialogueText.textContent =
            "Really? I was hoping you'd ask. I'd love to see you again.";

    } else {

        characterName.textContent = "Friendship Ending";
        characterImage.src = "../images/htmlhappy.png";

        dialogueText.textContent =
            "That's alright! I'm still really glad we got to meet. I hope we can stay friends.";

    }

    // Play again button
    let restartButton = document.createElement("button");

    restartButton.textContent = "Play Again";

    restartButton.addEventListener("click", function() {

        htmlPoints = 0;
        currentScene = 0;

        showScene();

    });

    choices.appendChild(restartButton);

}


// Start the game
showScene();

