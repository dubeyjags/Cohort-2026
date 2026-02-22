// console.log('block this:', this); // global object (window in browsers)

// function heroonGLobal() {
//   console.log('function this',this); // global object (window in browsers)
//   return typeof this; // "object"
// }

// console.log('heroonGLobal:', heroonGLobal());

// function heroonMethod() {
//   return this; // object that is calling the method
// }

// console.log('heroonMethod:', heroonMethod()); // global object (window in browsers)

// function heroonStrict() {
//   'use strict';
//   console.log('function this in strict mode', this);
// };

// console.log('heroonStrict:', heroonStrict()); // undefine
// 


const heroonObject = {
  name: 'heroonObject',
  leader: 'heroonLeader',
  heroonMethod() {
    return `name: ${this.name} leader: ${this.leader}`; // object that is calling the method
  }
};

console.log('heroonObject.heroonMethod():', heroonObject.heroonMethod()); // object that is calling the method

const heroObj = {
  name: 'heroObj',
  leader: ['heroObjLeader1', 'heroObjLeader2'],
    heroonMethod() {
    this.leader.forEach(leader => {
      console.log(`name: ${this.name} leader: ${leader}`); // object that is calling the method
    });
  }
};

console.log('heroObj.heroonMethod():', heroObj.heroonMethod()); // object that is calling the method