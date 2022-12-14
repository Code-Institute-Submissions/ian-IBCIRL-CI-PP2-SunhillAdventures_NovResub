// This is the main JavaScript file
let adventure = "Your adventure starts here !";
console.log(adventure);


// control whether to print some alerts and console messages.
let debugcheck = 0;

// state is initially an empty object.
// This will keep track of our game player and objects etc.
let state = {};

//getting and setting the initial scene text - to ensure the app is running
const textElement = document.getElementById('scenetext');
console.log("text element is:");
console.log(textElement);
console.log("text element innertext  is:");
console.log(textElement.innerText);
textElement.innerHTML = "Hello World!!";
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
    textElement.innerHTML = "Wait !!! Don't GO !";
    console.log("Wait !!! Don't GO !");

}

// function to start the game.
function startGame(inputx) {

    // start by initialising the game state to make sure it is empty.
    // for example, we may want to restart the game later.
    // the state is an object to hold the state of the player 
    // and their objects and location in the game etc.
    state = {};
    state.fight = false;

    if (inputx) {
        alert("Restarting game via button" + inputx);
        startGame();
    }

    state.playerhealth = 1000;
    state.gaolerhealth = 1000;

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');
    PlayerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.playerhealth) + '</h3>';
    GaolerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.gaolerhealth) + '</h3>';

    PlayerBarDiv.style.backgroundColor = 'lightgreen';
    GaolerBarDiv.style.backgroundColor = 'lightblue';

    let pwidth = state.playerhealth / 16 + 40;
    PlayerBarDiv.style.width = pwidth + '%';
    let gwidth = state.gaolerhealth / 16 + 40;
    GaolerBarDiv.style.width = gwidth + '%';

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
    console.log("Option selected is:", option);
    // get the next block of story text and options
    const nextTextChoiceItem = option.nextText;

    // option to restart game if end not successful
    if (nextTextChoiceItem <= 0) {
        return startGame();
    }

    // update and replace the current state
    state = Object.assign(state, option.setState);

    // show the next chosen item
    showChosenTextItem(nextTextChoiceItem);
}

//function to show particular text item
function showChosenTextItem(TextItemNumber) {

    // get the desired text for describing the scene
    let textItem = textItems.find(o => o.item === TextItemNumber);
    // took a while to get this to work - o is a placeholder and => is a function pointer
    // helpful demo here https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript

    console.log("Text Item is: ", textItem);

    //log the text for the element describing the scene
    console.log("Text Item is: ", textItem);
    console.log("Text Item Text is: ", textItem.text);

    //set the text for the element describing the scene
    textElement.innerText = textItem.text;

    // set the background for the main div (or a default background)
    let urlLocation = textItem.Imgsrc || './assets/images/pexels-jonas-wilson-10541685-sm.avif';
    console.log("URL location is: ", urlLocation);
    urlLocation = "url('" + urlLocation + "')";
    console.log("URL location is: ", urlLocation);

    mainDiv.style.backgroundImage = urlLocation;
    // e.g. url('/assets/images/pexels-jonas-wilson-10541685-sm.avif')

    const legtext = document.getElementById("legendtext");
    legtext.innerText = `scene #${textItem.item}`;

    //clear out the current options, and replace with the options for the current scene
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textItem.option.forEach(option => {
        if (showOption(option)) {
            // create a new button
            const button = document.createElement('button');

            // set the text of the current action button
            button.innerHTML = option.text;

            // set the class style for the new button
            button.classList.add('btn');

            if (option.identity) {
                console.log("option identity is: ", option.identity);
                // set the id for the new button
                button.id = option.identity;
            }
            // set a function for clicking the button
            button.addEventListener('click', () => selectOption(option));

            // handle fight buttons
            if (option.identity === "DpressedBtn") {
                button.addEventListener('click', () => processdefend());
            } else if (option.identity === "SpressedBtn") {
                button.addEventListener('click', () => processrighthook());
            } else if (option.identity === "ApressedBtn") {
                button.addEventListener('click', () => processlefthook());
            }

            // considered adding images to buttons - removed for accessibility
            // i.e. button.style.backgroundImage = "url('./assets/images/herringbone.avif')";

            button.style.backgroundColor = "black";

            // add the button to the page
            optionButtonsElement.appendChild(button);
        }
    });

}

