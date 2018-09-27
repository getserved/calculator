import React, {Component} from 'react';
import wrapWithTryCatch from 'react-try-catch-render';
import MyErrorHandler from '../Error/error';
import Calc from './Calc';
import '../Style/CalcUI.css'

// Init Button List
const BTNLIST = [
    {value: '7',type:'number',order:'4'},
    {value: '8',type:'number',order:'5'},
    {value: '9',type:'number',order:'6'},
    {value: '←',type:'backspace',order:'2'},
    {value: 'C',type:'reset', name:"reset",order:'3'},
    {value: '4',type:'number',order:'8'},
    {value: '5',type:'number',order:'9'},
    {value: '6',type:'number',order:'10'},
    {value: '*',type:'operator', name:"multiply",order:'15'},
    {value: '/',type:'operator', name:"devide",order:'19'},
    {value: '1',type:'number',order:'12'},
    {value: '2',type:'number',order:'13'},
    {value: '3',type:'number',order:'14'},
    {value: '+',type:'operator', name:"add",order:'7'},
    {value: '-',type:'operator', name:"substract",order:'11'},
    {value: '0',type:'number',order:'17'},
    {value: '.',type:'decimal',order:'16'},
    {value: '=',type:'equal', name:"equal",order:'18'},
    {value: '(',type:'brackets',order:'0'},
    {value: ')',type:'brackets',order:'1'}
];

const operatorName = ['+','-','/','*'];


// find if data is operator
const isOperator = (data,priorarr)=>{
    let rev = false;
    priorarr.forEach(element => {
        if(data === element){
            rev = true;
        }
    });
    return rev;
}

class CalcUI extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueText: '0',
            getRes:false,
            bracketClose:0,
            errorFlag:false
        }
    }

    //Evaluate arthimetic expression
    evaluateExp = (str)=>{
      let newArr = [];
      let newStr = '';
      let strArr = str.split(' ');
      let lastDigitIndex = 0;
      let lastOperator = 0;
      console.log(strArr);
      strArr.forEach((ele,i)=>{
        if(ele !== ""){
          newArr.push(ele);
          if(isOperator(ele, operatorName)){
            lastOperator = i;
          }else{

            lastDigitIndex = i;
          }
        }

      });
      let lastSymbolLen = lastOperator - lastDigitIndex;
      console.log("lastOperator:"+lastOperator+" lastDigitIndex"+lastDigitIndex)
      for(let i = 0; i < lastSymbolLen; i++){
         newArr.pop();
      }

      newStr = newArr.join(' ');

      let bc = this.state.bracketClose;
      if(bc > 0){
        for(let i = 0; i < bc; i++){
          newStr += " )";
        }
      }
      return newStr;
    }
    //Listener for button clicking
    handleValueInput(data) {
        let oldState = this.state.valueText;
        let rev = this.checkOperator(oldState,data);
        this.setState({valueText:rev})
    }


    //handle different event
    checkOperator(prevalue,data){
        let initFlag = prevalue === '0'&&data.type!=='decimal';
        let hasCalc = this.state.getRes===true;
        switch (data.type) {
            case 'backspace':
              prevalue = prevalue.toString();

              if(prevalue.lastIndexOf(" ") === (prevalue.length-1)){
                prevalue =  prevalue.substring(0,prevalue.length-2);
              }else{
                prevalue =  prevalue.substring(0,prevalue.length-1);
              }


              if(prevalue.length <= 0){
                prevalue = "0";
              }
              return prevalue;
            case 'reset':
                prevalue = new Calc().reset().equals();
                return prevalue;
            case 'equal':
                let prevData = prevalue + ' =' ;
                let prevResult = this.evaluateExp(prevalue);
                this.props.equalClick(prevResult);
                this.setState({getRes:true});
                return prevData;
            case 'operator':
                this.setState({getOperator:true});
                if(hasCalc){
                    let result = this.props.revdata;
                    this.setState({getRes:false})
                    return result + ' ' + data.value + ' ';
                }

                //if more than one operators clicked
                let valueArr = prevalue.split(' ');
                if(valueArr[valueArr.length-1]===''&&valueArr[valueArr.length-2]!==')'){

                    prevalue =  prevalue.substring(0,prevalue.length-3)
                    return  prevalue + ' ' + data.value + ' ';
                }
                return prevalue + ' ' + data.value + ' ';
            case 'brackets':
                if(initFlag||hasCalc){
                    prevalue = ''
                }
                if(hasCalc){
                    this.setState({getRes:false})
                }
                let brClose = this.state.bracketClose;
                let lastOpr = prevalue.trim().slice(-1);

                if(data.value === "("){

                  if(prevalue === "" || hasCalc){
                    brClose++;
                    this.setState({bracketClose:brClose});
                    return "(";
                  }else{
                    if(!(lastOpr === "(" || +" "+isOperator(lastOpr, operatorName))){
                      return prevalue;
                    }

                  }
                  brClose++;
                }else if(data.value === ")"){
                  if(brClose <= 0){
                    return prevalue;
                  }
                  brClose--;
                }
                this.setState({bracketClose:brClose});
                //console.log(this.state.bracketClose);
                return prevalue + ' ' + data.value + ' ';
            default:
                if(initFlag||hasCalc){
                    prevalue = ''
                }
                if(hasCalc){
                    this.setState({getRes:false})
                }
                if(data.value==='0'){
                  /*
                    let valueArr = prevalue.split(' ');

                    if(valueArr[valueArr.length-2]==='/'){
                        this.setState({errorFlag:true});
                        return '0';
                    }
                    */
                }
                return prevalue + data.value
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            errorFlag:false,
            valueText:  nextProps.revdata
        })
    }
    //Sorting Button List by order
    compareBtnList(ele1, ele2){
      return ele1.order - ele2.order;
    }
    initButtonList=(list,value)=>{
        value.forEach(data => {
          list.push(
              <button className={'calc-btn '+
                                    ((data.type !== 'number')?' operator-btn':'')+
                                    ((data.type === 'equal')?' equator-btn':'')
                                }
                  key={data.value}
                  onClick = {this.handleValueInput.bind(this,data)}
              >{data.value}</button>
          );

        });
        return list;
    }


    render() {
        if(this.state.errorFlag){
            throw new Error('You can not devide a number by value zero. Will Reset!');
        }
        let buttonlist = [];
        let buttonValue = BTNLIST;
        if (matchMedia('(min-width:300px) and (max-width:800px)').matches) {
          buttonValue.sort(this.compareBtnList);
        }
        buttonlist = this.initButtonList(buttonlist,buttonValue)
        return (
            <div className='Calculator'>
                <div className='calc-panel'>
                    <h1>My Calculator</h1>
                    <div className='calc-screen'>
                        <input type="text"
                            value={this.state.valueText}
                            readOnly
                        />
                    </div>

                    <div className='calc-btn-list'>

                        {buttonlist}

                    </div>
                </div>

            </div>
        );
    }
}

export default wrapWithTryCatch(
    React,
    MyErrorHandler,
    {
        errorPath:'/calculator',
        errorInfo:'You can not devide a number by value zero. Will Reset!'
    }
)(CalcUI);
//export default CalcUI;
