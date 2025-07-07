/*
📌 What is a Callback?

A callback is a function passed as an argument to another function,
to be "called back" later — either immediately or after an async task finishes.

🧠 Two Types of Callbacks:
- 🔄 Synchronous: Called immediately during the function execution.
- ⏳ Asynchronous: Called later, after an async operation completes.

Understanding the type helps with debugging, ordering, and handling side effects.
*/

// 🔄 Example: Synchronous Callback
function doMath(a, b, callback) {
    const result = a + b;
    callback(result); // Called immediately
}

doMath(2, 3, (sum) => {
    console.log("🔢 Sync Result:", sum); // Output: 🔢 Sync Result: 5
});

// ⏳ Example: Asynchronous Callback
function fetchData(callback) {
    setTimeout(() => {
        console.log("✅ Data fetched");
        callback(); // Called later (async)
    }, 1000);
}

fetchData(() => {
    console.log("📩 Now processing the data...");
});

/*
🧠 Async Output:
✅ Data fetched
📩 Now processing the data...

/*
😵 Callback Hell Example: Changing Body Background Color

When async tasks (like animations or transitions) depend on each other,
using nested callbacks can lead to deeply indented, hard-to-manage code.
This is known as "callback hell" or "pyramid of doom".
*/

console.log("🎨 Start changing background colors...");

setTimeout(() => {
    document.body.style.backgroundColor = "red";
    console.log("🔴 Step 1: Red");

    setTimeout(() => {
        document.body.style.backgroundColor = "orange";
        console.log("🟠 Step 2: Orange");

        setTimeout(() => {
            document.body.style.backgroundColor = "yellow";
            console.log("🟡 Step 3: Yellow");

            setTimeout(() => {
                document.body.style.backgroundColor = "green";
                console.log("🟢 Step 4: Green");

                setTimeout(() => {
                    document.body.style.backgroundColor = "blue";
                    console.log("🔵 Step 5: Blue");
                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);

}, 1000);

/*
🧠 Problems with Callback Hell:
- Deeply nested structure
- Hard to manage or scale
- Complicates error handling and control flow

✅ A better approach would be using Promises or async/await
to handle such sequences in a cleaner and more readable way.
*/
