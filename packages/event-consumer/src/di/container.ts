import type {DependencyContainer} from 'tsyringe';
import {container, instanceCachingFactory} from 'tsyringe';
import type {SQSClientConfig} from '@aws-sdk/client-sqs';
import {SQSClient} from '@aws-sdk/client-sqs';
import {Client as GorillasFulfillmentAdapterClient} from '@jumbo-supermarkten/gorillas-fulfillment-adapter-client';
import {createAxiosHTTPRequestFunction} from '@jumbo-supermarkten/vendors-clients-axios-implementation';

import type {StatsD} from 'hot-shots';
import {loggerConfig} from '../config/logger.config.js';
import {ContextAwareLogger} from '../log/context-aware-logger.js';
import {orderConsumerConfig} from '../config/order-consumer.config.js';
import {sqsClientConfig} from '../config/sqs-client.config.js';
import {createAxiosInstance} from '../axios/factory.js';
import {gorillasFulfillmentAdapterClientConfig} from '../config/gorillas-fulfillment-adapter-client.config.js';
import type {OrderMessageContext} from '../log/order-message-context.js';
import {metricsConfig} from '../config/metrics.config.js';
import {metricsFactory} from '../metrics/metrics.js';
import {injectionTokens} from './tokens.js';

export const createContainer = async (): Promise<DependencyContainer> => {
  container.register(injectionTokens.LoggerConfig, {
    useValue: loggerConfig,
  });

  container.register(injectionTokens.OrderConsumerConfig, {
    useValue: sqsClientConfig,
  });

  container.register(injectionTokens.OrderConsumerConfig, {
    useValue: orderConsumerConfig,
  });

  container.register(injectionTokens.SqsClient, {
    useFactory() {
      const config: SQSClientConfig = {
        region: sqsClientConfig.region,
        endpoint: sqsClientConfig.endpoint,
      };

      return new SQSClient(config);
    },
  });

  container.register(injectionTokens.MessageAwareLogger, {
    useFactory: instanceCachingFactory<ContextAwareLogger<OrderMessageContext>>(
      () => new ContextAwareLogger<OrderMessageContext>(loggerConfig),
    ),
  });

  container.register(injectionTokens.GorillasFulfillmentAdapterClient, {
    useFactory: instanceCachingFactory<GorillasFulfillmentAdapterClient>(() => {
      const axios = createAxiosInstance(
        {
          baseURL: gorillasFulfillmentAdapterClientConfig.url,
          timeout: gorillasFulfillmentAdapterClientConfig.requestTimeout,
        },
        container,
      );

      return new GorillasFulfillmentAdapterClient(
        createAxiosHTTPRequestFunction(axios),
      );
    }),
  });

  container.register(injectionTokens.MetricsClient, {
    useFactory: instanceCachingFactory<StatsD>(metricsFactory),
  });

  container.register(injectionTokens.MetricsConfig, {useValue: metricsConfig});

  return container;
};
