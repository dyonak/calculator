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
        console.table(inputArray)
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