import {AsyncLocalStorage} from 'node:async_hooks';
import {inject, injectable} from 'tsyringe';
import type {Logger} from 'pino';
import pino, {LoggerOptions} from 'pino';

import {injectionTokens} from '../di/tokens.js';

type ContextStore<T> = {
  logger: Logger;
  context: T;
};

export type ContextAwareLoggerContainer = {
  getLogger(): Logger;
};

@injectable()
export class ContextAwareLogger<
  LoggingContext extends pino.Bindings = Record<string, unknown>,
> implements ContextAwareLoggerContainer
{
  private readonly storage: AsyncLocalStorage<ContextStore<LoggingContext>>;
  private readonly logger: Logger;

  constructor(@inject(injectionTokens.LoggerConfig) options?: LoggerOptions) {
    this.storage = new AsyncLocalStorage();
    this.logger = pino(options);
  }

  bindContext(context: LoggingContext, bindToScope: () => unknown) {
    this.storage.run(
      {logger: this.logger.child(context), context},
      bindToScope,
    );
  }

  getContext(): LoggingContext | undefined {
    return this.storage.getStore()?.context;
  }

  getLogger(): Logger {
    return this.getContextBoundLogger() ?? this.logger;
  }

  fatal: pino.LogFn = (...args: any[]) => {
    this.getLogger().fatal(...(args as Parameters<pino.LogFn>));
  };

  error: pino.LogFn = (...args: any[]) => {
    this.getLogger().error(...(args as Parameters<pino.LogFn>));
  };

  warn: pino.LogFn = (...args: any[]) => {
    this.getLogger().warn(...(args as Parameters<pino.LogFn>));
  };

  info: pino.LogFn = (...args: any[]) => {
    this.getLogger().info(...(args as Parameters<pino.LogFn>));
  };

  debug: pino.LogFn = (...args: any[]) => {
    this.getLogger().debug(...(args as Parameters<pino.LogFn>));
  };

  trace: pino.LogFn = (...args: any[]) => {
    this.getLogger().trace(...(args as Parameters<pino.LogFn>));
  };

  private getContextBoundLogger(): Logger | undefined {
    return this.storage.getStore()?.logger;
  }
}
