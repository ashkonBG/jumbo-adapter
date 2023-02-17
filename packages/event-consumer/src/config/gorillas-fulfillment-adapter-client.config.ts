import process from 'node:process';
import {cleanEnv, num, url} from 'envalid';

const env = cleanEnv(process.env, {
  GORILLAS_FULFILLMENT_ADAPTER_CLIENT_URL: url({
    desc: 'The Gorillas fulfillment adapter client url',
  }),
  GORILLAS_FULFILLMENT_ADAPTER_CLIENT_REQUEST_TIMEOUT: num({
    desc: 'The request timeout (in ms) to use when communicating with the Gorillas fulfillment adapter',
    default: 10_000,
  }),
});

export const gorillasFulfillmentAdapterClientConfig = {
  url: env.GORILLAS_FULFILLMENT_ADAPTER_CLIENT_URL,
  requestTimeout: env.GORILLAS_FULFILLMENT_ADAPTER_CLIENT_REQUEST_TIMEOUT,
};
