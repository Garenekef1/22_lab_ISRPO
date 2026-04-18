export class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.expression = "";
    this.hasError = false;
  }

  init() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleButtonClick(button.textContent);
      });
    });
    this.updateDisplay();
  }

  handleButtonClick(value) {
    if (this.hasError && value !== "C") {
      this.clear();
    }

    if (value === "C") {
      this.clear();
      return;
    }

    if (value === "=") {
      this.calculate();
      return;
    }

    this.addToExpression(value);
  }

  addToExpression(value) {
    if (this.isOperator(value)) {
      if (this.expression.length === 0 && value !== "-") {
        return;
      }

      if (this.isLastCharOperator()) {
        return;
      }
    }

    if (value === "." && this.hasDuplicateDot()) {
      return;
    }

    this.expression += value;
    this.updateDisplay();
  }

  calculate() {
    if (!this.isValidExpression()) {
      this.showError();
      return;
    }

    try {
      const result = this.safeEvaluate(this.expression);
      if (!isFinite(result)) {
        this.showError();
        return;
      }
      this.expression = String(result);
      this.hasError = false;
      this.updateDisplay();
    } catch (error) {
      this.showError();
    }
  }

  safeEvaluate(expr) {
    if (!this.isValidExpression()) {
      throw new Error("invalid expression");
    }
    return eval(expr);
  }

  isValidExpression() {
    if (!this.expression) {
      return false;
    }
    if (this.isLastCharOperator()) {
      return false;
    }
    if (/[+\-*/]{2,}/.test(this.expression)) {
      return false;
    }
    return true;
  }

  clear() {
    this.expression = "";
    this.hasError = false;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.value = this.expression || "0";
  }

  showError() {
    this.hasError = true;
    this.expression = "";
    this.displayElement.value = "Ошибка";
  }

  isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
  }

  isLastCharOperator() {
    if (!this.expression) {
      return false;
    }
    const lastChar = this.expression[this.expression.length - 1];
    return this.isOperator(lastChar);
  }

  hasDuplicateDot() {
    const parts = this.expression.split(/[+\-*/]/);
    const currentNumber = parts[parts.length - 1];
    return currentNumber.includes(".");
  }
}
