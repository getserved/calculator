const Calc = require('./Calc.js');
const chai = require('chai');
const expect = require('chai').expect;
const assert = chai.assert;
const sinon = require('sinon');

describe('Calc', function() {
  it('should start 0', function() {
     var calc = new Calc();
     expect(calc.number).equal(0);
  });
  it('5 plus 6 equals to 11', function() {
     var calc = new Calc();
     expect(calc.add(5).add(6).equals()).to.be.equal(11);
  });
  it('6 plus -5 equals to 1', function() {
     var calc = new Calc();
     expect(calc.add(6).add(-5).equals()).to.be.equal(1);
  });
  it('0.1 plus 0.2 equals to 0.3', function() {
     var calc = new Calc();
     expect(calc.add(0.1).add(0.2).equals()).to.be.equal(0.3);
  });
  it('0.1 substract 0.2 equals to -0.1', function() {
     var calc = new Calc();
     expect(calc.add(0.1).substract(0.2).equals()).to.be.equal(-0.1);
  });
  it('6 substract 5 equals to 1', function() {
     var calc = new Calc();
     expect(calc.add(6).substract(5).equals()).to.be.equal(1);
  });
  it('5 multiply 6 equals to 30', function() {
     var calc = new Calc();
     expect(calc.add(5).multiply(6).equals()).to.be.equal(30);
  });
  it('500 mutiply 0.2 equals to 100', function() {
     var calc = new Calc();
     expect(calc.add(500).multiply(0.2).equals()).to.be.equal(100);
  });
  it('0.1 devide 0.2 equals to 0.5', function() {
     var calc = new Calc();
     expect(calc.add(0.1).devide(0.2).equals()).to.be.equal(0.5);
  });
  it('0.0000001 multiply 0.000002 equals to 0.02', function() {
     var calc = new Calc();
     expect(calc.add(0.0000001).multiply(0.000002).equals()).to.be.equal(2e-13);
  });
  it('1 devide 0 alert error and reset to 0', function() {
     var calc = new Calc();
     var spy = sinon.spy(window, 'alert');
     calc.add(1).devide(0).equals();
     assert(spy.called);
  });

});
