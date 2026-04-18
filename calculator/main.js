const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearBtn = Array.from(buttons).find((btn) => btn.textContent === "C");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      expression = "";
      display.value = "";
      return;
    }

    if (value === "=") {
      try {
        const result = eval(expression);
        if (!isFinite(result)) {
          throw new Error("math error");
        }
        expression = String(result);
        display.value = expression;
      } catch (error) {
        display.value = "Ошибка";
        expression = "";
      }
      return;
    }

    expression += value;
    display.value = expression;
  });
});

if (clearBtn) {
  clearBtn.title = "Очистить выражение";
}

display.value = "0";
