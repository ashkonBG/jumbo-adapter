import process from 'node:process';
import {cleanEnv, num, url} from 'envalid';

const env = cleanEnv(process.env, {
  STORE_SERVICE_CLIENT_URL: url({
    desc: 'The customer-service url',
  }),
  STORE_SERVICE_CLIENT_REQUEST_TIMEOUT: num({
    desc: 'The request timeout (in ms) to use when communicating with the customer-service',
    default: 10_000,
  }),
});

export const storeServiceClientConfig = {
  url: env.STORE_SERVICE_CLIENT_URL,
  requestTimeout: env.STORE_SERVICE_CLIENT_REQUEST_TIMEOUT,
};

export type StoreServiceClientConfig = typeof storeServiceClientConfig;
