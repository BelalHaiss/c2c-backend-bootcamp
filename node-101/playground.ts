const { createHmac } = require('node:crypto');

const secret = 'abcdefg';

const dynamicValue = '123456';

export const hash = createHmac('sha256', secret)
  .update(dynamicValue)
  .digest('hex');

const verifyHash = (dynamicValue: string, storedHashOnDb: string) => {
  const hash = createHmac('sha256', secret).update(dynamicValue).digest('hex');
  return hash === storedHashOnDb;
};
const hashWithSalt = hash + Math.random() * 1e9;
console.log(hashWithSalt);
console.log(1e2, '1e2');

console.log(hash.length, 'hash length');

const revereHashing = (hash: string): string => hash;
revereHashing(
  'b2cf7838a1745b61eb82b18dcd42c1211f8edcc0dc98f8535023c1084bb73409'
);
