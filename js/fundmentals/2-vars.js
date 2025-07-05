// === var: can be changed and re-declared ===
var name = 'Ali';
console.log('var name:', name); // Ali

var name = 'Sara'; // re-declared
console.log('var name after re-declare:', name); // Sara

// === let: can be changed, but NOT re-declared in same block ===
let age = 25;
console.log('let age:', age); // 25

age = 26; // ✅ update is allowed
console.log('let age after update:', age); // 26

// let age = 27; ❌ ERROR: Cannot re-declare 'age' in the same block

// === const: cannot be changed or re-declared ===
const country = 'Egypt';
console.log('const country:', country); // Egypt

// country = "Morocco"; ❌ ERROR: Assignment to constant variable

// const country = "Jordan"; ❌ ERROR: Identifier 'country' has already been declared
