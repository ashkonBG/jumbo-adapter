import type {StatsD} from 'hot-shots';
import HotShots from 'hot-shots';
import type {DependencyContainer, FactoryFunction} from 'tsyringe';
import type {MetricsConfig} from '../config/metrics.config.js';
import {injectionTokens} from '../di/tokens.js';
import type {ContextAwareLogger} from '../log/context-aware-logger.js';
import type {OrderMessageContext} from '../log/order-message-context.js';

export const metricsFactory: FactoryFunction<StatsD> = (
  container: DependencyContainer,
) => {
  const config = container.resolve<MetricsConfig>(
    injectionTokens.MetricsConfig,
  );
  const logger = container.resolve<ContextAwareLogger<OrderMessageContext>>(
    injectionTokens.MessageAwareLogger,
  );

  return new HotShots({
    host: config.host,
    port: config.port,
    globalTags: {
      service: config.serviceName,
    },
    prefix: `${config.serviceName}.`,
    cacheDns: true,
    errorHandler(error) {
      logger.error(error);
    },
  });
};
