let currentInput = "";
let previousInput = "";
let operator = null;
let isResultDisplayed = false;

function appendNumber(number) {
  if (isResultDisplayed) {
    currentInput = "";
    isResultDisplayed = false;
  }
  currentInput += number;
  updateDisplay();
}

function setOperator(op) {  
  if (currentInput === "" && previousInput === "") {
    return;
  }

  if (isResultDisplayed) {
    previousInput = currentInput;
    currentInput = "";
    operator = op;
    updateDisplay();
    isResultDisplayed = false;
    return;
  }

  if (/[\+\-\*/] $/.test(currentInput)) {
    currentInput = currentInput.slice(0, -2) + op + " ";
    operator = op;
    updateDisplay();
    return;
  }

  if (previousInput !== "" && currentInput !== "") {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput += " " + op + " ";
  updateDisplay();
}

function calculate() {
  let parts = currentInput.split(" ");

  if (parts.length < 3) {
    return;
  }

  let num1 = parseFloat(parts[0]);
  let num2 = parseFloat(parts[2]);
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    currentInput = "Invalid input";
    updateDisplay();
    return;
  }

  switch (parts[1]) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  operator = null;
  isResultDisplayed = true;
  updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    isResultDisplayed = false;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("display").value = currentInput || "0";
}