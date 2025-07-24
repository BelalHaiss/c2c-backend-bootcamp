//1 any : disables type checking ( unsafe , avoid it )

let x: any = 50;
x = 'string';
x = () => {};
x.toFixed(); // will throw runtime error

// 2 unknown : safer version of any  - you must narrow it first with type guard
let y: unknown = 'word';
if (typeof y === 'string') {
  y.trim();
}

// 3 never : represents a value that never occurs // you must annotate it

// with return

function throwError(): never {
  throw new Error('error thrown');
  console.log('you won`t see me');
}
if (true) {
} else {
  //  this will never be executed
  console.log('never see me');
}
function infiniteLoop(): never {
  while (true) {
    // logic
  }
}
// {
//   throwError();
//   infiniteLoop();
//   console.log('i will never run');
// }

// 4 keyof: get all property names of a type as a union

type User = { id: number; name: string; createdAt: Date };

type UserKeys = keyof User;
type UserKeysValue = User[keyof User];

// 5 typeof: in type alias get the js type  // if used in side js block scope will get the native typeof js

const obj = {
  name: 'belal',
  age: 28
} as const;

type ObjectType = typeof obj;

function handleTypeArg(arg: Object) {}

// 6 as: type assertion (force ts to treat value as a certain type)

let z: unknown = 'word';

(z as string).length;

// abstract parent class
// you access children abstract method or prop -> as keyword
