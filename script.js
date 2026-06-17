let lastNum = 0;
let currentNum = 0;
let currentOp = null;
const displayCalc = document.querySelector(".calc-display");
const digits = document.querySelectorAll(".calc-digit");
const operatorBtns = document.querySelectorAll(".operator");
const delCalc = document.querySelector(".calc-del");
const clearCalc = document.querySelector(".calc-clear");

// basic math
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  const result =
    operator === "+"
      ? add(a, b)
      : operator === "-"
        ? subtract(a, b)
        : operator === "x" || operator === "*"
          ? multiply(a, b)
          : operator === "/" || operator === "÷"
            ? divide(a, b)
            : "ERROR! : Invalid Operation";
  return result;
}
//
function clear() {
  display("");
  lastNum = 0;
  currentNum = 0;
  currentOp = null;
  return;
}
function del() {
  const newStr = displayCalc.textContent.slice(0, -1);
  currentNum = newStr;
  display(currentNum);
  return newStr;
}
function getRounded(num) {
  return parseFloat(num.toFixed(10));
}
function onEqualOp() {
  const result = operate(Number(lastNum), Number(currentNum), currentOp);
  if (typeof result !== "number") {
    display(result);
    return;
  }

  const rounded = getRounded(result);
  currentNum = rounded;
  display(currentNum);
  currentOp = null;
}
function display(str) {
  displayCalc.textContent = str;
  return str;
}
//
//
function handleDigit(value) {
  if (displayCalc.textContent.includes("ERROR")) return clear();
  else if (displayCalc.textContent.includes(".") && value === ".") return;

  if (Number(currentNum) !== 0) currentNum = displayCalc.textContent + value;
  else currentNum = value;

  console.log(lastNum, currentNum);
  display(currentNum);
}
function handleOperator(operator) {
  if (displayCalc.textContent.includes("ERROR")) return clear();

  if (currentOp === null) {
    currentOp = operator;

    lastNum = currentNum;
    currentNum = 0;
  } else if (operator === "=") onEqualOp();
  else if (currentOp !== null) {
    const result = operate(Number(lastNum), Number(currentNum), currentOp);

    if (typeof result !== "number") {
      display(result);
      return;
    }

    const rounded = getRounded(result);

    display(rounded);

    lastNum = rounded;
    currentNum = 0;

    currentOp = operator;
  }

  console.log(currentOp);
}
//

delCalc.addEventListener("click", del);
clearCalc.addEventListener("click", clear);

digits.forEach((button) => {
  button.addEventListener("click", () => {
    handleDigit(button.textContent);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.textContent);
  });
});

document.addEventListener("keydown", (e) => {
  //console.log(e);
  if ((e.key >= "0" && e.key <= "9") || e.key === ".")
    return handleDigit(e.key);
  if (e.key === "Backspace") {
    del();
    return;
  }
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "*" ||
    e.key === "x"
  )
    handleOperator(e.key);
  if (e.key === "Enter" || e.key === "=") {
    return handleOperator("=");
  }
});
