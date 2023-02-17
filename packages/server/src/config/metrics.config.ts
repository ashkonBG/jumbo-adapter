import process from 'node:process';
import {cleanEnv, num, str} from 'envalid';

const env = cleanEnv(process.env, {
  METRICS_HOST: str({
    desc: 'host to send metrics to (defaults to DD_AGENT_HOST)',
    default: process.env.DD_AGENT_HOST,
  }),
  METRICS_PORT: num({
    desc: 'port to send metrics to (defaults to 8125)',
    default: 8125,
  }),
  METRICS_SERVICE_NAME: str({
    desc: 'tag for metrics',
    default: 'gorillas-fulfillment-adapter',
  }),
});

export const metricsConfig = {
  host: env.METRICS_HOST,
  port: env.METRICS_PORT,
  serviceName: env.METRICS_SERVICE_NAME,
};

export type MetricsConfig = typeof metricsConfig;
