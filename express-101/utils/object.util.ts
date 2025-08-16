import { isDeepStrictEqual } from 'util';

export declare type Nullable<T = unknown> = T | null | undefined;

export const nonNullableArray = <T>(arr: Nullable<T>[]): T[] =>
  arr.filter((item) => item !== null && item !== undefined) as T[];

export function extractFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const pickedObj: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
}

export function cleanObject<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Partial<T>;
}

export function removeFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const filteredObj: Partial<T> = structuredClone(obj);
  for (const key of keys) {
    delete filteredObj[key];
  }
  return filteredObj as Omit<T, K>;
}

export function addArrayItemIfNotIncluded<T>(
  array: T[],
  newItem: T,
  optionalFindFunction?: (_: T) => boolean
): T[] {
  // Check if the new item is already included in the array
  const itemExists = optionalFindFunction
    ? array.some(optionalFindFunction)
    : array.includes(newItem);

  // If the item doesn't exist, add it to the array
  if (!itemExists) {
    return [...array, newItem]; // Return a new array with the new item added
  }

  // If the item exists, return the original array
  return array;
}

export function sumOfArrayLengths(...arrays: unknown[][]): number {
  return arrays.reduce((acc, arr) => acc + arr.length, 0);
}

export function isArrayWithLength(array?: unknown[]): boolean {
  return Array.isArray(array) && array.length > 0;
}

export function arrayHasMatches(array1: string[], array2: string[]): boolean {
  return array1.some((item) => array2.includes(item));
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

function sortArraysDeep<T>(input: T): T {
  if (Array.isArray(input)) {
    const sortedArray = input.map(sortArraysDeep);

    // Sort primitives directly
    if (sortedArray.every((item) => isPrimitive(item))) {
      return [...(sortedArray as Primitive[])].sort() as T;
    }

    // Sort objects/arrays using JSON representation (fallback)
    return [...(sortedArray as object[])].sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    ) as T;
  }

  if (isObject(input)) {
    const result = {} as { [K in keyof T]: T[K] };
    for (const key of Object.keys(input) as (keyof T)[]) {
      result[key] = sortArraysDeep(input[key]);
    }
    return result;
  }

  return input;
}

function isPrimitive(value: unknown): value is Primitive {
  return typeof value !== 'object' || value === null;
}

function isObject<T>(value: T): value is Extract<T, object> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isEqualIgnoringArrayOrder<T>(a: T, b: T): boolean {
  return isDeepStrictEqual(sortArraysDeep(a), sortArraysDeep(b));
}
