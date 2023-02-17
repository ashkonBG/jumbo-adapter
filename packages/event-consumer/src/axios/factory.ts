import {createAxiosLoggerInterceptor} from '@jumbo-supermarkten/vendors-clients-axios-implementation';
import type {AxiosInstance, AxiosRequestConfig} from 'axios';
import axios from 'axios';
import type {DependencyContainer} from 'tsyringe';

import {injectionTokens} from '../di/tokens.js';

export function createAxiosInstance(
  config: AxiosRequestConfig,
  container: DependencyContainer,
): AxiosInstance {
  const axiosInstance = axios.create({
    ...config,
    headers: {
      ...config.headers,
      'User-Agent': 'gorillas-fulfillment-adapter-event-consumer',
    },
  });

  const interceptors = createAxiosLoggerInterceptor(
    container.resolve(injectionTokens.MessageAwareLogger),
  );

  axiosInstance.interceptors.response.use(
    interceptors.onFulfilled,
    interceptors.onRejected,
  );

  return axiosInstance;
}
