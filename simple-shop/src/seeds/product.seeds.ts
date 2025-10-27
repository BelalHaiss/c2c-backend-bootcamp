import { Product } from 'generated/prisma';
import { faker } from '@faker-js/faker';
export const generateProductSeed = (merchantId: bigint) => {
  const seededProduct: Omit<
    Product,
    'id' | 'createdAt' | 'updatedAt' | 'price'
  > & { price: number } = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
    price: faker.number.int({ min: 100, max: 10000 }),
    merchantId,
  };
  return seededProduct;
};
