// var vs let
//stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var

function varVsLetAndHoistingTest() {
  console.log("testting", i, j, funcs);
  // hello
  // bro
  let funcs = [];
  // let's create 3 functions
  for (let i = 0; i < 3; i++) {
    // and store them in funcs
    funcs[i] = function () {
      // each should log its value.
      console.log("My value: " + i);
    };
  }
  for (let j = 0; j < 3; j++) {
    // and now let's run each one to see
    funcs[j]();
  }

  for (let j = 0; j < 3; j++) {
    setTimeout(function () {
      console.log(j);
    }, 10000);
    console.log("outside timeout", j);
  }
  // above get compiled to following in ES5

  var _loop_1 = function (j) {
    setTimeout(function () {
      console.log(j);
    }, 10000);
    console.log("outside timeout", j);
  };

  for (var j = 0; j < 3; j++) {
    _loop_1(j);
  }
}

/**
 * var gets attached to window when used globally unlike let
 */
var windowedVar = 3; // can also be accessed via window.windowedVar
let scopedLet = 5;

/**
 * var can be reclared unlike let
 *
 */

function varVsLetRedeclarationTest() {
  var foo = "foo1";
  var foo = "foo2"; // No problem, 'foo' is replaced.

  let bar = "bar1";
  // let bar = "bar2"; // SyntaxError: Identifier 'bar' has already been declared

  console.log("foo", foo);

  console.log("bar", bar);
}

// varVsLetRedeclarationTest();

/**
 * function hoisting vs var hoisting
 *
 */

function functionalHoistingTest() {
  x();

  function x() {
    console.log("hello i'm x");
  }

  function x() {
    console.log("hello i'm new x");
  }
}
// functionalHoistingTest();

/**
 * https://www.geeksforgeeks.org/arrow-functions-in-javascript/
 * arrow functions vs conventional functions
 * arrow functions always receives this from the scope they are defined in
 * where as regular functions receives this from the object they were called from
 * other wise defaults to window object
 */

function arrowVsRegularFunctions() {
  const x1 = {
    y: "i am y inside x1",
    z: () => {
      console.log("in z, y is ", this.y);
    },
    z1: function () {
      console.log("in z1, y is ", this.y);
    },
  };

  x1.z();
  x1.z1();

  // above gets compiled into following in ES5
  //   var _this = this;
  //   var x1 = {
  //     y: 'i am y inside x1',
  //     z: function () {
  //       console.log('in z, y is ', _this.y);
  //     },
  //     z1: function () {
  //       console.log('in z1, y is ', this.y);
  //     },
  //   };
  //   x1.z();
  //   x1.z1();
}
// arrowVsRegularFunctions();

/**
 * Spread operator
 */

function spreadTest() {
  const arrSource = [1, 2, 3, { x: 4, y: [1, 2, 3] }];
  const arrtarget = [...arrSource, 4, 5];
  arrtarget[3].x = 5;
  console.log(arrSource);
  console.log(arrtarget);

  const objSource = { a: 1, y: [1, 2, 3] };
  const objtarget = { a: 4, b: 5, ...objSource };
  objtarget.y.push(5);
  console.log(objSource);
  console.log(objtarget);
}
//spreadTest();

/**
 * spread vs rest
 */

function spreadRestTest() {
  function x(...params) {
    console.log(params);
  }
  x(1, 2, 3);
  x(1);
}
// spreadRestTest();

/**
 * destructuring
 */

function destructuringTest() {
  const x = { a: 1, b: 2, c: { d: 3, y: { z: 1 } } };
  const {
    a,
    c: {
      d,
      y: { z },
    },
  } = x;
  console.log("a is", a);

  console.log("d is", d);

  console.log("z is", z);
  const arr = [1, [6, 7, 8], { a1: 8, a2: 10 }];
  const [len, [width], { a1: obj }] = arr;
  console.log(len, width, obj);
}
// destructuringTest();

/**
 * Closures
 */
function closuresTest() {
  function parent(p1, p2) {
    let v1 = "v1",
      v2 = "v2";
    function child() {
      return v1 + v2 + p1 + p2;
    }
    return child();
  }
  console.log(parent("p1", "p2"));
}
// closuresTest();

/**
 * higher order function
 */

function HOF_Test() {
  const sum = (x) => (y) => (z) => x + y + z;
  console.log(sum(1)(2)(3)); // 6;
}
// HOF_Test();
/**
 * Generator functions
 */

function generatorTest() {
  function* gen() {
    console.log("random");
    yield "hello";

    console.log("random");
    yield "world";
    yield "bye bye";
    yield "bye world";
    yield* ["a", "b", "c"];
  }
  const it = gen();
  for (const itItem of it) {
    console.log(itItem);
  }
}
// generatorTest();

function setsTest() {
  const obj = { a: 2 };
  const src = [1, obj, obj, 4, 4, 4, 5, 5, 1, 1, 1, 2];
  const s = new Set(src);
  s.add(1);
  console.log(s);
  s.delete(2);
  console.log(s.has(3));
  console.log(s.values());

  function* gen() {
    yield "hello";
    yield "world";
    yield "bye bye";
    yield "bye world";
    yield* ["a", "b", "c"];
  }
  const s2 = new Set(gen());
  console.log(s2.size);
}
// setsTest();
