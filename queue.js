class Queue {
    constructor() {
      this.normalQueue = [];
      this.priorityQueue = [];
    }
  
    enqueue(request, isPriority = false) {
      if (isPriority) {
        this.priorityQueue.push(request);
      } else {
        this.normalQueue.push(request);
      }
    }
  
    dequeue() {
      if (this.priorityQueue.length > 0) {
        return this.priorityQueue.shift();
      }
      return this.normalQueue.shift();
    }
  
    isEmpty() {
      return this.priorityQueue.length === 0 && this.normalQueue.length === 0;
    }
  
    viewAll() {
      return {
        priorityQueue: this.priorityQueue,
        normalQueue: this.normalQueue,
      };
    }
  }
  
  module.exports = Queue;
  
