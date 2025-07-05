/********************************************************************************************
 * EXECUTION CONTEXT & CALL STACK (No Hoisting)
 * ------------------------------------------------------------------------------------------
 * JavaScript uses a single-threaded call stack to keep track of "where it is" in execution.
 * Each function call creates a new Execution Context pushed onto the stack.
 * When a function finishes, it’s popped off the stack.
 ********************************************************************************************/

function sayHello(name) {
    console.log('👋 Hello, ' + name);
}

function greetUser(userName) {
    console.log('Starting greetUser...');
    sayHello(userName);
    console.log('Finished greetUser.');
}

function main() {
    console.log('Program started.');
    greetUser('Alice');
    console.log('Program ended.');
}

main();

/********************************************************************************************
 * ▶️ Step-by-step Call Stack Simulation:
 *
 * When main() is called:
 * ┌────────────────────┐
 * │    main()          │  ← pushed
 * ├────────────────────┤
 * │    global()        │  ← base context
 * └────────────────────┘
 *
 * Inside main(), greetUser() is called:
 * ┌────────────────────┐
 * │  greetUser()       │  ← pushed
 * ├────────────────────┤
 * │  main()            │
 * ├────────────────────┤
 * │  global()          │
 * └────────────────────┘
 *
 * Inside greetUser(), sayHello() is called:
 * ┌────────────────────┐
 * │  sayHello()        │  ← pushed
 * ├────────────────────┤
 * │  greetUser()       │
 * ├────────────────────┤
 * │  main()            │
 * ├────────────────────┤
 * │  global()          │
 * └────────────────────┘
 *
 * As each function returns, it is popped off the stack in reverse order:
 * sayHello() → greetUser() → main() → back to global()
 ********************************************************************************************/
