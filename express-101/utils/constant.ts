export const MODULES_NAMES = {
  auth: 'AUTH',
  user: 'USER'
} as const;

export type ModuleNameType = (typeof MODULES_NAMES)[keyof typeof MODULES_NAMES];
