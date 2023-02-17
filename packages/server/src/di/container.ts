import {container, instanceCachingFactory} from 'tsyringe';
import type {DependencyContainer} from 'tsyringe';
import type {FastifyInstance} from 'fastify';

import type {Client as GorillasPartnerPlatformClient} from 'gorillas-partner-platform-client';
import {
  AuthenticationProxy,
  MetricsClient,
} from 'gorillas-partner-platform-client';
import {createAxiosHTTPRequestFunction} from '@jumbo-supermarkten/vendors-clients-axios-implementation';
import {Client as OrderServiceClient} from '@jumbo-supermarkten/vendors-clients-order-service';
import {Client as CustomerServiceClient} from '@jumbo-supermarkten/vendors-clients-customer-service';
import {Client as StoreServiceClient} from '@jumbo-supermarkten/vendors-clients-store-service';
import type {StatsD} from 'hot-shots';
import {ContextAwareLogger} from '../log/context-aware-logger.js';
import {fastifyFactory} from '../fastify/factory.js';
import {serverConfig} from '../config/server.config.js';
import {gorillasPartnerPlatformClientConfig} from '../config/gorillas-partner-platform-client.config.js';
import {orderServiceClientConfig} from '../config/order-service-client.config.js';
import {loggerConfig} from '../config/logger.config.js';
import {oasConfig} from '../config/oas.config.js';
import {swaggerUiConfig} from '../config/swagger-ui.config.js';
import type {RequestContext} from '../log/request-context.js';
import {createAxiosInstance} from '../axios/factory.js';
import {customerServiceClientConfig} from '../config/customer-service-client.config.js';
import {TEMPORARILY_HARDCODED_PRODUCT_MAP} from '../constants.js';
import {storeServiceClientConfig} from '../config/store-service-client.config.js';
import {metricsFactory} from '../metrics/metrics.js';
import {metricsConfig} from '../config/metrics.config.js';
import {injectionTokens} from './tokens.js';

export const createContainer = async (): Promise<DependencyContainer> => {
  container.register(injectionTokens.ServerConfig, {useValue: serverConfig});
  container.register(injectionTokens.LoggerConfig, {useValue: loggerConfig});
  container.register(injectionTokens.OasConfig, {useValue: oasConfig});
  container.register(injectionTokens.SwaggerUiConfig, {
    useValue: swaggerUiConfig,
  });
  container.register(injectionTokens.ProductMapJumboXGorillas, {
    useValue: TEMPORARILY_HARDCODED_PRODUCT_MAP,
  });
  container.register(injectionTokens.RequestAwareLogger, {
    useFactory: instanceCachingFactory<ContextAwareLogger<RequestContext>>(
      () => new ContextAwareLogger<RequestContext>(loggerConfig),
    ),
  });

  container.register(injectionTokens.Fastify, {
    useFactory: instanceCachingFactory<FastifyInstance>(fastifyFactory),
  });

  container.register(injectionTokens.GorillasPartnerPlatformClient, {
    useFactory: instanceCachingFactory<GorillasPartnerPlatformClient>(() => {
      const axios = createAxiosInstance(
        {
          baseURL: gorillasPartnerPlatformClientConfig.url,
          timeout: gorillasPartnerPlatformClientConfig.requestTimeout,
        },
        container,
      );

      const statsd = container.resolve<StatsD>(injectionTokens.MetricsClient);
      const metricsClient = new MetricsClient(
        createAxiosHTTPRequestFunction(axios),
        undefined,
        statsd,
      );

      const proxy = new AuthenticationProxy(metricsClient, {
        key: gorillasPartnerPlatformClientConfig.apiKey,
        secret: gorillasPartnerPlatformClientConfig.apiSecret,
      });

      return proxy.createProxy();
    }),
  });

  container.register(injectionTokens.OrderServiceClient, {
    useFactory: instanceCachingFactory<OrderServiceClient>(() => {
      const axios = createAxiosInstance(
        {
          baseURL: orderServiceClientConfig.url,
          timeout: orderServiceClientConfig.requestTimeout,
        },
        container,
      );

      return new OrderServiceClient(createAxiosHTTPRequestFunction(axios));
    }),
  });

  container.register(injectionTokens.CustomerServiceClient, {
    useFactory: instanceCachingFactory<CustomerServiceClient>(() => {
      const axios = createAxiosInstance(
        {
          baseURL: customerServiceClientConfig.url,
          timeout: customerServiceClientConfig.requestTimeout,
        },
        container,
      );

      return new CustomerServiceClient(createAxiosHTTPRequestFunction(axios));
    }),
  });

  container.register(injectionTokens.StoreServiceClient, {
    useFactory() {
      const axios = createAxiosInstance(
        {
          baseURL: storeServiceClientConfig.url,
          timeout: storeServiceClientConfig.requestTimeout,
        },
        container,
      );

      return new StoreServiceClient(createAxiosHTTPRequestFunction(axios));
    },
  });

  container.register(injectionTokens.MetricsClient, {
    useFactory: instanceCachingFactory<StatsD>(metricsFactory),
  });

  container.register(injectionTokens.MetricsConfig, {useValue: metricsConfig});

  return container;
};
