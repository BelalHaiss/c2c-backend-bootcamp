/*
 *
 * WHEN TO USE GENERICS:
 * - When you want to create reusable components/functions
 * - When you need type safety with flexible types
 * - For utility functions that work with multiple types
 * - When building data structures (arrays, maps, etc.)
 * - For API clients and database layers
 * - When creating higher-order functions
 *
 * 📌 Think of generics like "type parameters" — you define *what kind* of data it works with *later*.
 */

//  Generic Sign <T>

function identity<T>(arg: T): T {
  return arg;
}
const numberResult = identity(42); // Type: number
const stringResult = identity('hello'); // Type: string
const objectResult = identity({ name: 'John' }); // Type: { name: string }
const nullResult = identity(null); // Type: { name: string }

// how to make generic share some of types // limited

function limitIdentity<T extends string | number>(arg: T): T {
  return arg;
}

// Native Array using Generic

interface DbEntity {
  id: number;
}

// generic base repository that and module repository can implement

// get => Enity[] & getByQuery => entity  & createNewEntity (payload)  & updateEntity (Partial<entity>)  & deleteById(id:number)
// user repository
// product repository
//  setting repository

interface Repository<Type extends DbEntity> {
  findAll(): Type[];
  findById(id: Type['id']): Type | null;
  createItem(payload: Type): void;
  updateItem(payload: Partial<Type>): void;
  deleteById(id: Type['id']): void;
}

class BaseRepository<T extends DbEntity> implements Repository<T> {
  private items: T[] = [];

  findAll(): T[] {
    return this.items;
  }
  createItem(payload: T): void {
    console.log(payload);
  }
  updateItem(payload: Partial<T>): void {
    console.log(payload);
  }
  findById(id: T['id']) {
    const item = this.items.find((item) => item.id === id);
    return item ? item : null;
  }
  deleteById(id: T['id']) {
    console.log('delete id:', id);
  }
}

type UserType = {
  name: string;
  email: string;
  age: number;
  id: number;
};

class UserRepository extends BaseRepository<UserType> {
  constructor() {
    super();
  }
}

const userRepository = new UserRepository();

userRepository.updateItem({
  email: 'ahmed@gmail.com'
});

type ProductEntity = {
  name: string;
  id: number;
};
class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super();
  }
}

const productRepository = new ProductRepository();

productRepository.createItem({
  name: 'fancy item',
  id: 2
});
