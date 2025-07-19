// Object, object, {}, and Record in TypeScript
import { outside } from '../file';
// 1. Object type (with capital 'O')
// The 'Object' type represents any non-primitive type (not number, string, boolean, symbol, null, or undefined)
let obj1: Object = { a: 1 };
obj1 = [1, 2, 3]; // valid
obj1 = () => {}; // valid
obj1 = 42; // valid

// 2. object type (with lowercase 'o')
// The 'object' type is similar, but more restrictive: it does NOT allow assigning primitive values (number, string, boolean, symbol, null, undefined)
let obj2: object = { b: 2 };
obj2 = [4, 5, 6]; // valid
obj2 = function () {}; // valid
// obj2 = 42; // Error
// obj2 = null; // Error
// obj2 = undefined; // Error

// 3. {} type (empty object type)
// The '{}' type is similar to 'object', but also does not allow null or undefined
let obj3: {} = { c: 3 };
obj3 = [7, 8, 9]; // valid
obj3 = () => {}; // valid
// obj3 = null; // Error
// obj3 = undefined; // Error

console.log(outside);