function processdefend() {

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');

    PlayerBarDiv.style.backgroundColor = 'red';
    GaolerBarDiv.style.backgroundColor = 'red';

    if (debugcheck) alert("defending");

    let defend = generateRandom(1, 50);

    // randomly decrease health per round (player slightly weaker unless holding hammer or defending)
    state.playerhealth -= generateRandom(1, 55);
    state.gaolerhealth -= generateRandom(1, 50);

    //take into account any player defending
    state.playerhealth += defend;

    //take into account if the hammer is being used, if found
    let hammerimpact = 0;
    if (state.hammer) {
        hammerimpact = 50;
    } else hammerimpact = 0;

    state.gaolerhealth -= hammerimpact;

    PlayerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.playerhealth) + '</h3>';
    GaolerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.gaolerhealth) + '</h3>';

    let pwidth = state.playerhealth / 13 + 20;
    PlayerBarDiv.style.width = pwidth + '%';
    let gwidth = state.gaolerhealth / 13 + 20;
    GaolerBarDiv.style.width = gwidth + '%';

    setTimeout(function () {
        // reset colour of player div and gaoler div (might not need for fight sequences) if key down detected
        PlayerBarDiv.style.backgroundColor = 'lightgreen';
        GaolerBarDiv.style.backgroundColor = 'lightblue';
    }, 75);

    if (state.playerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Lost !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Won !' + '</h3>';
        window.location.reload();
        alert("You lost the fight!\n\nTry defending (D) more next time !\n\nOR find the hammer !");
        return startGame();
    } else if (state.gaolerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Won !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Lost !' + '</h3>';
        window.location.reload();
        alert("You won the fight!");
        return startGame();
    }
}

function processrighthook() {

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');

    PlayerBarDiv.style.backgroundColor = 'red';
    GaolerBarDiv.style.backgroundColor = 'red';

    if (debugcheck) alert("right hook");

    // randomly decrease health per round (player slightly weaker unless holding hammer or defending)
    state.playerhealth -= generateRandom(1, 55);
    state.gaolerhealth -= generateRandom(1, 50);

    //take into account if the hammer is being used, if found
    let hammerimpact = 0;
    if (state.hammer) {
        hammerimpact = 50;
    } else hammerimpact = 0;

    state.gaolerhealth -= hammerimpact;

    PlayerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.playerhealth) + '</h3>';
    GaolerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.gaolerhealth) + '</h3>';

    let pwidth = state.playerhealth / 13 + 20;
    PlayerBarDiv.style.width = pwidth + '%';
    let gwidth = state.gaolerhealth / 13 + 20;
    GaolerBarDiv.style.width = gwidth + '%';

    setTimeout(function () {
        // reset colour of player div and gaoler div (might not need for fight sequences) if key down detected
        PlayerBarDiv.style.backgroundColor = 'lightgreen';
        GaolerBarDiv.style.backgroundColor = 'lightblue';
    }, 75);

    if (state.playerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Lost !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Won !' + '</h3>';
        window.location.reload();
        alert("You lost the fight!\n\nTry defending (D) more next time !\n\nOR find the hammer !");
        return startGame();
    } else if (state.gaolerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Won !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Lost !' + '</h3>';
        window.location.reload();
        alert("You won the fight!");
        return startGame();
    }
}

function processlefthook() {

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');

    PlayerBarDiv.style.backgroundColor = 'red';
    GaolerBarDiv.style.backgroundColor = 'red';

    if (debugcheck) alert("leftt hook");

    // randomly decrease health per round (player slightly weaker unless holding hammer or defending)
    state.playerhealth -= generateRandom(1, 55);
    state.gaolerhealth -= generateRandom(1, 50);

    // no hammer in left hand...

    PlayerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.playerhealth) + '</h3>';
    GaolerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.gaolerhealth) + '</h3>';

    let pwidth = state.playerhealth / 13 + 20;
    PlayerBarDiv.style.width = pwidth + '%';
    let gwidth = state.gaolerhealth / 13 + 20;
    GaolerBarDiv.style.width = gwidth + '%';

    setTimeout(function () {
        // reset colour of player div and gaoler div (might not need for fight sequences) if key down detected
        PlayerBarDiv.style.backgroundColor = 'lightgreen';
        GaolerBarDiv.style.backgroundColor = 'lightblue';
    }, 75);

    if (state.playerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Lost !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Won !' + '</h3>';
        window.location.reload();
        alert("You lost the fight!\n\nTry defending (D) more next time !\n\nOR find the hammer !");
        return startGame();
    } else if (state.gaolerhealth <= 0) {
        PlayerBarDiv.innerHTML = '<h3>Player Won !' + '</h3>';
        GaolerBarDiv.innerHTML = '<h3>Gaoler Lost !' + '</h3>';
        window.location.reload();
        alert("You won the fight!");
        return startGame();
    }

}

