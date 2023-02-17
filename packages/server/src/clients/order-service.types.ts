import type {GetOrder_1Types as GetOrderTypes} from '@jumbo-supermarkten/vendors-clients-order-service';

export type GetOrderResponseBody = GetOrderTypes.ResponseBody;

export type GetOrderInput = {
  orderId: number;
};

export type GetOrderOutput = {
  orderId?: number;
  customerId?: string;
  items: Array<{sku?: string; name?: string; quantity?: number}>;
  totals: {
    totalToPay?: number;
  };
  delivery: {
    address: {
      street?: string;
      houseNumber?: string;
      addition?: string;
      postalCode?: string;
      city?: string;
    };
    linkedSapId?: string;
  };
};
