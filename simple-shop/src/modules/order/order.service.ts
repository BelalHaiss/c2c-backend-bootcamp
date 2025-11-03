import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateOrderDTO } from './types/order.dto';
import { DatabaseService } from '../database/database.service';
import { MoneyUtil } from 'src/utils/money.util';
import { Prisma, Product } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

@Injectable()
export class OrderService {
  constructor(private readonly primsaService: DatabaseService) {}
  async create(createOrderDto: CreateOrderDTO, userId: number | bigint) {
    // MISSING order total
    // missing product price

    const productIds = createOrderDto.map((item) => item.productId);
    // get products
    const products = await this.primsaService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        isDeleted: false,
      },
    });
    // validate all products exist like dto product ids
    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products are invalid');
    }

    const orderProductsData = this.mapProductDtoToOrderProducts(
      createOrderDto,
      products,
    );

    const orderTotalPrice = MoneyUtil.calculateTotalAmount(
      orderProductsData.map((orderPrdouct) => ({
        price: orderPrdouct.pricePerItem as Decimal,
        quantity: orderPrdouct.totalQty,
      })),
    );

    // create order included created data (transaction , product)
    const createdOrder = await this.primsaService.order.create({
      data: {
        orderProducts: {
          createMany: { data: orderProductsData },
        },
        transactions: {
          create: { amount: orderTotalPrice, type: 'DEBIT', userId },
        },
        userId: BigInt(userId),
        orderStatus: 'PENDING',
      },
      include: {
        orderProducts: { include: { product: true } },
        transactions: true,
        orderReturns: {
          include: { returnedItems: { include: { product: true } } },
        },
      },
    });

    return createdOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  // helper methods

  private mapProductDtoToOrderProducts(
    createOrderDTO: CreateOrderDTO,
    products: Product[],
  ): Prisma.OrderProductCreateManyOrderInput[] {
    return createOrderDTO.map((item) => {
      const product = products.find(
        (p) => BigInt(p.id) === BigInt(item.productId),
      )!;
      return {
        productId: product.id,
        totalQty: item.qty,
        pricePerItem: product.price,
      };
    });
  }
}
