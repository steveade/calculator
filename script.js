let numKeys = document.querySelectorAll(".num");
let cancel = document.querySelector(".cancel");
let display = document.querySelector(".display");
let ops = document.querySelectorAll(".op");
let calc = document.querySelector(".equal");
let del = document.querySelector(".delete");
let currentOp = "";
let valuesList = [];
let opsList = [];
let opChange = false;

function add (num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return 'unknown op';
    }
}

function deleteText() {
    if (display.textContent !== "") {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    }
}

function calculateValue() {
    ops.forEach(op => op.style.backgroundColor = "rgb(9, 189, 150)");
    if (display.textContent != "") valuesList.push(Number(display.textContent));
    let value = valuesList[0];
    if (opsList.length !== 0) {
        for (let i = 0; i < opsList.length; i++) {
            value = operate(opsList[i], value, valuesList[i + 1]);
        }
    }
    let valStr = value.toString();
    if (valStr.length > 9) {
        if (valStr.includes(".") && !valStr.includes("e") && !valStr.split(".")[0] > 9) {
            value = value.toFixed(valStr.split(".")[1].length - 9);
        }
        else {
            console.log(value);
            value = value.toExponential(4);
        }
    }
    display.textContent = value;
    if (valStr === "Infinity" || valStr === "-Infinity") {
        display.textContent = "Math error";
    }
    valuesList.length = 0;
    opsList.length = 0;
    currentOp = "";
}

function clearDisplay() {
    valuesList.length = 0;
    opsList.length = 0;
    currentOp = "";
    display.textContent = "";
}

function inputNum(event, source) {
    ops.forEach(op => op.style.backgroundColor = "rgb(9, 189, 150)");
    if (isNaN(display.textContent) || display.textContent === "0") {
        display.textContent = "";
    }
    if (opChange === true) {
        opsList.push(currentOp);
        opChange = false;
    }
    if (display.textContent.length <= 9) {
        if (source.includes(".")) {
            if (display.textContent === "") {
                display.textContent = "0.";
            }
            else if (!display.textContent.includes(".")) {
                display.textContent = display.textContent + ".";
            }
        }
        else {
            display.textContent = display.textContent + source;
        }
    }
}

function performOp(event, source) {
    ops.forEach(op => op.style.backgroundColor = "rgb(9, 189, 150)");
    if (display.textContent != "") valuesList.push(Number(display.textContent));
    if (valuesList.length !== 0) {
        display.textContent = "";
        currentOp = source;
        ops.forEach(op => {
            if (op.textContent === source) {
                op.style.backgroundColor = "rgb(5, 110, 88)";
            }
        });
        opChange = true;
    }
}

numKeys.forEach(key => {
    key.addEventListener("click", event => {inputNum(event, event.target.textContent)});
});

ops.forEach(op => {
    op.addEventListener("click", event => {performOp(event, event.target.textContent)});
});

calc.addEventListener("click", calculateValue);

cancel.addEventListener("click", clearDisplay);

del.addEventListener("click", deleteText);

document.addEventListener("keydown", event => {
    if (event.key === "Backspace") {
        deleteText();
    }

    if (event.key === "=") {
        calculateValue();
    }
    
    if (!isNaN(event.key) || event.key === ".") {
        inputNum(event, event.key);
    }

    if (event.key.toLowerCase() === "c") {
        clearDisplay();
    }

    if ("+ - * /".includes(event.key)) {
        performOp(event, event.key);
    }
});
