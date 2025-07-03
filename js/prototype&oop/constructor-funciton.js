// explain new Keyword first
// -----------------------------------------------
// 1️⃣  Constructor Function
// -----------------------------------------------
function Todo(title, done = false) {
  // • When called with `new`, `this` is an empty object
  //   already linked to Todo.prototype.
  this.title = title; // data property
  this.done = done; // data property
}

// -----------------------------------------------
// 2️⃣  Shared (prototype) methods
//    • Only ONE copy of each method exists in memory
// -----------------------------------------------
Todo.prototype.toggle = function () {
  this.done = !this.done;
};

Todo.prototype.describe = function () {
  return `[${this.done ? '✓' : ' '}] ${this.title}`;
};

// -----------------------------------------------
// 3️⃣  Create instances
// -----------------------------------------------
const buy = new Todo('Buy milk'); // Todo { title: "Buy milk",  done: false }
const read = new Todo('Read MDN article'); // Todo { title: "Read MDN article", done: false }

buy.toggle(); // mark "buy" as done

// -----------------------------------------------
// 4️⃣  Logs & verification
// -----------------------------------------------
console.log(buy.describe()); // [✓] Buy milk
console.log(read.describe()); // [ ] Read MDN article

// Same method reference?  (✓ memory-efficient)
console.log(buy.describe === read.describe); // true
console.log(buy.toggle === read.toggle); // true

// instanceof & constructor checks
console.log(buy instanceof Todo); // true
console.log(buy.constructor === Todo); // true