function btnClicked() {
    if (this.style.backgroundColor === "orange") {
        this.style.backgroundColor = "green";
    } else {
        this.style.backgroundColor = "orange";
    }

}


function showOption(option) {
    console.log("Showing Option: ", option);
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

    if (state.fight == false) {
        alert("not in a fight YET !");
        return;
    }
    let defend = 0;
    if (event.key == 'a' || event.key == 's' || event.key == 'd') {
        if (event.key == 'd' || event.key == 'D') {
            defend = generateRandom(1, 50);
            // document.getElementById('last-key').innerText = "Defending!";
        } else defend = 0;
        if (event.key == 'a' || event.key == 'A') {
            // document.getElementById('last-key').innerText = "Left Hook!";
            defend = 0;
        }
        if (event.key == 's' || event.key == 'S') {
            // document.getElementById('last-key').innerText = "Right Hook!";
            defend = 0;
        }
    } else {
        alert("invalid key - use A, S or D");
        return;
    }

    let DpressedBtn = document.getElementById('key-down');
    let ApressedBtn = document.getElementById('key-down');
    let SpressedBtn = document.getElementById('key-down');

    let PlayerBarDiv = document.getElementById('player');
    let GaolerBarDiv = document.getElementById('gaoler');

    let downDiv = document.getElementById('key-down');
    let upDiv = document.getElementById('key-up');
    //    let currentKeySpan = document.getElementById('current-key');
    //    let lastKeySpan = document.getElementById('last-key');
    //    console.log(lastKeySpan);

    let pwidth = state.playerhealth / 13 + 20;
    PlayerBarDiv.style.width = pwidth + '%';
    let gwidth = state.gaolerhealth / 13 + 20;
    GaolerBarDiv.style.width = gwidth + '%';


    if (event.repeat) {
        return false; // prevents holding the key from triggering the event again 
    } else {
        if (event.type === 'keydown') {
            // set colour of down div and pressed div (might not need for fight sequences) if key down detected
            DpressedBtn.style.backgroundColor = 'lightgreen';
            ApressedBtn.style.backgroundColor = 'lightorange';
            SpressedBtn.style.backgroundColor = 'orange';
            PlayerBarDiv.style.backgroundColor = 'red';
            GaolerBarDiv.style.backgroundColor = 'red';

            //use the text for the text element for describing the keypress
            //textElement.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';
            //console.log(textElement.innerHTML);

            // if we are in the fight scene then the button text can be set - skip if not
            if (debugcheck) {
                let keyinfo = document.getElementById('DpressedBtn');
                if (keyinfo) {
                    keyinfo.innerText = event.key;
                    console.log(event.key);
                }
            }


        } else if (event.type === 'keyup') {
            // clear colour (to white) of down div and pressed div (might not need for fight sequences) if key down detected
            // currentKeySpan.innerHTML = '';
            downDiv.style.backgroundColor = 'white';
            PlayerBarDiv.style.backgroundColor = 'lightgreen';
            GaolerBarDiv.style.backgroundColor = 'lightblue';
            ApressedBtn.style.backgroundColor = 'white';
            upDiv.style.backgroundColor = 'green';


            // set the "Last key pressed" suffix to the key and its code/keyCode (ASCII)
            // lastKeySpan.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';
            // currentKeySpan.innerHTML = event.key + ' (' + event.code + ' / ' + event.keyCode + ')';

            // randomly decrease health per round (player slightly weaker unless holding hammer or defending)
            state.playerhealth -= generateRandom(1, 55);
            state.gaolerhealth -= generateRandom(1, 50);

            //take into account any player defending
            state.playerhealth += defend;

            let hammerimpact = 0;
            if (state.hammer) {
                hammerimpact = 50;
            } else hammerimpact = 0;

            state.gaolerhealth -= hammerimpact;

            PlayerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.playerhealth) + '</h3>';
            GaolerBarDiv.innerHTML = '<h3>Health:<br> ' + (state.gaolerhealth) + '</h3>';

            // This just changes the upDiv and other buttons back to white after 75ms
            setTimeout(function () {
                upDiv.style.backgroundColor = 'white';
                // reset colour of down div and pressed div (might not need for fight sequences) if key down detected
                DpressedBtn.style.backgroundColor = 'white';
                ApressedBtn.style.backgroundColor = 'white';
                SpressedBtn.style.backgroundColor = 'white';
            }, 75);

            if (state.playerhealth <= 0) {
                PlayerBarDiv.innerHTML = '<h3>Player Lost !' + '</h3>';
                GaolerBarDiv.innerHTML = '<h3>Gaoler Won !' + '</h3>';
                window.location.reload();
                alert("You lost the fight!\n\nTry defending (D) more next time !\n\nOR find the hammer !");
                return startGame();
            } else if (state.gaolerhealth <= 0) {
                PlayerBarDiv.innerHTML = '<h3>Player Won !' + '</h3>';
                GaolerBarDiv.innerHTML = '<h3>Gaoler Lost !' + '</h3>';
                window.location.reload();
                alert("You won the fight!");
                return startGame();
            }



        }

    }
}



