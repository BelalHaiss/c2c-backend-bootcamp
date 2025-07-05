/**********************************************************************************************
 * LEXICAL SCOPE & CLOSURE – Explained in JavaScript
 * --------------------------------------------------------------------------------------------
 * ✅ 1) A **closure** is a function that remembers the variables from its lexical scope,
 *       even after the outer function has returned.
 *
 * ✅ 2) Closure variables live in the **heap**, not the stack, so they persist after the
 *       original call frame is gone.
 *
 * ✅ 3) “Lexical” means “based on code location” — the compiler determines what a function
 *       can access based on where it's **written**, not where it's **called** from.
 **********************************************************************************************/

/*---------------------------------------------------------------------------------------------
 * 🧠 EXAMPLE 1 – Pure Lexical Scope
 * ---------------------------------------------------------------------------------------------
 * `showVars` has access to `globalVar` and `outerVar` because of how the code is **nested**.
 * This is static, predictable, and resolved at compile time.
 */
const globalVar = '🌎 I am global';

function outer() {
    const outerVar = '👋 I am in outer()';

    function showVars() {
        // Accessing both global and outer variables thanks to lexical scope
        console.log(globalVar, '|', outerVar);
    }

    showVars(); // 🌎 I am global | 👋 I am in outer()
}

outer();


/*---------------------------------------------------------------------------------------------
 * 🔁 EXAMPLE 2 – Classic Closure 
 * ---------------------------------------------------------------------------------------------
 * After `makeCounter()` returns, its variable `count` would normally die...
 * BUT the returned function still needs it — so it's kept alive in the **heap**.
 */
function makeCounter(start = 0) {
    let count = start; // 👉 Moved to heap so it persists between calls

    return function () {
        // ✅ This inner function forms a closure over `count`
        return ++count;
    };
}

const counterA = makeCounter();
console.log(counterA());  // 1
console.log(counterA());  // 2

const counterB = makeCounter(10);
console.log(counterB());  // 11 (independent counter)
console.log(counterA());  // 3  (A still remembers its own count)


/*---------------------------------------------------------------------------------------------
 * ⚠️ EXAMPLE 3 – Loop Closure Pitfall (var vs let)
 * ---------------------------------------------------------------------------------------------
 * ❌ With `var`, all functions share the same loop variable in the heap
 * ✅ With `let`, a fresh variable is created each iteration (block scope)
 */

// Incorrect: using `var` leads to one shared closure
console.log('\n❌ var version (wrong):');
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var i =', i), 0);
}
// Output: var i = 3, 3, 3

// Correct: using `let` creates a new binding per loop iteration
console.log('\n✅ let version (correct):');
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let j =', j), 0);
}
// Output: let j = 0, 1, 2


/*---------------------------------------------------------------------------------------------
 * 🔍 WHY LEXICAL SCOPING MATTERS
 * ---------------------------------------------------------------------------------------------
 * ✔ Predictable: Variable access is based on **where** functions are defined, not called.
 * ✔ Private state: Closures enable encapsulation without exposing internals.
 * -------------------------------------------------------------------------------------------*/
