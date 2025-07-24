type StringOrNumber = string | number;

const test: StringOrNumber = '2';

// built in type guards with typeof
function processValue(val: StringOrNumber) {
  const isString = typeof val === 'string';
  if (isString) {
    val.length; // i can access any string method
  } else {
    val.toFixed(); // i can access any number method
  }
}

class CustomError extends Error {
  // additional properties
  public statusCode: number;
  public createdAt: Date;
  constructor(message: string, statusCode: number, createdAt: Date) {
    super(message);
    this.statusCode = statusCode;
    this.createdAt = createdAt;
  }
}
type CustomErrorType = InstanceType<typeof CustomError>;
// built in type guards with instanceof

function handleError(error: unknown) {
  if (error instanceof CustomError) {
    console.error(
      `custom error is thrown with message:${error.message} and statusCode: ${error.statusCode} createdAt:${error.createdAt}`
    );
  } else {
    console.error(`unknown error is thrown error ${error}`);
  }

  //   log  for google logs
}

// custom type guard

// User With Different roles -> Coach - Learner - Admin

// Base Interface that share shared props
// extend the base interface for each custom Role and props

interface BaseUser {
  name: string;
  age: number;
  createdAt: Date;
  email: string;
  //   role: "COACH" | "LEARNER" | "ADMIN"
}

interface Coach extends BaseUser {
  role: 'COACH';
  coursesCount: number;
}

interface Learner extends BaseUser {
  role: 'LEARNER';
  enrolledCoursesCount: number;
}

interface Admin extends BaseUser {
  role: 'Admin';
  accessLevel: number;
}

type User = Admin | Learner | Coach;

// getUserById =>

function handleUser(user: User) {
  // 4 scenario based on discriminated unions
  // if admin -> run some logic

  const coachUser = user as Coach; // not safety please use type guard

  if (isAdmin(user)) {
    user.accessLevel;
  }
  // if learner -> run some logic
  else if (isLearner(user)) {
    user.enrolledCoursesCount;
  }
  // if coach -> run some logic
  else if (isCoach(user)) {
    user.coursesCount;
  }
}

// custom guard  -> Admin | Learner | Coach
// Custom Guard Syntax = function [name] (unionValue:UnionType) unionValue is [singleType of UnionType]
//  you should check multiple fields for safety
// cons of types guards its handled totally by you and you can write wrong logic which lead to wrong validation
function isAdmin(user: User): user is Admin {
  //   logic
  return user.role === 'Admin' && 'accessLevel' in user;
}

function isLearner(user: User): user is Learner {
  //   logic
  return user.role === 'LEARNER' && 'enrolledCoursesCount' in user;
}

function isCoach(user: User): user is Coach {
  //   logic
  return user.role === 'COACH' && 'coursesCount' in user;
}