// set up the text for the game story line, 
// describing what the player sees at various stages
// and what their action choices or options are.
const textItems = [{
        item: 1,
        text: "You have been moved to room #1 and wake up on a wooden floor, in a dimly lit room.",
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                identity: "Button1",
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Step through door and prepare to attack !",
                nextText: 13,
                identity: "Button2",
                setState: {
                    gaoleralerted: true,
                    fight: true
                },
            },
            {
                op: 3,
                text: "Stand up.",
                identity: "Button3",
                nextText: 8,
            },
            {
                op: 4,
                text: "Sit up.",
                identity: "Button4",
                nextText: 9,

            },
        ]
    },
    {
        item: 2,
        text: "You have been moved to room #2 and you wake up on a cold white marble floor.",
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Step through door and prepare to attack !",
                nextText: 13,
                setState: {
                    gaoleralerted: true,
                    fight: true
                },
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
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        text: "You have been moved to room #3 and you wake up on a green and white marble floor",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Step through door and prepare to attack !",
                nextText: 13,
                setState: {
                    gaoleralerted: true,
                    fight: true
                },
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
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        text: "You have been moved to room #4 and you wake up on a rough limestone floor.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Step through door and prepare to attack !",
                nextText: 13,
                setState: {
                    gaoleralerted: true,
                    fight: true
                },
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
        text: "You have been moved to room #5 and you wake up on a cold pink granite floor.",
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        option: [{
                op: 1,
                text: "Look around",
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
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
        text: "You see a door behind you.",
        Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
        option: [{
                op: 1,
                text: "Stand up, avoiding the hanging light.",
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
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
                nextText: 6,
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
                Imgsrc: "./assets/images/pexels-jonas-wilson-10541685-sm.avif",
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
        text: "You notice loose flooring.",
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
                text: "Put head in hands...",
                nextText: generateRandom(1, 5),
            },
        ]
    },
    {
        item: 10,
        text: "Out the window, you see the sun rising",
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
        text: "The door squeaks! You hear footsteps coming!",
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
                text: "Step through door and attack !",
                nextText: 13,
                setState: {
                    gaoleralerted: true,
                    fight: true
                },

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
        text: "You see out the window and the sun rising.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                identity: "Button1",
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
        text: "You step forward and see a huge gaoler!",
        option: [{
                op: 1,
                text: "Swing right hook (S)",
                nextText: 13,
                identity: "SpressedBtn",
                setState: {
                    gaoleralerted: true,
                    rightswing: true
                },
            },
            {
                op: 2,
                text: "Swing left hook (A)",
                nextText: 13,
                identity: "ApressedBtn",
                setState: {
                    gaoleralerted: true,
                    lefthook: true
                },
            },
            {
                op: 3,
                text: "Defend & trick shot (D)",
                identity: "DpressedBtn",
                nextText: 13,
                setState: {
                    gaoleralerted: true,
                    fightdefend: true
                },

            },
            {
                op: 4,
                text: "Collapse in a heap !",
                nextText: generateRandom(1, 5),
                identity: "NopressedBtn",
            },
        ]
    },
];


//game starts here !
startGame();