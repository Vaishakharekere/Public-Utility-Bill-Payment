
class Stack {
    constructor() {
      this.stack = [];
    }
  
    push(transaction) {
      this.stack.push(transaction);
    }
  
    pop() {
      return this.stack.pop();
    }
  
    viewHistory() {
      return this.stack;
    }
  }
  
  module.exports = Stack;
  