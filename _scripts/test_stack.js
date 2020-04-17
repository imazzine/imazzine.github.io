class Stack {
  constructor() {
      this.stack = new Error().stack
      .replace('Error', 'Created')
      .replace(/\@/g, '\n  at ');
  }
}
const s = new Stack();
console.log(s.stack);