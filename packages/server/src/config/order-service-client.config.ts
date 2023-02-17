import process from 'node:process';
import {cleanEnv, num, url} from 'envalid';

const env = cleanEnv(process.env, {
  ORDER_SERVICE_CLIENT_URL: url({
    desc: 'The order-service url',
  }),
  ORDER_SERVICE_CLIENT_REQUEST_TIMEOUT: num({
    desc: 'The request timeout (in ms) to use when communicating with the order-service',
    default: 10_000,
  }),
});

export const orderServiceClientConfig = {
  url: env.ORDER_SERVICE_CLIENT_URL,
  requestTimeout: env.ORDER_SERVICE_CLIENT_REQUEST_TIMEOUT,
};

export type OrderServiceClientConfig = typeof orderServiceClientConfig;
