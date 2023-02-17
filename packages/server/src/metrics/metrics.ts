import type {StatsD, Tags} from 'hot-shots';
import HotShots from 'hot-shots';
import type {DependencyContainer, FactoryFunction} from 'tsyringe';
import type {MetricsConfig} from '../config/metrics.config.js';
import {injectionTokens} from '../di/tokens.js';
import type {ContextAwareLogger} from '../log/context-aware-logger.js';

export const metricsFactory: FactoryFunction<StatsD> = (
  container: DependencyContainer,
) => {
  const logger = container.resolve<ContextAwareLogger>(
    injectionTokens.RequestAwareLogger,
  );

  const config = container.resolve<MetricsConfig>(
    injectionTokens.MetricsConfig,
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
