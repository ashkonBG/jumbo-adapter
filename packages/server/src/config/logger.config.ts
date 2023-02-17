import process from 'node:process';
import {cleanEnv, str} from 'envalid';
import type {Level, LoggerOptions} from 'pino';

const env = cleanEnv(process.env, {
  LOG_LEVEL: str({
    desc: 'Log level used for the main logger',
    choices: ['trace', 'info', 'debug', 'error', 'warn', 'fatal'] as Level[],
    default: 'info',
  }),
});

export const loggerConfig: LoggerOptions = {
  level: env.LOG_LEVEL,
  messageKey: 'message',
};
