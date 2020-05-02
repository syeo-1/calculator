// add event listeners to all buttons on click

//for now, make it so the text on button being clicked
//resets the text currently on the display

//function for numbers

//function for decimal

//function for resetters

//function for mathematical operators

function resultDisplayHelper() {
    let display = document.querySelector(".display");
    if (multiplyPressed) {
        operandNum2 = parseFloat(display.textContent);
        display.textContent = (operandNum1*operandNum2).toString();
        operandNum1 *= operandNum2;
    } else if (addPressed) {
        operandNum2 = parseFloat(display.textContent);
        display.textContent = (operandNum1+operandNum2).toString();
        operandNum1 += operandNum2;
    } else if (subPressed) {
        operandNum2 = parseFloat(display.textContent);
        display.textContent = (operandNum1-operandNum2).toString();
        operandNum1 -= operandNum2;
    } else if (divPressed) {
        operandNum2 = parseFloat(display.textContent);
        display.textContent = (operandNum1/operandNum2).toString();
        operandNum1 /= operandNum2;
    } else {
        operandNum1 = parseFloat(display.textContent);
    }
}

function multiply() {
    resultDisplayHelper();
    currentOperator = "*";
    multiplyPressed = true;
    secondPlusOperand = true;

    addPressed = false;
    subPressed = false;
    divPressed = false;
}
function divide() {
    resultDisplayHelper();
    currentOperator = "/";
    divPressed = true;
    secondPlusOperand = true;

    multiplyPressed = false;
    addPressed = false;
    subPressed = false;
}
function add() {
    resultDisplayHelper();
    currentOperator = "+";
    addPressed = true;
    secondPlusOperand = true;

    multiplyPressed = false;
    subPressed = false;
    divPressed = false;
}

function subtract() {
    resultDisplayHelper();
    currentOperator = "-";
    subPressed = true;
    secondPlusOperand = true;

    multiplyPressed = false;
    addPressed = false;
    divPressed = false;
}
function equals(){
    let display = document.querySelector(".display");
    operandNum2 = parseFloat(display.textContent);

    console.log(operandNum1);
    console.log(operandNum2);
    if (operandNum1 !== undefined) {//not undefined value
        if (currentOperator === "*") {
            display.textContent = (operandNum1*operandNum2).toString();
        } else if (currentOperator === "+") {
            display.textContent = (operandNum1+operandNum2).toString();
        } else if (currentOperator === "-") {
            display.textContent = (operandNum1-operandNum2).toString();
        } else if (currentOperator === "/") {
            display.textContent = (operandNum1/operandNum2).toString();
        } 
    }
    multiplyPressed = false;
    addPressed = false;
    subPressed = false;
    divPressed = false;
    secondPlusOperand = false;
    currentOperator = "";
    displayArray = []
}

function operandDisplay(e) {
    let display = document.querySelector(".display");
    if (secondPlusOperand) {
        displayArray = [];
        displayArray.push(e.target.textContent);
        display.textContent = displayArray.join("");
        secondPlusOperand = false;
    } else {
        if (displayArray.length === 0 && e.target.textContent !== "0") {
            displayArray.push(e.target.textContent);
            display.textContent = displayArray.join("");
        } else if (displayArray.length > 0) {
            displayArray.push(e.target.textContent);
            display.textContent = displayArray.join("");
        }
    }
    // console.log(operandNum1);
    // console.log(operandNum2);
    
}
function deleteOperand() {
    let display = document.querySelector(".display");
    displayArray.pop();
    display.textContent = displayArray.join("");
    if (display.textContent === "") {
        display.textContent = "0";
    }
}
function clearDisplay() {
    let display = document.querySelector(".display");
    display.textContent = "0";
    displayArray = [];
    operandNum1 = undefined;
    operandNum2 = undefined;
    secondPlusOperand = false;
    multiplyPressed = false;
    addPressed = false;
    subPressed = false;
    divPressed = false;
}

function toOperands() {
    let operands = document.querySelectorAll(".operand");
    operands.forEach(operand => operand.addEventListener("click", operandDisplay));
}
function toResetterOperators() {
    // let deleter = document.querySelector(".delete");
    let clear = document.querySelector(".clear");

    // deleter.addEventListener("click", deleteOperand);
    clear.addEventListener("click", clearDisplay);
}

//only care about the number on the display the moment an operator is pressed
//once an operator is clicked, store the number being displayed (initially to operandNum1)

function toMathOperators() {
    let multi = document.getElementsByClassName("multiply")[0];
    let div = document.getElementsByClassName("divide")[0];
    let addit = document.getElementsByClassName("add")[0];
    let sub = document.getElementsByClassName("subtract")[0];
    // let eq = document.getElementsByClassName("equals")[0];

    multi.addEventListener("click", multiply);
    div.addEventListener("click", divide);
    addit.addEventListener("click", add);
    sub.addEventListener("click", subtract);
    // eq.addEventListener("click", equals);
}
// function toDecimal() {
//     let decimal = document.querySelector(".decimal");
//     decimal.addEventListener("click", decimalDisplay);
// }
function toEquals() {
    let equal = document.querySelector(".equals");
    equal.addEventListener("click", equals);
}
function addEventListen() {
    toOperands();
    toResetterOperators();
    toMathOperators();
    // toDecimal();
    toEquals();
}
function calculator() {
    secondPlusOperand = false;
    multiplyPressed = false;
    addPressed = false;
    subPressed = false;
    divPressed = false;
    addEventListen();
}

let displayArray = [];
let operandNum1;
let operandNum2;
let currentOperator;
let secondPlusOperand;
let multiplyPressed;
let addPressed;
let subPressed;
let divPressed;
calculator();
