import { Decimal } from 'generated/prisma/runtime/library';

// working with decimal
export class MoneyUtil {
  // get total
  static calculateTotalAmount(
    items: { price: Decimal; quantity: number }[],
  ): Decimal {
    return items.reduce((total, item) => {
      return total.add(item.price.mul(item.quantity));
    }, new Decimal(0));
  }
}
