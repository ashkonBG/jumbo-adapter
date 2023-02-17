import {inject, singleton} from 'tsyringe';
import type {GetStoresTypes} from '@jumbo-supermarkten/vendors-clients-store-service';
import {Client} from '@jumbo-supermarkten/vendors-clients-store-service';
import {injectionTokens} from '../di/tokens.js';

type GetStoresResponseBody = Extract<
  GetStoresTypes.ResponseBody,
  {
    postalCode: string;
  }
>;

@singleton()
export class StoreService {
  constructor(
    @inject(injectionTokens.StoreServiceClient)
    private readonly client: Client,
  ) {}

  async getNearestStore(postalCode: string): Promise<string> {
    const result = await this.client.getStores({
      headers: {},
      pathParameters: {},
      queryParameters: {
        postalCode,
      },
      body: undefined,
    });

    const body = result.body as GetStoresResponseBody;

    return body.stores[0].storeId;
  }
}
