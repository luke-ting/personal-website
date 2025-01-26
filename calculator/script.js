let expression = "";

let ans;

const display = document.getElementById("display");

const secondBtn = document.getElementById("secondBtn");

const invBtns = document.querySelectorAll("#keys button[data-inverse]");

let secondOn = false;

secondBtn.addEventListener("click", () => {
  if(!secondOn){
    secondOn = true;
    secondBtn.style.backgroundColor = "steelblue";
    invBtns.forEach(button => {
      const inverse = button.getAttribute("data-inverse");
      button.textContent = inverse;
    });
  }
  else{
    secondOn = false;
    secondBtn.style.backgroundColor = "blue";
    invBtns.forEach(button => {
      const fx = button.getAttribute("data-fx");
      button.textContent = fx;
    });
    
  }
});

const allBtns = document.querySelectorAll("#keys button");

allBtns.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    const value = button.getAttribute("data-value");
    const fx = button.getAttribute("data-fx")
    const inverse = button.getAttribute("data-inverse");
    if(action){
      performAction(action);
    }
    else if(value){
      appendValue(value);
    }
    else if(fx){
      if(!secondOn){
        performFunction(fx);
      }
      else{
        performInverseFunction(inverse)
      }
    }
  });
});

function performAction(action){
  switch(action){
    case "clear":
      expression = "";
      display.value = "";
      break;
    case "enter":
      calculate(expression);
      break;
  }
}

function performFunction(fx){
  switch(fx){
    case "sin":
      display.value += "sin(";
      expression += "Math.sin(";
      break;
    case "cos":
      display.value += "cos(";
      expression += "Math.cos(";
      break;
    case "tan":
      display.value += "tan(";
      expression += "Math.tan(";
      break;
    case "ln":
      display.value += "ln(";
      expression += "Math.log(";
      break;
    case "log":
      display.value += "log(";
      expression += "Math.log10(";
      break;
    case "x^2":
      display.value += "^2";
      expression += "**2";
      break;
    case "^":
      display.value += "^";
      expression += "**";
      break;
  }
}

function performInverseFunction(inverse){
  switch(inverse){
    case "asin":
      display.value += "asin(";
      expression += "Math.asin(";
      break;
    case "acos":
      display.value += "acos(";
      expression += "Math.acos(";
      break;
    case "atan":
      display.value += "atan(";
      expression += "Math.atan(";
      break;
    case "e^x":
      display.value += "e^(";
      expression += "Math.exp(";
      break;
    case "10^x":
      display.value += "10^(";
      expression += "Math.pow(10,";
      break;
    case "√":
      display.value += "√(";
      expression += "Math.sqrt(";
      break;
    case "n√":
      let depth = 0;
      let lastOpIndex = -1;
      for(let i = 0; i < expression.length; i++){
        const c = expression[i];
        if(c==="("){
          depth++;
        }
        else if (c===")"){
          depth--;
        }
        else if (depth===0 && (c==="+" || c==="-" || c==="*" || c==="/")) {
          lastOpIndex = i;
        }
      }
      let n;
      if(lastOpIndex !== -1){
        try{
          n = eval(expression.slice(maxIndex + 1));
          if(isNaN(n) || !isFinite(n)){
            throw new Error();
          }
          expression = expression.slice(0, maxIndex+1) + `nthRoot(${n},`;
        }
        catch(error){
          expression = "Error";
          display.value = "Error";
          return;
        }
      }
      else{
        try{
          n = eval(expression);
          if(isNaN(n) || !isFinite(n)){
            throw new Error();
          }
          expression = `nthRoot(${n},`;
        }
        catch(error){
          expression = "Error";
          display.value = "Error";
          return;
        }
      }
      display.value += "n√(";
      break;
  }
}

function nthRoot(n, x){
  return Math.pow(x, 1 / n);
}

function calculate(expression){
  try{
    expression = eval(expression);
    if(isNaN(expression) || !isFinite(expression)){
      throw new Error();
    }
    display.value = expression;
    ans = expression;
  }
  catch(error){
    expression = "Error";
    display.value = "Error";
  }
}


function appendValue(value){
  switch(value){
    case "(-)":
      display.value += "-";
      expression += "(-1)*";
      break;
    case "π":
      display.value += "π";
      expression += "Math.PI";
      break;
    case "Ans":
      expression += `${ans}`;
      display.value += "Ans"
      break;
    default:
      expression += value;
      display.value += value;
      break;
  }
}

