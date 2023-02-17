import {inject, singleton} from 'tsyringe';
import type {PostOrderTypes} from 'gorillas-partner-platform-client';
import {Client as GorillasPartnerPlatformClient} from 'gorillas-partner-platform-client';
import {StatusCodes} from 'http-status-codes';
import {injectionTokens} from '../di/tokens.js';
import {ContextAwareLogger} from '../log/context-aware-logger.js';
import type {ValidateAddressEligibilityTypes} from '../types/index.js';
import {OrderService} from '../clients/order-service.js';
import {CustomerService} from '../clients/customer-service.js';
import type {GetOrderOutput} from '../clients/order-service.types.js';
import type {GetCustomerOutput} from '../clients/customer-service.types.js';
import {GPP_CREATE_FULFILLMENT_ORDER_EMAIL} from '../constants.js';
import type {RequestContext} from '../log/request-context.js';
import type {
  GorillasServiceCreateOrderInput,
  PostGeoCheckResponseBody,
} from './gorillas-service.types.js';
import {StoreService} from './store-service.js';
import {ProductMapper} from './product-mapper.js';

const TEMPORARILY_HARDCODED_STORE = 75;

@singleton()
export class GorillasService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly productMapper: ProductMapper,
    private readonly storeService: StoreService,
    @inject(injectionTokens.GorillasPartnerPlatformClient)
    private readonly gorillasClient: GorillasPartnerPlatformClient,
    @inject(injectionTokens.RequestAwareLogger)
    private readonly logger: ContextAwareLogger<RequestContext>,
  ) {}

  async createFulfillmentOrder(input: GorillasServiceCreateOrderInput) {
    const order = await this.orderService.getOrder(input.orderId);
    const customer = await this.customerService.getCustomer(order.customerId!);

    const result = await this.gorillasClient.postOrder({
      pathParameters: {},
      queryParameters: {},
      body: await this.buildPostOrderRequestBody(customer, order),
      headers: {},
    });

    this.logger.debug(result, 'GPP:postOrder response');
  }

  /**
   * Validate if an order is eligible for delivery by Gorillas
   */
  async validateOrderEligibility(/* input to be defined */) {
    throw new Error('Yet to be defined');
  }

  /**
   * Validate if an address is eligible for delivery by Gorillas
   */
  async validateAddressEligibility(
    input: ValidateAddressEligibilityTypes.RequestBody['application/json'],
  ): Promise<ValidateAddressEligibilityTypes.ResponseBody> {
    const address = {
      ...input.address,
      countryCode: 'NL',
    };
    const result = await this.gorillasClient.postGeocheck({
      pathParameters: {},
      queryParameters: {},
      body: {
        address: {
          streetName: address.streetName,
          streetNumber: address.streetNumber,
          postalCode: address.postalCode,
          city: address.city,
          countryCode: address.countryCode,
        },
      },
      headers: {},
    });

    if (!result.body.error) {
      const body = result.body as PostGeoCheckResponseBody;

      const nearestStoreId = await this.storeService.getNearestStore(
        address.postalCode ?? '',
      );

      const deliveryEta = body.deliveryEta
        ? Number(body.deliveryEta)
        : undefined;
      return {
        isEligible: true,
        deliveryEta,
        quickCommerceWarehouseId: result.body.storeId?.toString(),
        storeId: nearestStoreId,
        storeOpen: body.storeOpen,
      };
    }

    return {
      isEligible: false,
      error: {
        message:
          'Quick commerce fulfillment is currently not possible outside of Eindhoven',
      },
    };
  }

  private async buildPostOrderRequestBody(
    customer: GetCustomerOutput,
    order: GetOrderOutput,
  ): Promise<PostOrderTypes.RequestBody[keyof PostOrderTypes.RequestBody]> {
    const items = await this.mapOrderItems(order.items);

    const houseNumber = order.delivery.address.addition
      ? `${order.delivery.address?.houseNumber ?? ''} ${
          order.delivery.address?.addition ?? ''
        }`
      : order.delivery.address.houseNumber;

    return {
      partnerOrderId: order.orderId?.toString(),
      storeId: TEMPORARILY_HARDCODED_STORE,
      customer: {
        firstName: customer.firstName,
        lastName: customer.middleName
          ? `${customer.middleName} ${customer.lastName ?? ''}`
          : customer.lastName,
        phone: customer.phoneNumber,
        email: GPP_CREATE_FULFILLMENT_ORDER_EMAIL,
      },
      items,
      address: {
        streetName: order.delivery.address.street,
        streetNumber: houseNumber,
        postalCode: order.delivery.address.postalCode,
        countryCode: 'NL',
        city: order.delivery.address.city,
      },
      payment: {
        amount: Number(order.totals.totalToPay),
        currencyCodeIso: 'EUR',
      },
      promisedEta: 15,
    };
  }

  private async mapOrderItems(
    items: Array<{
      sku?: string;
      name?: string;
      quantity?: number;
    }>,
  ) {
    const asyncItems = items.map(async (item) => {
      try {
        const gorillasProductId = await this.productMapper.toExternal(
          item.sku!,
        );

        return {
          id: Number(gorillasProductId),
          quantity: item.quantity,
          name: item.name,
        };
      } catch (error: unknown) {
        this.logger.error(item, 'An error occurred when mapping product');
        throw error;
      }
    });

    return Promise.all(asyncItems);
  }
}
