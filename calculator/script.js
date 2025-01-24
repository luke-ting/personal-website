//import { Parser } from 'expr-eval';

const parser = new exprEval.Parser();

const display = document.getElementById("display");

let expression = "";

const allBtns = document.querySelectorAll("#keys button");

allBtns.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    const value = button.getAttribute("data-value");
    if(action){
      performAction(action);
    }
    else if(value){
      appendValue(value);
    }
  });
});

function performAction(action){
  if(action === "clear"){
    expression = "";
    display.value = "";
  }
  else if(action === "enter"){
    calculate(expression);
  }
}

function appendValue(value){
  if(value === "(-)"){
    display.value += "-";
    expression += "(-1)*"
  }
  else{
    expression += value;
    display.value += value;
  }
}

function calculate(expression){
  try{
    expression = parser.evaluate(expression);
    display.value = expression;
  }
  catch(error){
    expression = "Error";
    display.value = "Error";
  }
}

