import process from 'node:process';
import {cleanEnv, num, url} from 'envalid';

const env = cleanEnv(process.env, {
  CUSTOMER_SERVICE_CLIENT_URL: url({
    desc: 'The customer-service url',
  }),
  CUSTOMER_SERVICE_CLIENT_REQUEST_TIMEOUT: num({
    desc: 'The request timeout (in ms) to use when communicating with the customer-service',
    default: 10_000,
  }),
});

export const customerServiceClientConfig = {
  url: env.CUSTOMER_SERVICE_CLIENT_URL,
  requestTimeout: env.CUSTOMER_SERVICE_CLIENT_REQUEST_TIMEOUT,
};

export type CustomerServiceClientConfig = typeof customerServiceClientConfig;
