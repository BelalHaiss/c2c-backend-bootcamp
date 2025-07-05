// ✅ Expression (التعبير):                       // أي شيء يُنتج قيمة
// Any piece of code that produces a value        // مثل 5 + 3 أو "Hi" + name أو x * 2

// 🛠 Statement (التعليمة):                        // سطر يُنفّذ أمرًا
// A complete instruction that performs an action // مثل if أو return أو تعريف متغير

// 🏷 Declaration (التصريح):                      // تعريف اسم لمتغير أو دالة أو كلاس
// A special kind of statement that defines a name

// 🔁 Notes (ملاحظات):
// - In real-world JavaScript, we often use       // - نستخدم التعابير والتعليمات معًا
//   expressions inside statements                //   في أغلب كود JavaScript العملي

// - Declarations are a type of statement         // - التصريحات تُعتبر نوعًا من التعليمات

// - Understanding the difference helps write     // - فهم الفرق يساعدك على كتابة كود واضح
//   clean and predictable code                   //   وسهل التصحيح

// Expressions
5 + 3; // 8
('Hello'); // "Hello"
x * y; // some number
true || false; // true
Math.max(1, 5); // 5
// ✔️ Expressions can be used anywhere a value is expected.

// A statement is an instruction that performs an action.

let x = 10;          // variable declaration → statement
if (x > 5) { }     // if-statement
while (true) { }   // loop statement
return x * 2;        // return statement
// ✔️ Statements do not return a value themselves — they "do" something.


// Declarations
let name = 'Ali'; // variable declaration
const age = 30; // constant declaration
var country = 'Egypt'; // var declaration 
function greet() { // function declaration
    console.log('Hello');
}
async function fetchData() { } // async function declaration
class Person { } // class declaration


/********************************************************************************************
 * 🔍 Expression + Statement Examples in JavaScript
 * ------------------------------------------------------------------------------------------
 * 🧠 Most real-world JS code combines both:
 ********************************************************************************************/
// 1️⃣ Assignment Statement + Arithmetic Expression
let sum = 5 + 3;         // 5 + 3 is an expression, entire line is a statement

// 2️⃣ Function Call Statement + String Concatenation Expression
console.log("Hi" + " Ali");  // "Hi" + " Ali" is an expression, full line is a statement

// 3️⃣ Variable Reassignment Statement + Multiplication Expression
sum = sum * 2;           // sum * 2 is an expression, full line is an assignment statement

// 4️⃣ Return Statement + Expression
function double(n) {
    return n * 2;          // n * 2 is an expression, full line is a return statement
}

// 5️⃣ If Statement + Comparison Expression
if (sum > 10) {          // sum > 10 is an expression
    console.log("Large");  // statement
}

// 6️⃣ Ternary Expression inside Assignment Statement
let status = (sum > 10) ? "high" : "low"; // ternary is an expression, full line is a statement

// 7️⃣ Function Expression inside Variable Declaration Statement
const greet = function () {
    return "Hello";
};                      // function expression assigned to const → full line is a statement

// 8️⃣ Arrow Function Expression Assigned to Variable
const square = (x) => x * x;  // x * x is an expression, whole line is an expression statement

// 9️⃣ Array Literal Expression Assigned in a Statement
let numbers = [1, 2, 3];      // [1, 2, 3] is an expression, whole line is a declaration statement

// 🔟 Object Literal Expression in Variable Declaration
const person = {
    name: "Ali",
    age: 30
};                           // object is an expression, assigned via a statement
