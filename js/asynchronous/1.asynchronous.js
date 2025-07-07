/*
🧠 1. What is Asynchronous (async)?

🔍 Definition:
"Asynchronous" means that a task can begin now and complete later,
allowing the rest of the code to keep running in the meantime.

💡 Why it matters:
- JavaScript is single-threaded (one task at a time).
- Async operations (like network calls or timers) prevent the app from freezing.
- This keeps the program efficient


// In browsers: async runs using Web APIs, event loop, and task queues.
// In Node.js: async uses libuv + event loop to handle I/O and timers efficiently.


Real-life examples of async:
- Making a network request (API call)
- Reading a file
- Waiting for a user action or timeout
*/

// So the evolution was:
// Callbacks → Promises(2015) → async / await(2017).


