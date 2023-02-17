export type OrderMessage = {
  eventId: string;
  orderId: string;
  customerId: string;
  eventType: EventType;
  timestamp: string;
  version: string;
  orderDetails: OrderDetails;
};

export enum EventType {
  ORDER_PLACED = 'ORDER_PLACED',
  ORDER_UPDATED = 'ORDER_UPDATED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
}

export type OrderDetails = {
  orderId: number;
  customerId: string;
  fulfilmentType: FulfilmentType;
  fulfilmentCarrier: FulfilmentCarrier;
};

export enum FulfilmentType {
  HOME_DELIVERY = 'HomeDelivery',
  COLLECTION = 'Collection',
}

export enum FulfilmentCarrier {
  JUMBO = 'JUMBO',
  GORILLAS = 'GORILLAS',
}
