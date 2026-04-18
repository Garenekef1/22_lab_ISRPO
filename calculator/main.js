import { Calculator } from "./calculator.js";

const display = document.getElementById("display");
const calculator = new Calculator(display);
calculator.init();
