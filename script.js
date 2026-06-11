let lastNum = 0;
let currentNum = 0;
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
  return displayCalc.textContent.slice(0, -1);
}
function onEqualOp() {
  const result = operate(Number(lastNum), Number(currentNum), currentOp);
  const rounded = parseFloat(result.toFixed(10));
  currentNum = rounded;
  display(currentNum);

  currentOp = null;
}
function display(str) {
  displayCalc.textContent = str;
  return str;
}
//
digits.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Clear") return clear();
    if (button.textContent === "Del") {
      const newStr = del();
      currentNum = newStr;
      display(currentNum);
      return;
    }
    if (displayCalc.textContent.includes("ERROR")) return clear();
    else if (
      displayCalc.textContent.includes(".") &&
      button.textContent === "."
    )
      return;

    if (Number(currentNum) !== 0)
      currentNum = displayCalc.textContent + button.textContent;
    else currentNum = button.textContent;

    console.log(lastNum, currentNum);
    display(currentNum);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayCalc.textContent.includes("ERROR")) return clear();
    const operator = button.textContent;

    if (currentOp === null) {
      currentOp = operator;

      lastNum = currentNum;
      currentNum = 0;
    } else if (operator === "=") onEqualOp();
    else if (currentOp !== null) {
      const result = operate(Number(lastNum), Number(currentNum), currentOp);
      const rounded = parseFloat(result.toFixed(10));

      display(rounded);

      lastNum = rounded;
      currentNum = 0;

      currentOp = operator;
    }

    console.log(currentOp);
  });
});
