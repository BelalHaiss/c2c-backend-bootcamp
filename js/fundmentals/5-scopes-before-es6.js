/*
🧠 JavaScript Scope Types (Before ES6):
1. Global Scope         → Variables declared outside any function
2. Function Scope       → Variables declared with `var` inside a function
❌ Block Scope           → Not supported (if, for, while blocks do NOT create scope)
*/

// === 1. Global Scope ===
// Declared outside functions → accessible anywhere (and added to global object in browsers)
var globalVar = "I'm global";
console.log(globalVar); // ✅ Accessible everywhere

// === 2. Function Scope ===
// `var` inside a function is scoped only to that function
function demoFunctionScope() {
    var localVar = "I'm inside a function";
    console.log(localVar); // ✅ Accessible inside
}
demoFunctionScope();
// console.log(localVar); // ❌ ReferenceError: localVar is not defined

// === 3. No Block Scope with `var` ===
// `var` inside if/else or loops is NOT scoped to the block
if (true) {
    var blockVar = "Declared in if block";
}
console.log(blockVar); // ✅ Still accessible — no block scope!

for (var i = 0; i < 1; i++) {
    var loopVar = "Inside loop";
}
console.log(i);       // ✅ 1 — `i` leaks out
console.log(loopVar); // ✅ "Inside loop" — still accessible

// === Buggy Case: `var` in loops with async ===
for (var j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("var j:", j); // ❌ prints 3, 3, 3 — due to function scope
    }, 100);
}

// ✅ Workaround back then: IIFE (Immediately Invoked Function Expression)
for (var k = 0; k < 3; k++) {
    (function (capturedK) {
        setTimeout(() => {
            console.log("IIFE k:", capturedK); // ✅ prints 0, 1, 2
        }, 100);
    })(k);
}


function handleTimeout(capturedI) {
    setTimeout(() => {
        console.log("Captured i:", capturedI);
    }, 100);
}

for (var i = 0; i < 3; i++) {
    handleTimeout(i); // 👈 pass current value of i
}
