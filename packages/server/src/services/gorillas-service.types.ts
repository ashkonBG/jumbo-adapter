import type {PostGeocheckTypes} from 'gorillas-partner-platform-client';

export type GorillasServiceCreateOrderInput = {
  orderId: number;
};

export type PostGeoCheckResponseBody = Extract<
  PostGeocheckTypes.ResponseBody,
  {storeId?: string}
>;
