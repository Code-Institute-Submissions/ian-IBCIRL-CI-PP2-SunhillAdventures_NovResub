// This is the main JavaScript file
let adventure = "Your adventure starts here !";
console.log(adventure);

// state is initially an empty object.
// This will keep track of our game player and objects etc.
let state = {};

//getting and setting the initial text - to ensure the app is running
const textElement = document.getElementById('headertext');
console.log("text element is:");
console.log(textElement);
console.log("text element innertext  is:");
console.log(textElement.innerText);
textElement.innerHTML = "Hello World!!"
console.log(textElement.innerHTML);

// start to access the options buttons and display some of their info to the console.
var optionButtonsElement = document.getElementById('option-buttons');
console.log(optionButtonsElement);
console.log(optionButtonsElement.innerText);
console.log(optionButtonsElement.innerHTML);
console.log("Inner Text Length is:", optionButtonsElement.innerText.length);

// react if mouse leaves the div (user may be leaving game)
function waitDontGo(){
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

    // put the first piece of text on the page 
    showChosenTextItem(generateRandom(1,5));

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
    console.log ("Text Item is: " , textItem)
   
    //log the text for the element describing the scene
    console.log("Text Item is: ", textItem)
    console.log("Text Item Text is: ", textItem.text)

    //set the text for the element describing the scene
    textElement.innerText = textItem.text;

    //clear out the current options, and replace with the options for the current scene
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textItem.option.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)

        }
    });
    //   }
}

function showOption(option) {
    console.log("Showing Option: ", option)
    // return true if there is no requiredState or the requiredState itself
    return option.requiredState == null || option.requiredState(state) ;
}

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

// set up the text for the game story line, 
// describing what the player sees at various stages
// and what their action choices or options are.
const textItems = [{
        item: 1,
        text: "You wake up on a parquet wooden floor, in a small, dimly lit room.",
        option: [{
                op: 1,
                text: "Look around",
                nextText: 6,
                setState: {
                    roomlayout: true,
                    hammer: false
                },
            },
            {
                op: 2,
                text: "Go back to sleep!",
                nextText: generateRandom(1,5),
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
        option: [{
            op: 1,
            text: "Look around",
            nextText: 6,
            setState: {
                roomlayout: true,
                hammer: false
            },
        },
        {
            op: 2,
            text: "Go back to sleep!",
            nextText: generateRandom(1,5),
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
        text: "You wake up on a green marble floor, in a small, dimly lit room.",
        option: [{
            op: 1,
            text: "Look around",
            nextText: 6,
            setState: {
                roomlayout: true,
                hammer: false
            },
        },
        {
            op: 2,
            text: "Go back to sleep!",
            nextText: generateRandom(1,5),
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
        text: "You wake up on a rough limestone floor, in a small, dimly lit room.",
        option: [{
            op: 1,
            text: "Look around",
            nextText: 6,
            setState: {
                roomlayout: true,
                hammer: false
            },
        },
        {
            op: 2,
            text: "Go back to sleep!",
            nextText: generateRandom(1,5),
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
        option: [{
            op: 1,
            text: "Look around",
            nextText: 6,
            setState: {
                roomlayout: true,
                hammer: false
            },
        },
        {
            op: 2,
            text: "Go back to sleep!",
            nextText: generateRandom(1,5),
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
        option: [{
                op: 1,
                text: "Stand up, avoiding the hanging light.",
                nextText: 6,
            },
            {
                op: 2,
                text: "Try to open the door.",
                nextText: 7,
                setState: {
                    dooropen: true,
                    hammer: false
                },

            },
            {
                op: 3,
                text: "Stand up, and try to look out the window.",
                nextText: 8,
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
            nextText: 6,
            setState: {
                roomlayout: true,
                hammer: false
            },
        },
        {
            op: 2,
            text: "Go back to sleep!",
            nextText: generateRandom(1,5),
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
                nextText: 9,
            },
        ]
    },

]


//game starts here !
startGame();