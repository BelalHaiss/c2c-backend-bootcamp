// mapped type used when i need to define dynamic key and value

// record of utility type

export type DocumentData = {
  [field: string]: number | boolean | string;
};

const documentExample: DocumentData = {
  name: 'ahmed',
  age: 20
};

type ReturnTypeAsItIS<T> = {
  // key  && value
  // key should be restricted and make sure its the keys of the generic T
  //  keyof T  =>  name | age | createdAt
  // make sure the value of the key represent the same type as it passed in the generic
  [P in keyof T]: T[P];
  //   [P in keyof T]: T[keyof T]; // type of name | age | createdAt
};

type User = {
  name: string;
  age: number;
  createdAt?: Date;

  2: number;
};
type userLightObject = Pick<User, 'name'>;

type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: (value: T) => T[K];
};

type PickGetters<T, K extends keyof T> = {
  [P in `get${Capitalize<K & string>}`]: (value: T) => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<K & string>}`]: (value: T[K]) => void;
};

type UserGetters = Getters<User>;
type UserSetters = Setters<User>;
