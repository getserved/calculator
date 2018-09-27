
import Calc from '../lib/Calc';

function Stack(){
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    this.isempty = isempty;

    function push(element){
        this.dataStore[this.top++] = element;
    }

    function pop(){
        //return this.dataStore[--this.top];
        let peekdata = this.dataStore[this.top-1];
        this.top--;
        return peekdata;
    }
    //return the top ele of the stack
    function peek(){
        return this.dataStore[this.top-1];
    }
    //clear the stack
    function clear(){
        this.top = 0;
    }
    //return the lenght of the stack
    function length(){
        return this.top;
    }
    function isempty(){
        return this.top === 0;
    }
}


let operatorName = ['+','-','/','*','(',')'];
let priorValue = {};
// init Priorities
function initPrior(){
    priorValue['+'] = 1;
    priorValue['-'] = 1;
    priorValue['*'] = 5;
    priorValue['/'] = 5;
    priorValue['('] = 10;
    priorValue[')'] = 0;
}

//if it's an operator
function isOperator(data,priorarr){
    let rev = false;
    priorarr.forEach(element => {
        if(data === element){
            rev = true;
        }
    });
    return rev;
}

// handle "()" and operators

function suffixExpression(str){
    initPrior();
    let strarr = str.split(" ");
    var stack = new Stack();
    var outStack = [];
    while(strarr.length!==0){
        if(strarr[0]===''){
            strarr.shift();
            continue;
        }
        // If Number
        else if(!isOperator(strarr[0],operatorName)){
            outStack.push(strarr[0])
        }
        // If Operator
        else{
            // If "(" push
            if(strarr[0]==='('){
                stack.push(strarr[0])
            }
            //if ")" and top is not "("
            else if(strarr[0]===')'){
                while(stack.peek()!=='('){
                    outStack.push(stack.pop());
                }
                //pop the stack when "(" found
                stack.pop()
            }
            //handle prority of the operators
            else{
                if(stack.isempty()){
                    stack.push(strarr[0]);
                }
                else{
                    //If operator has higher priority than prior operator, push
                    //Otherwise pop the prior operator and push the current operator
                    if(priorValue[strarr[0]] > priorValue[stack.peek()]){
                        stack.push(strarr[0]);
                    }else{
                        while(!stack.isempty()&&priorValue[stack.peek()]>=priorValue[strarr[0]]&&stack.peek()!=='('){
                            outStack.push(stack.pop());
                        }
                        stack.push(strarr[0]);
                    }
                }
            }
        }
        strarr.shift();
    }

    while(!stack.isempty()){
        outStack.push(stack.pop());
    }
    console.log(outStack);
    let revData = calcSuffixExpression(outStack);
    return revData;
}


//suffixExpression
function calcSuffixExpression(revarr){
    let stack =  new Stack();
    while(revarr.length!==0){
        //if number
        if(!isOperator(revarr[0],operatorName)){
            stack.push(revarr[0]);
        }
        //if operator
        else{
            let topdata = stack.pop();
            let followdata = stack.peek();
            let result = 0;
            let calc = new Calc();
            switch (revarr[0]) {
                case '+':
                    result = calc.add(Number(followdata)).add(Number(topdata)).equals();break;
                case '-':
                    result = calc.add(Number(followdata)).substract(Number(topdata)).equals();break;
                case '*':
                    result = calc.add(Number(followdata)).multiply(Number(topdata)).equals();break;
                case '/':
                    result = calc.add(Number(followdata)).devide(Number(topdata)).equals();break;
                default:
                    return revarr[0];
            }
            stack.pop();
            stack.push(result);
        }
        revarr.shift();
    }
    let resultData = stack.pop();
    //console.log("resultData:"+resultData);

    if(isNaN(resultData)) resultData = 'Error';
    return resultData;
}
/**
 *  suffixExpression to check values
 *  scan the expression from left to right
 *  number will be pushed to stack
 *     if operator, did calcuation and push to the top ele
 *  the last ele in the top of the stack will be the result
 */

 export default suffixExpression;
