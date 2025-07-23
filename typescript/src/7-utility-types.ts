// utility types

type Person = {
  name: string;
  age: number;
  readonly createdAt: Date;
};

const person1: Person = {
  age: 20,
  name: 'Ahmed',
  createdAt: new Date()
};

const updatePerson = (payload: Partial<Person>) => {
  // logic
};

type PartialPerson = Partial<Person>;

// Required

type RequiredPerson = Required<Person>;

// Readonly
type ReadonlyPerson = Readonly<Person>;

// Record

type PersonInfo = Record<number, string>;

const personInfo1: PersonInfo = {
  2: '2'
};

type CatName = 'miffy' | 'boris' | 'mordred';

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};

// Pick

type BasePersonInfo = Pick<Person, 'age' | 'name'>;

// Omit
type BasePersonInfoWithOmit = Omit<Person, 'createdAt'>;

// exclude // works with union
type PrimitiveType = string | number | boolean;

type StringOrNumber = Exclude<PrimitiveType, boolean>;

// extract // use it with union
type MyBoolean = Extract<PrimitiveType, boolean>;

function getUserName() {
  return 'ahmed';
}

type GetUserNameType = () => string;
type The_Return_Of_User_Name = ReturnType<typeof getUserName>; // or you can use the GetUserNameType if you already declared

// Parameters

function add(a: number, b: number) {
  return a + b;
}
type AddParams = Parameters<typeof add>;
