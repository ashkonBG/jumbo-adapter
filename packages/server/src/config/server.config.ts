import process from 'node:process';
import {cleanEnv, port, str} from 'envalid';

const env = cleanEnv(process.env, {
  HOST: str({
    default: '0.0.0.0',
    desc: 'Host used by server to listen on',
  }),
  PORT: port({
    desc: 'Port used by server to listen on (value between 0 and 65535)',
    default: 3001,
  }),
  REQUEST_ID_HEADER_NAME: str({
    desc: 'The header name used for request IDs',
    default: 'x-request-id',
  }),
});

export const serverConfig = {
  port: env.PORT,
  host: env.HOST,
  requestIdHeaderName: env.REQUEST_ID_HEADER_NAME,
};

export type ServerConfig = typeof serverConfig;
