/*
 * WHAT IS `as const`?
 *
 * - Tells TypeScript to infer the most narrow (literal) type possible.
 * - Makes values readonly (deeply) for arrays and objects.
 * - Useful for literal types, and switch-case patterns.
 */

const arr = [1, 2, 3] as const;

const Roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const;

type Role = (typeof Roles)[keyof typeof Roles];

const strictConfig = {
  appName: 'MyAppName',
  version: 2
} as const;
