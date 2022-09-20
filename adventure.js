// This is the main JavaScript file
let adventure = "Your adventure starts here !";
console.log(adventure);

// state is initially an empty object.
// This will keep track of our game player and objects etc.
let state = {};

//getting and setting the initial scene text - to ensure the app is running
const textElement = document.getElementById('scenetext');
console.log("text element is:");
console.log(textElement);
console.log("text element innertext  is:");
console.log(textElement.innerText);
textElement.innerHTML = "Hello World!!"
console.log(textElement.innerHTML);

//getting the main div 
const mainDiv = document.getElementById('maindiv');

// start to access the options buttons and display some of their info to the console.
var optionButtonsElement = document.getElementById('option-buttons');
console.log(optionButtonsElement);
console.log(optionButtonsElement.innerText);
console.log(optionButtonsElement.innerHTML);
console.log("Inner Text Length is:", optionButtonsElement.innerText.length);

// react if mouse leaves the div (user may be leaving game)
function waitDontGo() {
    textElement.innerHTML = "Wait !!! Don't GO !"
    console.log("Wait !!! Don't GO !")

}

// function to start the game.
function startGame() {

    // start by initialising the game state to make sure it is empty.
    // for example, we may want to restart the game later.
    // the state is an object to hold the state of the player 
    // and their objects and location in the game etc.
    state = {};

    state.playerhealth = 1000;
    state.gaolerhealth = 1000;

    // put the first piece of text on the page 
    showChosenTextItem(generateRandom(1, 5));

    // some fun for the console.
    console.log("Game Starting !!!");
    console.log("3");
    console.log("2");
    console.log("1");
    console.log("GOOOO !");

}

//function to select game option
function selectOption(option) {
    console.log("Option selected is:", option)
    // get the next block of story text and options
    const nextTextChoiceItem = option.nextText

    // option to restart game if end not successful
    if (nextTextChoiceItem <= 0) {
        return startGame()
    }

    // update and replace the current state
    state = Object.assign(state, option.setState)

    // show the next chosen item
    showChosenTextItem(nextTextChoiceItem)
}

//function to show particular text item
function showChosenTextItem(TextItemNumber) {
    // get the desired text for describing the scene
    // array.find(function(currentValue, index, arr),thisValue)
    let textItem = textItems.find(o => o.item === TextItemNumber)
    // took a while to get this to work - o is a placeholder and => is a function pointer
    // helpful demo here https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
    console.log("Text Item is: ", textItem)

    //log the text for the element describing the scene
    console.log("Text Item is: ", textItem)
    console.log("Text Item Text is: ", textItem.text)

    //set the text for the element describing the scene
    textElement.innerText = textItem.text;

    // set the background for the main div (or a default background)
    urlLocation = textItem.Imgsrc || './assets/images/herringbone.PNG'
    console.log("URL location is: ", urlLocation)
    urlLocation = "url('" + urlLocation + "')"
    console.log("URL location is: ", urlLocation)

    mainDiv.style.backgroundImage = urlLocation;
    // e.g. url('/assets/images/parquet1.PNG')

    const legtext = document.getElementById("legendtext")
    legtext.innerText = `scene #${textItem.item}`

    //clear out the current options, and replace with the options for the current scene
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textItem.option.forEach(option => {
        if (showOption(option)) {
            // create a new button
            const button = document.createElement('button')

            // set the text of the current action button
            button.innerHTML = option.text

            // set the class style for the new button
            button.classList.add('btn')

            console.log("option identity is: ", option.identity)
            // set the id for the new button
            button.id = option.identity

            // set a function for clicking the button
            button.addEventListener('click', () => selectOption(option))

            // consider adding images
            button.style.backgroundImage = "url('./assets/images/herringbone.PNG')";

            button.style.backgroundColor = "orange";

            if (button.style.backgroundColor === "orange") {
                button.style.backgroundColor = "green";
            } else {
                button.style.backgroundColor = "orange";
            }

            // add the button to the page
            optionButtonsElement.appendChild(button)
        }
    });

}


function btnClicked() {
    if (this.style.backgroundColor === "orange") {
        this.style.backgroundColor = "green";
    } else {
        this.style.backgroundColor = "orange";
    }

}


function showOption(option) {
    console.log("Showing Option: ", option)
    // return true if there is no requiredState or the requiredState itself
    return option.requiredState == null || option.requiredState(state);
}

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor(rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

// Added some keypress handling functionality for fight sequences in game!
// Note: We pass the event to the function to get info about it!
// Reusing code institute sample code from keyboard event handling module of course - credits in README.MD .
function handleKeys(event) {

    // set element handles for various divs and displays to process and display keypress results.

    let DpressedBtn = document.getElementById('key-down');
    let ApressedBtn = document.getElementById('key-down');
    let SpressedBtn = document.getElementById('key-down');

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');


    let downDiv = document.getElementById('key-down');
    let upDiv = document.getElementById('key-up');
    let currentKeySpan = document.getElementById('current-key');
    let lastKeySpan = document.getElementById('last-key');


    if (event.repeat) {
        return false; // prevents holding the key from triggering the event again 
    } else {
        if (event.type === 'keydown') {
            // set colour of down div and pressed div (might not need for fight sequences) if key down detected
            DpressedBtn.style.backgroundColor = 'lightgreen';
            ApressedBtn.style.backgroundColor = 'lightorange';
            SpressedBtn.style.backgroundColor = 'lightblue';
            PlayerBarDiv.style.backgroundColor = 'red';
            GaolerBarDiv.style.backgroundColor = 'red';

            //use the text for the text element for describing the keypress
            //textElement.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';
            //console.log(textElement.innerHTML);

            // if we are in the fight scene then the button text can be set - skip if not
            let keyinfo = document.getElementById('DpressedBtn');
            if (keyinfo) {
                keyinfo.innerText = event.key
                console.log(event.key)
            }

        } else if (event.type === 'keyup') {
            // clear colour (to white) of down div and pressed div (might not need for fight sequences) if key down detected
            currentKeySpan.innerHTML = '';
            downDiv.style.backgroundColor = 'white';
            PlayerBarDiv.style.backgroundColor = 'green';
            GaolerBarDiv.style.backgroundColor = 'red';
            ApressedBtn.style.backgroundColor = 'white';
            upDiv.style.backgroundColor = 'green';

            // This just changes the upDiv and other buttons back to white after 75ms
            setTimeout(function () {
                upDiv.style.backgroundColor = 'white';
                // reset colour of down div and pressed div (might not need for fight sequences) if key down detected
                DpressedBtn.style.backgroundColor = 'white';
                ApressedBtn.style.backgroundColor = 'white';
                SpressedBtn.style.backgroundColor = 'white';
                }, 75);

            // set the "Last key pressed" suffix to the key and its code/keyCode (ASCII)
            lastKeySpan.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';
            currentKeySpan.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';
            PlayerBarDiv.innerHTML = '<h3>Player: ' + (state.playerhealth -= generateRandom(1,50)) + '</h3>';
            GaolerBarDiv.innerHTML = '<h3>Gaoler: ' + (state.gaolerhealth -= generateRandom(1,60)) + '</h3>';

            if (state.playerhealth <= 0) {
                alert("You lost the fight!");
                startGame();
            } 
            else if (state.gaolerhealth <= 0) {
                alert("You won the fight!");
                startGame();
            }
        }

    }
}



// set up the text for the game story line, 
// describing what the player sees at various stages
// and what their action choices or options are.
const textItems = [{
        item: 1,
        text: "You wake up on a parquet wooden floor, in a small, dimly lit room.",
        Imgsrc: "./assets/images/parquet1.PNG",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/parquet1.PNG",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 2,
        text: "You wake up on a cold white marble floor, in a small, dimly lit room.",
        Imgsrc: "./assets/images/coldwhitemarble.PNG",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/herringbone.PNG",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]

    },
    {
        item: 3,
        Imgsrc: "./assets/images/greenandwhitemarble.PNG",
        text: "You wake up on a green and white marble floor, in a small, dimly lit room.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/parquet1.PNG",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]

    },
    {
        item: 4,
        Imgsrc: "./assets/images/roughlimestone.PNG",
        text: "You wake up on a rough limestone floor, in a small, dimly lit room.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/parquet1.PNG",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]

    },

    {
        item: 5,
        text: "You wake up on a cold pink granite floor, in a small, dimly lit room.",
        Imgsrc: "./assets/images/parquet1.PNG",
        option: [{
                op: 1,
                text: "Look around",
                Imgsrc: "./assets/images/parquet1.PNG",
                nextText: 6,
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 6,
        text: "You see a narrow, barred window, high up on the wall in front of you. You also notice a low hanging light overhead, and a light switch beside a door behind you.",
        Imgsrc: "./assets/images/parquet1.PNG",
        option: [{
                op: 1,
                text: "Stand up, avoiding the hanging light.",
                Imgsrc: "./assets/images/parquet1.PNG",
                nextText: 8,
            },
            {
                op: 2,
                text: "Try to open the door.",
                nextText: 11,
                setState: {
                    dooropen: true,
                    hammer: false
                },

            },
            {
                op: 3,
                text: "Stand up, and try to look out the window.",
                nextText: 10,
                setState: {
                    windowseen: true,
                    hammer: false
                },
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,
            },
        ]
    },
    {
        item: 7,
        text: "You move the flooring and find a hammer.",
        option: [{
                op: 1,
                text: "Pick up the hammer",
                nextText: 6,
                setState: {
                    hammer: true
                },
            },
            {
                op: 2,
                text: "Ignore the hammer",
                nextText: 7,
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 8,
        text: "You stand up, avoiding the low hanging light",
        option: [{
                op: 1,
                text: "Look around",
                Imgsrc: "./assets/images/parquet1.PNG",
                nextText: 6,
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1, 5),
            },
            {
                op: 3,
                text: "Stand up.",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 9,
        text: "As you sit up, you notice a loose section of flooring.",
        setState: {
            floorloose: true,
            hammer: false
        },
        option: [{
                op: 1,
                text: "Stand up.",
                nextText: 6,
            },
            {
                op: 2,
                text: "Try to move the flooring.",
                nextText: 7,
                setState: {
                    floorloose: true,
                    hammer: true
                },
            },
            {
                op: 3,
                text: "Look around.",
                nextText: 6,
            },
            {
                op: 4,
                text: "Put your head in your hands and try to remember how you got here.",
                nextText: generateRandom(1, 5),
            },
        ]
    },
    {
        item: 10,
        text: "You can just about see out the window and can see the sun rising in the east.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                setState: {
                    timeofday: true
                },
            },
            {
                op: 2,
                text: "Do nothing",
                nextText: 7,
            },
            {
                op: 3,
                text: "Sit down again",
                nextText: 9,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 11,
        text: "You reach the door and manage to open it gently inwards, although it squeaks loudly. You can hear footsteps coming from the right.",
        option: [{
                op: 1,
                text: "Close the door",
                nextText: 6,
                setState: {
                    gaoleralerted: true
                },
            },
            {
                op: 2,
                text: "Step through door and prepare to attack !",
                nextText: 13,
            },
            {
                op: 3,
                text: "Sit down again",
                nextText: 9,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 12,
        text: "You can just about see out the window and can see the sun rising in the east.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                setState: {
                    timeofday: true
                },
            },
            {
                op: 2,
                text: "Do nothing",
                nextText: 7,
            },
            {
                op: 3,
                text: "Sit down again",
                nextText: 9,
            },
            {
                op: 4,
                text: "Sit up.",
                nextText: 9,

            },
        ]
    },
    {
        item: 13,
        text: "You step through the door and are faced with a huge gaoler, intent on knocking you out again.",
        option: [{
                op: 1,
                text: "Swing right hook (D)",
                nextText: 13,
                identity: "DpressedBtn",
                setState: {
                    gaoleralerted: true
                },
            },
            {
                op: 2,
                text: "Swing left hook (A)",
                nextText: 13,
                identity: "ApressedBtn",
            },
            {
                op: 3,
                text: "Defend (S)",
                identity: "SpressedBtn",
                nextText: 13,
            },
            {
                op: 4,
                text: "Collapse in a heap !",
                nextText: generateRandom(1, 5),
                identity: "NopressedBtn",
            },
        ]
    },
]


//game starts here !
startGame();