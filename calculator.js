let currentInput = "";
let previousInput = "";
let operator = null;

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function setOperator(op) {
  operator = op;
  if (currentInput === "") {
    return;
  }
  if (previousInput !== "") {
    calculate();
  }

  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  if (previousInput === "" || currentInput === "") {
    return;
  }
  let result;
  let num1 = parseFloat(previousInput);
  let num2 = parseFloat(currentInput);

  switch (operator) {
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
  updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("display").value = currentInput || "0";
}