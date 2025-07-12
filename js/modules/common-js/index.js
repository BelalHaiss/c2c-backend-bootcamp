

// we should have entry point file that is the main file of the module
// in commonjs module syntax we use "module.exports" to export methods or props
// and "require" to import methods or props from other modules

// note about common js is synchronous  -> block the thread -> bad practice for web browser not natively supported in browser


const { subtract, add, multiple } = require('./math')


console.log(add(2, 3))
console.log(subtract(5, 2))
console.log(multiple(5, 2))

