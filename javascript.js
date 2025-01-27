/*
output from function will be shown in the result section of calculator
I can do that through dom manipulation 
and then what ? 
one div for calculator 
in that one div for result section 
in the result section, we'll input our text 
flex center the calculator div 
for that change css style through dom

is the user currently entering the first number 
or second number ? 
how to know that ? 
as he clicks number 
the display will keep on adding that number in backside
the string will increase or decrease
If he has entered a number and then also selected an operator
now, if he enteres a number then this one is second number

is variable firstNumber undefined before it's entered ?
we've to handle onlick for each of the buttons 
when I enter operator, display will still hold firstNumber

0 to 9
through dom, iterate through all buttons with class number 
and define their onclick function of what to do when clicked
How to do that ?

Now, How to input firstnumber and secondnumber ? 
when populatedisplay function is called, variable displaycontent
will be filled and it will depend it it would belong to firstnumber or secondnumber 

the problem, button click only work when they are called upon in populatedisplay 
function for firstnumber or secondnumber
but, how will decide which one is it.
so, should I keep event listeners of number button out of the 
populatedisplay function ? 
then it will listen to the click all the time
then, How to decide for what number it goes: first or second ?

8 + 2 + 3 

But, we don't want result of 8 + 2 to be on the display 
just directly set firstnumber to be output of 8 + 2 i.e 10 
so, how to do that ? because all those functions change display textcontent
so what to do ? 
maybe, extract out change textcontent outside and call it only on certain times?
when is it to be called ? 
when = button is selected
inside the functions, we can have result variable that would store 
computation, right ?  
*/

const container = document.querySelector('.Calculator');
const display = document.querySelector('.display');
display.textContent = "0";
let result; 
function add(a , b) {
    const num1 = Number(a);
    const num2 = Number(b);
    result = num1 + num2;
}

function subtract(a, b) {
    const num1 = Number(a);
    const num2 = Number(b);
    result = num1 - num2; 
}

function multiply(a, b) {
    const num1 = Number(a);
    const num2 = Number(b);
    result = num1*num2;
}

function divide(a, b) {
    const num1 = Number(a);
    const num2 = Number(b);
    result = num1/num2;
}

function displayComputation () {
    display.textContent = `${result}`;
}

let firstNumber, secondNumber, operator;

function operate(num1, num2, oprt){
    switch(oprt) {
        case '+':
            add(num1,num2);
            break;
        case '-':
            subtract(num1,num2);
            break;
        case '*':
            multiply(num1,num2);
            break;
        case '/':
            divide(num1,num2);
            break;
        default: 
            console.log('Sorry, please choose a valid operator.');
    }
}

let displayContent;


const allNumberButtons = document.querySelectorAll('.number');
for(let button of allNumberButtons) {

    button.addEventListener('click', () => {

        console.log(firstNumber, secondNumber, operator);
        console.log(display.textContent);

        if(firstNumber === undefined) {
            
            console.log(display.textContent);
            if(display.textContent === '0') {
                display.textContent=button.textContent; 
                firstNumber = button.textContent;   
            }else {
                display.textContent+=button.textContent;
                firstNumber+=button.textContent;  
            }

        }else if(firstNumber !== undefined && operator !==undefined) {
            
            if(secondNumber === undefined) {
                display.textContent = button.textContent;
                secondNumber = button.textContent;
            }else {
                display.textContent+=button.textContent;
                secondNumber+=button.textContent;
            }
        }
        console.log(`${button.textContent} is clicked`);
    });
}



const allOperatorButtons = document.querySelectorAll('.operator');

for(let button of allOperatorButtons) {
    
    button.addEventListener('click', () => {

        console.log(firstNumber, secondNumber, operator);

        if(firstNumber !== undefined && secondNumber !== undefined && operator !==undefined) {
            operate(firstNumber, secondNumber, operator);
            firstNumber = `${result}`;
            secondNumber = undefined;
            operator = button.textContent;
        }else if(firstNumber !==undefined){
            operator = button.textContent;
        }

        console.log(`${button.textContent} is clicked`);
        console.log(firstNumber, secondNumber, operator);
    });
}


const calcButton = document.querySelector('.calculate');

calcButton.addEventListener('click', () => {
    if(secondNumber !== undefined) {

        console.log(firstNumber, secondNumber, operator);

        if(secondNumber === '0' && operator === '/') {
            display.textContent = 'Dawg, wtf';
            firstNumber = undefined;
            secondNumber = undefined;
            operator = undefined; 
        }else {
            operate(firstNumber, secondNumber, operator);
            displayComputation();
            firstNumber = display.textContent;
            secondNumber = undefined; 
            operator = undefined; 
        }

    }
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click',()=> {
    display.textContent = '0';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined; 
});