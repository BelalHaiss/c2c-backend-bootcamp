/********************************************************************************************
 * HOISTING – How JavaScript Moves Declarations Before Execution
 * ------------------------------------------------------------------------------------------
 * During the "compile phase", JS hoists:
 *   - `var` variable **declarations** (not initializations)
 *   - `function` declarations (fully)
 *   - `let` and `const` are hoisted too, but stay in a "temporal dead zone"
 ********************************************************************************************/

// Example 1: Hoisting with var
console.log(myVar); // undefined (not ReferenceError)
var myVar = 42;

// Internally behaves like:
//
// var myVar;         ← declaration hoisted
// console.log(myVar);
// myVar = 42;

// ------------------------------------------------------

// Example 2: Hoisting with function declaration
sayHi(); // ✅ works — full function hoisted

function sayHi() {
    console.log('👋 Hi from sayHi!');
}


// ------------------------------------------------------

// Example 3: Hoisting with let/const
// console.log(secret); // ❌ ReferenceError (TDZ)
// let secret = 'shhh';

// Uncommenting the above line throws because:
// - `secret` is hoisted, BUT it's not accessible until the `let` line executes.
// - This is called the "Temporal Dead Zone".

/********************************************************************************************
 * Summary:
 * - `var` → Hoisted and initialized to `undefined`.
 * - `function` → Hoisted completely, usable before declaration.
 * - `let/const` → Hoisted, BUT not accessible until actual line is reached (TDZ).
 ********************************************************************************************/
