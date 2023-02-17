import process from 'node:process';
import {cleanEnv, port, str} from 'envalid';

const env = cleanEnv(process.env, {
  HOST: str({
    default: '0.0.0.0',
    desc: 'Host used by server to listen on',
  }),
  PORT: port({
    desc: 'Port used by server to listen on (value between 0 and 65535)',
    default: 3002,
  }),
});

export const serverConfig = {
  port: env.PORT,
  host: env.HOST,
};

export type ServerConfig = typeof serverConfig;
