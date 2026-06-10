let lastNum = 0;
let currentNum = 0;
let lastOp = null;
let currentOp = null;
const displayCalc = document.querySelector(".calc-display");
const digits = document.querySelectorAll(".calc-digit");
const operatorBtns = document.querySelectorAll(".operator");

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
//
function operate(a, b, operator) {
  const result =
    operator === "+"
      ? add(a, b)
      : operator === "-"
        ? subtract(a, b)
        : operator === "x"
          ? multiply(a, b)
          : operator === "/"
            ? divide(a, b)
            : "ERROR! : Invalid Operator";
  return result;
}
function clear() {
  display("");
  lastNum = 0;
  currentNum = 0;
  return;
}
function display(str) {
  displayCalc.textContent = str;
  return str;
}
//
digits.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Clear") return clear();
    if (displayCalc.textContent.includes("ERROR")) return clear();

    if (Number(currentNum) !== 0)
      currentNum = displayCalc.textContent + button.textContent;
    else currentNum = button.textContent;

    display(currentNum);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayCalc.textContent.includes("ERROR")) return clear();
    const operator = button.textContent;
    lastOp = currentOp;
    currentOp = operator;

    if (currentOp === "=") {
      const result = operate(Number(lastNum), Number(currentNum), lastOp);
      display(result);
      currentOp = null;
    }
    if (lastOp != null) {
      const result = operate(Number(lastNum), Number(currentNum), lastOp);
      display(result);
      lastNum = result;
      currentNum = 0;
    }
  });
});
