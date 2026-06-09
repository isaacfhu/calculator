let currentNum = 0;
const displayCalc = document.querySelector(".calc-display");
const digits = document.querySelectorAll(".calc-digit");

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
        : operator === "*"
          ? multiply(a, b)
          : operator === "/"
            ? divide(a, b)
            : "ERROR! : Invalid Operator";
  return result;
}
function updateDisplay(str) {
  displayCalc.textContent = str;
  return str;
}

digits.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Clear") {
      updateDisplay("0");
      currentNum = 0;
    }
  });
});
