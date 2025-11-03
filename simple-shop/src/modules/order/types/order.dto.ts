import { Prisma } from 'generated/prisma';

export type CreateOrderDTO = { productId: number; qty: number }[];

export type OrderResponseDTO = Prisma.OrderGetPayload<{
  include: {
    orderProducts: { include: { product: true } };
    transactions: true;
    orderReturns: {
      include: { returnedItems: { include: { product: true } } };
    };
  };
}>;
