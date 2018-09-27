
//import Calc from '../lib/Calc';
class Calc{
  /*
  var Calc = function(){
    this.number = 0;
    this.init = true;
  }
Calc.prototype.add = function(num){
  if(this.init){
    this.init = false;
  }
  this.number = this.strip(this.number + num);
  return this;
}
Calc.prototype.substract = function(num){
  this.number = this.strip(this.number - num);
  return this;
}
Calc.prototype.multiply = function(num){
  this.number = this.strip(this.number * num);
  return this;
}
Calc.prototype.devide = function(num){
  if(num !== 0){
    this.number = this.strip(this.number / num);
  }else{
    this.setState({errorFlag:true});
    return this.reset();
  }
  this.number = this.strip(this.number / num);
  return this;
}
Calc.prototype.equals = function(){
  return this.number;
}
Calc.prototype.strip = function(num, precision=12){
  return +parseFloat(num.toPrecision(precision));
}
Calc.prototype.isInit = function(){
  return this.init;
}
*/
constructor(){
  this.number = 0;
  this.init = true;
}
add(number){
  if(this.init){
    this.init = false;
  }
  this.number = this.strip(this.number + number);
  return this;
}
substract(number){
  this.number = this.strip(this.number - number);
  return this;
}
multiply(number){
  this.number = this.strip(this.number * number);
  return this;
}
devide(number){
  if(number !== 0){
    this.number = this.strip(this.number / number);
  }else{
    alert("You can not devide a number by value zero. Will Reset!");
    return this.reset();
  }
  return this;
}
equals(){
  return this.number;
}
reset(){
  this.number = 0;
  this.init = true;
  return this;
}
strip(num, precision=12){
  return +parseFloat(num.toPrecision(precision));
}
isInit(){
  return this.init;
}
// handle "()" and operators
  calculateBrackets(str){
  //shrink all white spaces
  str = str.replace(new RegExp(" ", 'g'), "");
  //console.log(str);
  //Add brackets to prioritize * and /
  //str = str.replace(/(([\d+.\d+])(([*/])([\d+.\d+])+)/g, "($1)");


  //find all matched expression which doesn't include any inner brackets
  let bracketsptn = new RegExp("\\(([^\\(\\)]*)\\)","gi");
  while(true){
    let matched = bracketsptn.exec(str);

    if(matched != null){
        str = str.replace(matched[0], this.calculate(matched[1]));
    }else{
      break;
    }
  }

  //handle final string with no inner brackets
  let finalExp = new RegExp("\\((.*?)\\)","gi");
  while(true){
    let matched = finalExp.exec(str);

    if(matched != null){

        str = str.replace(matched[0], this.calculate(matched[1]));
    }else{
      break;
    }
  }

  //replace <> with ()
  str = this.calculate(str).replace(/</gi, "(").replace(/>/gi, ")");

  //eval str to calculate by Calc Object
  let rs = eval(str);

  //console.log("final2:"+str+" "+rs);
  return rs;
}

  // Replace operator symbols with Calc methods
  calculate(str){
  //handle * and /

  let newStr = this.handlePlusSubstract(str);
  let finalExp = new RegExp("\\((.*?)\\)","gi");
  while(true){
    let matched = finalExp.exec(newStr);

    if(matched != null){
        newStr = newStr.replace(matched[0], this.handleMultiplyDevide(matched[1]));
    }else{
      break;
    }
  }

  //newStr = handleBrackets("\\((.*?)\\)", newStr, "handleMultiplyDevide");
  newStr = newStr.replace(new RegExp("\\+", 'g'), ">.add<");
  newStr = newStr.replace(new RegExp("\\-", 'g'), ">.substract<");
  newStr = newStr.replace(new RegExp("\\*", 'g'), ">.multiply<");
  newStr = newStr.replace(new RegExp("\\/", 'g'), ">.devide<");
  newStr = "new Calc<>.add<"+newStr+">.equals<>";

  return newStr;
}

  handlePlusSubstract(str){
  let matched = /(([^+-])+)([+-])(([^+-])+)/g.exec(str);
  console.log("matched:"+matched);
  let newStr = str.replace(/(([^+-])+)([+-])(([^+-])+)/g,"($1)$3($4)");
  return newStr
}

  handleMultiplyDevide(str){
  str = str.replace(new RegExp("\\*", 'g'), ">.multiply<");
  str = str.replace(new RegExp("\\/", 'g'), ">.devide<");
  str = "new Calc<>.add<"+str+">.equals<>";
  return str;
}
}
//export default calculateBrackets;
module.exports = Calc;
