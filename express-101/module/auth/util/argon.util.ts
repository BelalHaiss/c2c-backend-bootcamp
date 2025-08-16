import argon2 from 'argon2';

export const createArgonHash = (textValue: string) => {
  return argon2.hash(textValue);
};

export const verifyArgonHash = (textValue: string, hashedValue: string) => {
  return argon2.verify(hashedValue, textValue);
};
