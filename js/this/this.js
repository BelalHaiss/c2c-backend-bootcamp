// this = this object that is executing the current function // for normal functions not arrow functions

function logThis() {
    console.log("this inside logThis:", this);
} // global


// object with a method
const obj = {
    name: "object obj",
    logThis, // obj,
};

// ===============================================
// Example 1: Arrow Function - 'this' is Lexical
// ===============================================

// In arrow functions, 'this' is borrowed from the surrounding (lexical) context.
// It does NOT depend on how the function is called.
const userWithArrow = {
    name: "Belal",
    greet: function () {
        const arrowFn = () => {
            console.log("Arrow Function → this.name:", this.name); // ✅ Refers to 'userWithArrow' and its borrowed 'this' from the  'greet' method
        };
        arrowFn();
    }
};

userWithArrow.greet();



// ===================================================
// Example 2: Regular Function - 'this' is Dynamic
// ===================================================

// In regular functions, 'this' depends on how the function is called.
// If called without an object, 'this' becomes 'undefined' (in strict mode).

const userWithRegular = {
    name: "Belal",
    greet: function () {
        function regularFn() {
            console.log("Regular Function → this.name:", this.name); // ❌ Likely 'undefined'
        }
        regularFn();
    }
};

userWithRegular.greet(); // Output: Regular Function → this.name: undefined


// this inside random function inside object method
const objWithRandom = {
    arr: ["a", "b", "c"],
    logThis() {
        console.log("this inside logThis:", this);
        this.arr.forEach(function (item) {
            console.log("item:", item, "this inside forEach:", this);
        }); // `this` is the global object or undefined in strict mode
    },
}




// new keyword  creates a new object and sets `this` to that new object

function Person(name) {
    this.name = name;
    this.arr = [1, 2, 3]
    this.logThis = function () {
        console.log("this inside Person:", this);
        this.arr.forEach((item) => {
            console.log("item:", item, "this inside forEach:", this);
        });
    }; // bind `this` to the new object
}

const person = new Person("Belal");



// bind - call - apply
function showThis(args) {
    console.log("this inside showThis:", this, "args:", args);
}
const objForBind = {
    name: "object for bind",
};
const boundShowThis = showThis.bind(objForBind); // bind `this` to objForBind
boundShowThis();
showThis.call(objForBind, 30, "USA");
showThis.apply(objForBind, [1, 2, 3]);