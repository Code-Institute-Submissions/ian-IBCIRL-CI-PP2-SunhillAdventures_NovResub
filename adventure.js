// This is the main JavaScript file
let adventure = "Your adventure starts here !";
console.log(adventure);

const textElement = document.getElementById('headertext');
console.log("text element is:");
console.log(textElement);
console.log("text element innertext  is:");
console.log(textElement.innerText);
textElement.innerHTML = "Hello World!"
console.log(textElement.innerHTML);

var optionButtonsElement = document.getElementById('option-buttons');
console.log(optionButtonsElement);
console.log(optionButtonsElement.innerText);
console.log(optionButtonsElement.innerHTML);
console.log(optionButtonsElement.length);

for (var i = 0; i < optionButtonsElement.length ; i++) {
    console.log("inside loop");
    key = optionButtonsElement[i].innerText;
        console.log(key);
}