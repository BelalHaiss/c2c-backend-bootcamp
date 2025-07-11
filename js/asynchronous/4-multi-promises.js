// 📁 promise-examples.js

// -----------------------------------------
// ✅ PROMISE.ALL — OVERVIEW
// -----------------------------------------
// Takes an iterable (like an array of promises)
// Returns a promise that:
// - Resolves with an array of results (same order)
// - Rejects if ANY promise rejects
// - Runs all promises concurrently

const promise1 = Promise.resolve("🍎 Apple");
const promise2 = new Promise((resolve) => setTimeout(() => resolve("🍌 Banana"), 1000));
const promise3 = Promise.resolve("🍇 Grape");

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log("✅ Promise.all resolved:", results);
        // Output: ["🍎 Apple", "🍌 Banana", "🍇 Grape"] — same order as input
    })
    .catch((err) => {
        console.error("❌ Promise.all rejected:", err);
    });

// ❌ Example: One promise rejects → whole Promise.all fails
const badPromise = Promise.reject("💥 Failed!");

Promise.all([promise1, badPromise, promise3])
    .then((results) => {
        // Will not run
    })
    .catch((err) => {
        console.error("❌ Promise.all rejected due to:", err); // 💥 Failed!
    });


// Is Promise.all CONCURRENCY OR PARALLISM

function asyncTask(name, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✅ ${name} finished after ${delay}ms`);
            resolve(name);
        }, delay);
    });
}

console.time("⏱ Total Time");

const task1 = asyncTask("Task 1", 2000);
const task2 = asyncTask("Task 2", 3000);
const task3 = asyncTask("Task 3", 1000);

Promise.all([task1, task2, task3]).then((results) => {
    console.log("🎉 All tasks done:", results);
    console.timeEnd("⏱ Total Time");
});






// -----------------------------------------
// ⏱️ PROMISE.ALL — CONCURRENCY EXAMPLE
// -----------------------------------------
// Simulate concurrent execution using setTimeout
// Each promise takes a different time but starts at the same moment

function asyncTaskWithHeavyCPU(name, iterations) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.time(name);
            let sum = 0;
            for (let i = 0; i < iterations; i++) {
                sum += Math.sqrt(i);
            }
            console.timeEnd(name);
            resolve(sum);
        }, 0); // defers the work to next tick
    });
}

console.time("Total");

Promise.all([
    asyncTaskWithHeavyCPU("Task A", 10_000_000),
    asyncTaskWithHeavyCPU("Task B", 10_000_000),
    asyncTaskWithHeavyCPU("Task C", 10_000_000),
]).then((results) => {
    console.log("All tasks completed:", results)
    console.timeEnd("Total");
});
// -----------------------------------------
// ✅ PROMISE.ALLSETTLED — OVERVIEW
// -----------------------------------------
// Takes an iterable (like an array of promises)
// Returns a promise that:
// - Always resolves
// - Each item is an object with status and value/reason
// - Order is preserved

const settledPromise1 = Promise.resolve("✅ Success 1");
const settledPromise2 = Promise.reject("❌ Error 2");
const settledPromise3 = new Promise((resolve) => setTimeout(() => resolve("✅ Success 3"), 500));

Promise.allSettled([settledPromise1, settledPromise2, settledPromise3])
    .then((results) => {
        console.log("🧾 Promise.allSettled results:");
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`✅ Promise ${index + 1}:`, result.value);
            } else {
                console.log(`❌ Promise ${index + 1} failed with:`, result.reason);
            }
        });
    });

// -----------------------------------------
// 📌 WHEN TO USE EACH
// -----------------------------------------

// ✅ Use Promise.all when:
// - All tasks must succeed
// - You want fast failure if any fail
// - Example: Loading multiple APIs and only continue if all succeed

// ✅ Use Promise.allSettled when:
// - You want to wait for all results, success or failure
// - Useful for logging, retrying, or reporting which ones failed
// - Example: Sending notifications to many users — some may fail, but continue with the rest
