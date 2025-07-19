/*
 *
 * WHEN TO USE ENUMS:
 * - When you have a fixed set of related constants
 * - When you need reverse mapping (numeric enums)
 * - For API status codes or error codes
 * - When you want to group related values
 * - Cons of Enums you must use the same enum object
 *
 * WHEN TO USE UNIONS:
 * - When you have a set of literal values
 * - When you need strict type checking
 * - For discriminated unions
 */

// numeric enums

enum OrderStatus {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELLED
}

enum HTTP_STATUS_CODE {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401
}

// text based enum
enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

// Union
export type ThemeModes = `${Mode}`;

// String literal union
type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';

// Numeric literal union
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// Mixed literal union
type Size = 'small' | 'medium' | 'large' | number;

// Complex union types
type IDUnion = string | number;
type SerializableValue = string | number | boolean | null | undefined;

// DISCRIMINATED UNIONS // <3

// native example  PromiseSettledResult

type ApiResponse =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; errorMessage: string };

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };
