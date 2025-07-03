// todoFactory.js
// ----------------------------------------------------
// Returns a NEW object literal every call.
// Each todo owns its own copies of toggle() & describe() ❌
function createTodo(title, done = false) {
  const todo = {}; // 1️⃣ start with an empty object

  // 2️⃣ add data properties
  todo.title = title;
  todo.done = done;

  // 3️⃣ add per-instance methods (duplicated for each todo)
  todo.toggle = function () {
    this.done = !this.done;
  };

  todo.describe = function () {
    return `[${this.done ? '✓' : ' '}] ${this.title}`;
  };

  return todo; // 4️⃣ return the finished object
}

/* ── create three todos ───────────────────────────── */
const buy = createTodo('Buy milk');
const read = createTodo('Read MDN article');
const jog = createTodo('Evening jog');

buy.toggle(); // mark as done

console.log(buy.describe()); // [✓] Buy milk
console.log(jog.describe()); // [ ] Evening jog

// 🔍  Proof of duplication – different function references
console.log(buy.describe === read.describe); // false
console.log(buy.toggle === read.toggle); // false
