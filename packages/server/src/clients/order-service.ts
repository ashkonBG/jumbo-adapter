import {Client} from '@jumbo-supermarkten/vendors-clients-order-service';
import {inject, singleton} from 'tsyringe';
import {injectionTokens} from '../di/tokens.js';
import type {GetOrderOutput} from './order-service.types.js';

@singleton()
export class OrderService {
  constructor(
    @inject(injectionTokens.OrderServiceClient)
    private readonly client: Client,
  ) {}

  async getOrder(orderId: number): Promise<GetOrderOutput> {
    const {body} = await this.client.getOrder_1({
      pathParameters: {
        id: orderId,
      },
      queryParameters: {},
      body: undefined,
      headers: {},
    });

    return {
      orderId: body.orderId,
      customerId: body.customerId,
      items:
        body.items?.map((item) => ({
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
        })) ?? [],
      totals: {
        totalToPay: body.totals?.totalToPay,
      },
      delivery: {
        address: {
          street: body.delivery?.address?.street,
          houseNumber: body.delivery?.address?.houseNumber,
          addition: body.delivery?.address?.addition,
          postalCode: body.delivery?.address?.postalCode,
          city: body.delivery?.address?.city,
        },
        linkedSapId: body.delivery?.linkedSapId,
      },
    };
  }
}
