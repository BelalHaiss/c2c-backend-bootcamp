// -----------------------------------------------
// 1️⃣  Class Declaration
// -----------------------------------------------
class Todo {
  // ↳ this becomes the constructor function
  constructor(title, done = false) {
    this.title = title; // data properties
    this.done = done;
  }

  // -------------------------------------------
  // 2️⃣  Prototype methods (ONE shared copy each)
  //    • Added to Todo.prototype automatically
  // -------------------------------------------
  toggle() {
    this.done = !this.done;
  }

  describe() {
    return `[${this.done ? '✓' : ' '}] ${this.title}`;
  }
}

// -----------------------------------------------
// 4️⃣  Create instances
// -----------------------------------------------
const buy = new Todo('Buy milk');
const read = new Todo('Read MDN article');

buy.toggle(); // mark "buy" as done

// -----------------------------------------------
// 5️⃣  Logs & verification
// -----------------------------------------------
console.log(buy.describe()); // [✓] Buy milk
console.log(read.describe()); // [ ] Read MDN article

// Shared method references?
console.log(buy.describe === read.describe); // true
console.log(buy.toggle === read.toggle); // true

// instanceof & constructor checks
console.log(buy instanceof Todo); // true
console.log(buy.constructor === Todo); // true
