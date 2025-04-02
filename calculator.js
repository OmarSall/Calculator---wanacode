let currentInput = "";
let previousInput = "";
let operator = null;
let isResultDisplayed = false;

function appendNumber(number) {
  if (number === ".") {
    const lastNumber = currentInput.split(" ").pop();
    if (lastNumber.includes(".")) {
        return;
    }
    if (lastNumber === "") {
        number = "0.";
    }
  }
  currentInput += number;
  updateDisplay();
}

function setOperator(chosenOperator) {  
  if (currentInput === "" && previousInput === "") {
    return;
  }


  if (/[\+\-\*/] $/.test(currentInput)) {
    currentInput = currentInput.slice(0, -2) + chosenOperator + " ";
    operator = chosenOperator;
    updateDisplay();
    return;
  }

  if (previousInput !== "" && currentInput !== "") {
    calculate();
  }

  operator = chosenOperator;
  previousInput = currentInput;
  currentInput += " " + chosenOperator + " ";
  updateDisplay();
}

function calculate() {
  const parts = currentInput.split(" ");

  if (parts.length < 3) {
    return;
  }

  const num1 = parseFloat(parts[0]);
  const num2 = parseFloat(parts[2]);
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