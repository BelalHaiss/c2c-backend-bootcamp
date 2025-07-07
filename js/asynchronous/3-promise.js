/*
🔹 1. WHAT IS A PROMISE?

A Promise is a built-in JavaScript object that represents a value that may be:
- available now,
- available later,
- or never available (if an error occurs).

It's used to handle asynchronous operations like API calls, timers, etc.
*/

// Example: Promise that resolves after 1 second
const asyncTask = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("✅ Task completed!");
    }, 1000);
});



/*
🔹 2. PROMISE AS CREATOR AND AS SUBSCRIBER

📌 Creator: The code that creates the Promise using `new Promise(...)`
📌 Subscriber: The code that uses `.then()`, `.catch()`, or `await` to "listen" to the result

Below:
- We are the **creator** of the Promise `asyncTask`.
- We are also the **subscriber**, using `.then()` to get its value.
*/

asyncTask.then((value) => {
    console.log("Subscriber received:", value); // 👉 ✅ Task completed!
});



/*
🔹 3. PROMISE STATUS

A promise has 3 states:
- PENDING: Initial state, not yet settled. when we not invoke resolve or reject
- FULFILLED: Operation completed successfully (calls `resolve`)
- REJECTED: Operation failed (calls `reject`)
*/

// Let's create a REJECTED promise using reject()
const failedTask1 = new Promise((resolve, reject) => {
    reject("❌ Rejected manually");
});

failedTask1.catch((error) => {
    console.log("Handled error 1:", error); // 👉 ❌ Rejected manually
});

// OR: We can also THROW an error — same result!
const failedTask2 = new Promise((resolve, reject) => {
    throw new Error("🔥 Thrown error");
});

failedTask2.catch((error) => {
    console.log("Handled error 2:", error.message); // 👉 🔥 Thrown error
});


/*
🔹 4. PROMISE IS CHAINABLE
a
Each `.then()` returns a **new promise**, which allows chining transformations step-by-step.
*/

Promise.resolve(2)
    .then((num) => {
        console.log("Step 1:", num);       // 👉 Step 1: 2
        return num * 3;
    })
    .then((result) => {
        console.log("Step 2:", result);    // 👉 Step 2: 6
        return result + 4;
    })
    .then((finalResult) => {
        console.log("Final Result:", finalResult); // 👉 Final Result: 10
    });



/*
🔹 5. .then() .catch() .finally()

- `.then()` handles successful resolution
- `.catch()` handles errors
- `.finally()` always runs no matter what, useful for cleanup
*/

Promise.resolve("🟢 All good")
    .then((res) => {
        console.log("Then:", res); // 👉 Then: 🟢 All good
        return res;
    })
    .catch((err) => {
        console.error("Catch:", err); // ❌ This won't run
    })
    .finally(() => {
        console.log("Cleanup done"); // 👉 Always runs
    });

Promise.reject("🔴 Something failed")
    .then((res) => {
        console.log("Then:", res); // ❌ Won’t run
    })
    .catch((err) => {
        console.error("Catch:", err); // 👉 Catch: 🔴 Something failed
    })
    .finally(() => {
        console.log("Cleanup done"); // 👉 Always runs
    });



/*
🔹 6. ASSIGNING A PROMISE TO A VARIABLE DOESN’T GIVE THE VALUE

Even if the Promise is resolved, assigning it to a variable gives you the Promise object,
NOT the result.

You must use `await` or `.then()` to extract the actual value.
*/

const myPromise = Promise.resolve("🎁 Value");

// ❌ This is just the promise object
console.log("Direct access:", myPromise); // 👉 Promise { '🎁 Value' }

// ✅ Use then() to get the value
myPromise.then((value) => {
    console.log("Extracted with then:", value); // 👉 🎁 Value
});
