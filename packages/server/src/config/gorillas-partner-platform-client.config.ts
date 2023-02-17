import process from 'node:process';
import {cleanEnv, num, str, url} from 'envalid';

const env = cleanEnv(process.env, {
  GORILLAS_PARTNER_PLATFORM_CLIENT_URL: url({
    desc: 'The Gorillas partner platform url',
  }),
  GORILLAS_PARTNER_PLATFORM_CLIENT_REQUEST_TIMEOUT: num({
    desc: 'The request timeout (in ms) to use when communicating with the Gorillas partner platform',
    default: 10_000,
  }),
  GORILLAS_PARTNER_PLATFORM_CLIENT_API_KEY: str({
    desc: 'The Gorillas partner platform API key',
  }),
  GORILLAS_PARTNER_PLATFORM_CLIENT_API_SECRET: str({
    desc: 'The Gorillas partner platform API secret',
  }),
});

export const gorillasPartnerPlatformClientConfig = {
  url: env.GORILLAS_PARTNER_PLATFORM_CLIENT_URL,
  requestTimeout: env.GORILLAS_PARTNER_PLATFORM_CLIENT_REQUEST_TIMEOUT,
  apiKey: env.GORILLAS_PARTNER_PLATFORM_CLIENT_API_KEY,
  apiSecret: env.GORILLAS_PARTNER_PLATFORM_CLIENT_API_SECRET,
};

export type GorillasPartnerPlatformClientConfig =
  typeof gorillasPartnerPlatformClientConfig;
