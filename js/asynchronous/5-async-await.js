// 📁 async-function-example.js

/**
 * ✅ What is an async function?
 * -----------------------------
 * - An async function always returns a Promise.
 * - If you return a value (like 1), JavaScript automatically wraps it in Promise.resolve(value).
 * - This makes async functions useful for writing cleaner asynchronous code using `await`.
 */

// ✅ Example 1: async function automatically returns a promise
async function fooAsync() {
    return 1; // JavaScript treats this as: return Promise.resolve(1);
}

// ✅ Example 2: manual version using Promise.resolve
function fooManual() {
    return Promise.resolve(1);
}

// ✅ Calling both functions
fooAsync().then((value) => console.log("fooAsync result:", value));   // → 1
fooManual().then((value) => console.log("fooManual result:", value)); // → 1

// ✅ Both return a Promise
console.log("fooAsync is Promise:", fooAsync() instanceof Promise);   // true
console.log("fooManual is Promise:", fooManual() instanceof Promise); // true


/**

 * ✅ What is the `await` keyword ?
 * ------------------------------
 * - `await` is used to pause execution inside an async function until a Promise resolves.
 * - It gives you the resolved(fulfilled) value of the Promise.
 */

// ✅ Example: using await inside an async function
async function fetchUserName() {
    console.log("⏳ Fetching name...");

    const name = await getName(); // Waits here until the promise resolves

    console.log("✅ Got name:", name);
    return name;
}

// Simulated async operation (like a server call)
function getName() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Belal"), 1000);
    });
}

// Call the async function
fetchUserName();

// Other code continues executing without being blocked
console.log("🚀 This runs while waiting for the name...");



// Cleaner code example using async/await to change background colors step by step
// 📦 Helper: returns a promise that resolves after a delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ✅ Async function to run color steps in order
async function changeColors() {
    await delay(1000);
    document.body.style.backgroundColor = "red";
    console.log("🔴 Step 1: Red");

    await delay(1000);
    document.body.style.backgroundColor = "orange";
    console.log("🟠 Step 2: Orange");

    await delay(1000);
    document.body.style.backgroundColor = "yellow";
    console.log("🟡 Step 3: Yellow");

    await delay(1000);
    document.body.style.backgroundColor = "green";
    console.log("🟢 Step 4: Green");

    await delay(1000);
    document.body.style.backgroundColor = "blue";
    console.log("🔵 Step 5: Blue");
}

// 🏁 Run it
changeColors();



/**
 Full async error handling with try, catch, and finally
------------------------------------------------
 * - `try` runs the code that might throw an error
    * - `catch` handles any thrown error
        * - `finally` always runs — useful for cleanup
            */

async function doTask(step) {
    if (step === "fail") {
        throw new Error("Step failed: " + step);
    }
    return `Completed ${step}`;
}

async function fullFlow() {
    try {
        const result1 = await doTask("step 1");
        console.log("✅", result1);

        const result2 = await doTask("fail"); // This throws
        console.log("✅", result2); // Skipped
    } catch (err) {
        console.error("❌ Error caught:", err.message);
    } finally {
        console.log("🧹 Finished try/catch block — cleaning up");
    }

    console.log("🚀 Continue after try/catch/finally");
}

fullFlow();


/**
 * ✅ Example 2: return await vs await
 * -----------------------------------
 * Both await the promise, but `return await` unwraps the value before returning
 * Useful when you want proper error handling in a try/catch block
 */

async function returnAwait() {
    try {
        return await doTask("step 2"); // error caught here if thrown
    } catch (err) {
        console.error("❌ Error in returnAwait:", err.message);
        return "fallback value";
    }
}

async function returnDirect() {
    // Without try/catch — if this throws, the caller must handle it
    return doTask("fail");
}

// Run both to compare behavior
returnAwait().then((res) => console.log("returnAwait result:", res));

returnDirect()
    .then((res) => console.log("returnDirect result:", res))
    .catch((err) => console.error("❌ Unhandled in returnDirect:", err.message));

/**
 * Summary:
 * - Use `try/catch/finally` for clean async error handling and cleanup
 * - Use `return await` if you want to catch errors inside the same function
 * - Without `await`, errors bubble to the caller
 */
