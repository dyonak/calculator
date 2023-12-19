calcScreen = document.querySelector('#calcScreen');
calcButtonBox = document.querySelector('#calcButtonBox');
calcClear = document.querySelector('#clearButton');

calcClear.addEventListener('click', () => clearDisplay());

document.body.addEventListener('keydown', (e) => processKeys(e));

let calculationString = '0'

function add (a, b) {
    return a + b
};

function subtract (a, b) {
    return a - b
};

function multiply (a, b) {
    return a * b
};

function divide (a, b) {
    return b === 0 ? 'ERROR!' : a / b;
};

function operate (inputString) {
    //Input will be a string in the format of n (operator) n (operator) ...
    //Evaluate using PEMDAS, though no parens/exponents will be implemented so MDAS
    result = 0
    operations = ['*','/','+','-']
    //Turn string into array for evaluation, condense adjacent #'s into single #
    inputArray = inputString.split(/(?=[-+/*])|(?<=[-+/*])/g);
    inputArray = inputArray.map((element) => {
        if (isNaN(element)) {
            return element
        } else {
            return parseFloat(element)
        }
    });

    operations.forEach(operation => {
        while (inputArray.length > 2 && inputArray.indexOf(operation) > -1) {
            operationIndex = inputArray.indexOf(operation)
            if (operation === '*') {
                inputArray[operationIndex-1] =  
                    multiply(inputArray[operationIndex-1], 
                    inputArray[operationIndex+1]);
            };
            if (operation === '/') {
                inputArray[operationIndex-1] =  
                    divide(inputArray[operationIndex-1], 
                    inputArray[operationIndex+1]);
            };
            if (operation === '+') {
                inputArray[operationIndex-1] =  
                    add(inputArray[operationIndex-1], 
                    inputArray[operationIndex+1]);
            };
            if (operation === '-') {
                inputArray[operationIndex-1] =  
                    subtract(inputArray[operationIndex-1], 
                    inputArray[operationIndex+1]);
            };
            inputArray.splice(operationIndex, 2);
        }
        result = inputArray[0];
    });
    //Look for multiplication and perform

    //Look for division and perform

    //Look for addition and perform

    //Look for subtraction and perform

    //Final check to validate no operators remain

    //Return calculated result, round to 2 decimal places
    
    return Math.round((result + Number.EPSILON) * 100) / 100
};

function processKeys(e) {
    if (e.key.match(/[-+*/0123456789]/)) {
        displayUpdate(e.key);
    }
    if (e.keyCode === 13) displayUpdate('↪');
    if (e.keyCode === 27) clearDisplay();
    if (e.keyCode === 110) displayUpdate('.');
};

//Display update
function displayUpdate(input) {

    //Test for sum in display and zero calculationString
    //The user has hit enter on a previous calculation
    if (input === '↪') {
        calcScreen.textContent =roundToTwo(operate(calculationString));
        calculationString = calcScreen.textContent;
        return;
    };

    //Test for divide by zero
    if (input === '0' && calculationString.charAt(calculationString.length -1) === '/') {
        calcScreen.textContent = 'ERROR!';
        return;
    };

    //Math operator case
    if ('*/-+'.includes(input)) {
        if (input === calculationString.charAt(calculationString.length -1)) return;
        //Check for case where an operator exists already in the calculation
        //If so this is the second operation and we need to complete the first
        if (calculationString.match(/[-+*/]/)) {
            calcScreen.textContent = roundToTwo(operate(calculationString));
            calculationString = calcScreen.textContent;
        } else {
            calcScreen.textContent = input;
        };
    };

    //Need to check for a case where the calculationString 
    //and the screen are not zero but are a number (previous calc has been done)
    //If a # is entered in this case it's currently concatenating but 
    //it should clear and start  new calc

    //Attempt at the above
    console.log(!isNaN(input))
    if (!isNaN(input) || input === '.') {
        //Check for fresh display, this is a reload state, change display to input
        if (calcScreen.textContent === '0') {
            calcScreen.textContent = input;
        //If we have an active operator replace that operator on screen with the number
        } else if (calcScreen.textContent.match(/[-+*/]/)) {
            calcScreen.textContent = input;
        //No operator or zero on screen, concat input
        //user is entering decimal point or multi char #
        } else if (calculationString.charAt(calculationString.length - 1).match(/[-+*/]/)) {
            calcScreen.textContent = input;
        //Need to cover case where calc is complete, solution is on screen and another # is hit
        //Currently this concats so 2+2 = 4 on screen and then user hits 2 and screen is 42
        } else {
            calcScreen.textContent = calcScreen.textContent.concat(input);
        };
    };

    calculationString = calculationString.concat(input);
    console.log(`Calculation string is: ${calculationString}`);
}

//Display clear
function clearDisplay() {
    calcScreen.textContent = '0';
    calculationString = '0';
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


clearDisplay();

buttonArray = ['7','8','9','*','4','5','6','/',
'1','2','3','+','.','0','↪','-'];

buttonArray.forEach(button => {
    calcButton = document.createElement('button');
    calcButton.appendChild(document.createTextNode(button));
    calcButton.classList.add('btn-'+button);
    if (button.match(/[-+/*]/)) {
        calcButton.classList.add('operator');
    };
    calcButton.classList.add('button');

    calcButton.addEventListener('click', (e) => {
        displayUpdate(e.target.textContent);
    });

    calcButtonBox.appendChild(calcButton);
});