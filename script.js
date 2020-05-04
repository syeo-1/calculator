function resultDisplayHelper() {
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

function properOrderOperations() {
    if (properOrderRequired) {
        if (addAndMultiply) {
            operandNum2 = parseFloat(display.textContent);
            display.textContent = (orderOperand+(operandNum1*operandNum2)).toString();
            operandNum1 = orderOperand+(operandNum1*operandNum2);
            addAndMultiply = false;
        } else if (subAndMultiply) {
            operandNum2 = parseFloat(display.textContent);
            display.textContent = (orderOperand-(operandNum1*operandNum2)).toString();
            operandNum1 = orderOperand-(operandNum1*operandNum2);
            subAndMultiply = false;
        } else if (addAndDivide) {
            operandNum2 = parseFloat(display.textContent);
            display.textContent = (orderOperand+(operandNum1/operandNum2)).toString();
            operandNum1 = orderOperand+(operandNum1/operandNum2);
            addAndDivide = false;
        } else if (subAndDivide) {
            operandNum2 = parseFloat(display.textContent);
            display.textContent = (orderOperand-(operandNum1/operandNum2)).toString();
            operandNum1 = orderOperand-(operandNum1/operandNum2);
            subAndDivide = false;
        }
        properOrderRequired = false;
        orderOperand = undefined;
    } else {
        orderOperand = operandNum1;
        operandNum1 = parseFloat(display.textContent);
        if (addPressed && multiplyPressed) addAndMultiply = true;
        else if (subPressed && multiplyPressed) subAndMultiply = true;
        else if (addPressed && divPressed) addAndDivide = true;
        else if (subPressed && divPressed) subAndDivide = true;
        
        properOrderRequired = true;
    } 
}

function operatorInARow() {
    //check if operators are pressed in a row
    //and only take the last one that was pressed
}

function multiply() {
    if (!operatorPressed) {
        if (addPressed || subPressed || properOrderRequired) {
            multiplyPressed = true;
            properOrderOperations();
        } else {
            resultDisplayHelper();
        }
    }
    multiplyPressed = true;
    currentOperator = "*";
    secondPlusOperand = true;

    if (!operatorPressed) {
        addPressed = false;
        subPressed = false;
        divPressed = false;
        operatorPressed = true;
    }  
}
function divide() {
    if (!operatorPressed) {
        if (addPressed || subPressed || properOrderRequired) {
            divPressed = true;
            properOrderOperations();
        } else {
            resultDisplayHelper();
        }
    }
    divPressed = true;
    currentOperator = "/";
    secondPlusOperand = true;

    if (!operatorPressed) {
        multiplyPressed = false;
        addPressed = false;
        subPressed = false;
        operatorPressed = true;
    }
}
function add() {
    if (!operatorPressed) {
        if (properOrderRequired) {
            properOrderOperations();
        } else {
            resultDisplayHelper();
        }
        console.log(operandNum1);
        console.log(operandNum2);
    }  
    currentOperator = "+";
    addPressed = true;
    secondPlusOperand = true;

    if (!operatorPressed) {
        multiplyPressed = false;
        subPressed = false;
        divPressed = false;
        operatorPressed = true;
    }
}

function subtract() {
    if (!operatorPressed) {
        if (properOrderRequired) {
            properOrderOperations();
        } else {
            resultDisplayHelper();
        }
    }  
    currentOperator = "-";
    subPressed = true;
    secondPlusOperand = true;

    if (!operatorPressed) {
        multiplyPressed = false;
        addPressed = false;
        divPressed = false;
        operatorPressed = true;
    }
}
function equals(){
    operandNum2 = parseFloat(display.textContent);

    if (operandNum1 !== undefined && properOrderRequired) {
        if (addAndMultiply) display.textContent = (orderOperand+(operandNum1*operandNum2)).toString();
        else if (subAndMultiply) display.textContent = (orderOperand-(operandNum1*operandNum2)).toString();
        else if (addAndDivide) display.textContent = (orderOperand+(operandNum1/operandNum2)).toString();
        else if (subAndDivide) display.textContent = (orderOperand-(operandNum1/operandNum2)).toString();
    } else if (operandNum1 !== undefined) {
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
    addAndMultiply = false;
    subAndMultiply = false;
    addAndDivide = false;
    subAndDivide = false;
    orderOperand = undefined;
    secondPlusOperand = false;
    currentOperator = "";
    displayArray = []
}

function decimalDisplay() {
    if (!displayArray.includes(".")) {
        displayArray.push(".");
        display.textContent = displayArray.join("");
    }
    if (secondPlusOperand) {
        displayArray = [];
        displayArray.push(".");
        display.textContent = displayArray.join("");
        secondPlusOperand = false;
    }
}

function operandDisplay(e) {
    if (secondPlusOperand) {
        displayArray = [];
        displayArray.push(e.target.textContent);
        display.textContent = displayArray.join("");
        secondPlusOperand = false;
    } else {
        if (displayArray.length === 0 && e.target.textContent !== "0") {
            displayArray.push(e.target.textContent);
            display.textContent = displayArray.join("");
        } else if (displayArray.length > 0 && displayArray.length < 16) {
            displayArray.push(e.target.textContent);
            display.textContent = displayArray.join("");
        }
    }
    operatorPressed = false;
}
function deleteOperand() {
    displayArray.pop();
    display.textContent = displayArray.join("");
    if (display.textContent === "") {
        display.textContent = "0";
    }
}
function clearDisplay() {
    display.textContent = "0";
    displayArray = [];
    operandNum1 = undefined;
    operandNum2 = undefined;
    orderOperand = undefined;
    properOrderRequired = false;
    addAndMultiply = false;
    subAndMultiply = false;
    addAndDivide = false;
    subAndDivide = false;
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
    let deleter = document.querySelector(".delete");
    let clear = document.querySelector(".clear");

    deleter.addEventListener("click", deleteOperand);
    clear.addEventListener("click", clearDisplay);
}

function toMathOperators() {
    let multi = document.getElementsByClassName("multiply")[0];
    let div = document.getElementsByClassName("divide")[0];
    let addit = document.getElementsByClassName("add")[0];
    let sub = document.getElementsByClassName("subtract")[0];

    multi.addEventListener("click", multiply);
    div.addEventListener("click", divide);
    addit.addEventListener("click", add);
    sub.addEventListener("click", subtract);

    //give each operator a border when clicked
}
function toDecimal() {
    let decimal = document.querySelector(".decimal");
    decimal.addEventListener("click", decimalDisplay);
}
function toEquals() {
    let equal = document.querySelector(".equals");
    equal.addEventListener("click", equals);
}

function keyCodes(e)  {
    if (e.keyCode === 8 || e.keyCode === 46 && displayArray.length > 0) deleteOperand();
    else if (e.keyCode === 190 || e.keyCode === 110) decimalDisplay();
    else if (e.keyCode === 67) clearDisplay();
    else if (e.shiftKey && e.keyCode === 187 || e.keyCode === 107) add();
    else if (e.keyCode === 189 || e.keyCode === 109) subtract();
    else if (e.keyCode === 191 || e.keyCode === 111) divide();
    else if (e.keyCode === 13 || e.keyCode === 187) equals();
    if (displayArray.length < 16 && (e.keyCode >= 48 && e.keyCode <= 55 || e.keyCode === 57)) {
        if (e.keyCode === 48 && displayArray.length > 0) displayArray.push("0");
        else if (e.keyCode === 49) displayArray.push("1");
        else if (e.keyCode === 50) displayArray.push("2");
        else if (e.keyCode === 51) displayArray.push("3");
        else if (e.keyCode === 52) displayArray.push("4");
        else if (e.keyCode === 53) displayArray.push("5");
        else if (e.keyCode === 54) displayArray.push("6");
        else if (e.keyCode === 55) displayArray.push("7");
        else if (e.keyCode === 57) displayArray.push("9");

        display.textContent = displayArray.join("");
        operatorPressed = false;
    }

    if (e.shiftKey && e.keyCode === 56 || e.keyCode === 106) multiply();
    else if (displayArray.length < 16 && e.keyCode === 56) {
        displayArray.push("8");
        display.textContent = displayArray.join("");
        operatorPressed = false;
    } 
}

function keyboardOperand(e) {
    if (secondPlusOperand) {
        displayArray = [];
        keyCodes(e);
        secondPlusOperand = false;
    } else {
        keyCodes(e);
    }
}

function addEventListen() {
    toOperands();
    toResetterOperators();
    toMathOperators();
    toDecimal();
    toEquals();
    window.addEventListener("keydown", keyboardOperand)
}
function calculator() {
    secondPlusOperand = false;
    multiplyPressed = false;
    addPressed = false;
    subPressed = false;
    divPressed = false;
    addAndMultiply = false;
    subAndMultiply = false;
    addAndDivide = false;
    subAndDivide = false;
    operatorPressed = false;
    addEventListen();
}

let display = document.querySelector(".display");

let displayArray = [];
let operandNum1;
let operandNum2;
let orderOperand;
let properOrderRequired;
let addAndMultiply;
let subAndMultiply;
let addAndDivide;
let subAndDivide;
let currentOperator;
let secondPlusOperand;
let multiplyPressed;
let addPressed;
let subPressed;
let divPressed;
let operatorPressed;
calculator();