/*
🧠 JavaScript Scope Types (Before and After ES6):
1. Global Scope (browser script only)
2. Module Scope (Node.js CommonJS & ESM)
3. Function Scope
4. Block Scope (introduced in ES6 with let/const)
*/


// === 1 & 2. Global vs Module Scope ===
// In browser script: var = global (window), let/const not
// In Node.js: everything is in module scope, not global
var globalVar = "visible in module";
console.log(global.globalVar); // undefined (not added to global in Node.js)

// === 3. Function Scope ===
function testFuncScope() {
    var a = 1, b = 2;
    console.log(a, b); // ✅ inside function
}
testFuncScope();
// console.log(a); // ❌ ReferenceError: a is not defined

// === 4. Block Scope ===
{
    let x = "block";
    const y = "scoped";
    console.log(x, y); // ✅ inside block
}
// console.log(x); // ❌ ReferenceError: x is not defined
