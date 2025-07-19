/*
 * WHEN TO USE INTERFACES:
 * - When defining object shapes that might be extended
 * - For API contracts and public interfaces
 * - When you need declaration merging
 * - For object-oriented programming patterns
 *
 * WHEN TO USE TYPE ALIASES: // more general and you will use it a lots
 * - For unions, primitives, and complex types
 * - When you need computed properties or mapped types
 * - For functional programming patterns
 * - When creating utility types
 * - ✅ More flexible than interfaces
 */

interface UserInterface {
  id: number;
  name: string;
  email: string;
  isActive?: boolean | null | undefined;
  changeEmail: (newEmail: string) => void;
}

interface AdminUser extends UserInterface {
  role: 'ADMIN';
}

const user1: UserInterface = {
  id: 2,
  name: 'ahmed',
  email: 'ahmed@gmail.com',
  changeEmail: (newEmail) => {}
};

class UserCreator implements UserInterface {
  constructor(
    public id: UserInterface['id'],
    public name: UserInterface['name'],
    public email: UserInterface['email'],
    public isActive: UserInterface['isActive']
  ) {}

  changeEmail(newEmail: string) {}
  changeMyName(newName: string) {}
}

const user2 = new UserCreator(1, 'ahmed', 'ahmed@gmail.com', null);

// function signature ==> function with typed args && returned types

interface SearchUserInterface {
  (name: string): UserInterface;
}

const searchUserByName: SearchUserInterface = (name: string) => {
  return user1;
};

// with type Aliases

type UserType = {
  id: number;
  name: string;
  email: string;
  isActive?: boolean | null | undefined;
  changeEmail: (newEmail: string) => void;
};

type AdminUserType = UserInterface & {
  role: 'ADMIN';
};

const userWithType: UserType = {
  id: 2,
  name: 'ahmed',
  email: 'ahmed@gmail.com',
  changeEmail: (newEmail) => {}
};

class UserCreatorWithType implements UserType {
  constructor(
    public id: UserInterface['id'],
    public name: UserInterface['name'],
    public email: UserInterface['email'],
    public isActive: UserInterface['isActive']
  ) {}

  changeEmail(newEmail: string) {}
  changeMyName(newName: string) {}
}

const user2WithType = new UserCreatorWithType(
  1,
  'ahmed',
  'ahmed@gmail.com',
  null
);

// function signature ==> function with typed args && returned types

type SearchUserInterfaceWithType = (name: string) => UserInterface;

const searchUserByNameWithType: SearchUserInterfaceWithType = (
  name: string
) => {
  return user1;
};

type ArrOfString = Array<String>;

const stringArr: ArrOfString = ['a', 'b'];

// type with union
type UnionTypeExample = '1' | '2';
// Discriminated union example with type (not possible with interface)
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; error: string };
type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

type UserPartial = Partial<UserInterface>;
