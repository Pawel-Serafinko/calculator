const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const del = document.querySelector(".delete");
const ac = document.querySelector(".ac");
const equals = document.querySelector(".equals");
const previousAction = document.querySelector(".previous-action");
const currentAction = document.querySelector(".current-action");

let currentDisplay = "";
let precedingAction = "";
let currentPress = undefined;

const calculate = () => {
    let operation;
    if (!currentDisplay || !precedingAction) {
        return;
    }

    const previous = parseFloat(precedingAction);
    const current = parseFloat(currentDisplay);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }
    switch (currentPress) {
        case "+":
            operation = previous + current;
            break;
        case "-":
            operation = previous - current;
            break;
        case "×":
            operation = previous * current;
            break;
        case "÷":
            if (current === 0) {
                wrongOperation();
                return;
            }
            operation = previous / current;
            break;
        case "%":
            operation = (previous / 100) * current;
            break;

        default:
            return;
    }
    currentDisplay = operation;
    currentPress = undefined;
    precedingAction = "";
};

const selectOperation = (operator) => {
    if (currentDisplay === "") {
        return;
    }
    if (precedingAction !== "") {
        const previous = previousAction.innerText;
        if (
            currentDisplay.toString() === "0" &&
            previous[previous.length - 1] === "÷"
        ) {
            wrongOperation();
            return;
        }
        calculate();
    }

    currentPress = operator;
    precedingAction = currentDisplay;
    currentDisplay = "";
};

const updateResult = () => {
    currentAction.innerText = currentDisplay;
    if (currentPress != null) {
        previousAction.innerText = precedingAction + currentPress;
    } else {
        previousAction.innerText = "";
    }
};

const addNumber = (number) => {
    if (number === "•") {
        if (currentDisplay.includes(".")) {
            return;
        }
        number = ".";
    }
    currentDisplay = currentDisplay.toString() + number.toString();
};

const delNumber = () => {
    currentDisplay = currentDisplay.toString().slice(0, -1);
};

const clearResult = () => {
    currentDisplay = "0";
    precedingAction = "";
    currentPress = undefined;
    function clearWron() {
        currentDisplay = "";
        precedingAction = "";
        currentPress = undefined;
    }
    setTimeout(clearWron, 1);
};

const wrongOperation = () => {
    currentDisplay = "wrong operation";
    precedingAction = "";
    currentPress = undefined;
    function clearWron() {
        currentDisplay = "";
        precedingAction = "";
        currentPress = undefined;
    }
    setTimeout(clearWron, 1);
};

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
    });
});

del.addEventListener("click", () => {
    delNumber();
    updateResult();
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        selectOperation(operator.innerText);
        updateResult();
    });
});

equals.addEventListener("click", () => {
    calculate();
    updateResult();
});

ac.addEventListener("click", () => {
    clearResult();
    updateResult();
});
