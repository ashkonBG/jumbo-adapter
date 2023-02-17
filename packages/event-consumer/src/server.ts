import 'reflect-metadata';
import {Server} from 'node:http';
import {serializeError} from 'serialize-error';

import {serverConfig} from './config/server.config.js';
import {OrderConsumer} from './services/order-consumer.js';
import {createContainer} from './di/container.js';
import {injectionTokens} from './di/tokens.js';
import type {ContextAwareLogger} from './log/context-aware-logger.js';
import type {OrderMessageContext} from './log/order-message-context.js';

(async () => {
  const container = await createContainer();

  const orderConsumer = container.resolve(OrderConsumer);
  const logger = container.resolve<ContextAwareLogger<OrderMessageContext>>(
    injectionTokens.MessageAwareLogger,
  );

  orderConsumer.start().catch((error: unknown) => {
    logger.error(
      {error: serializeError(error)},
      'An error occurred while processing messages',
    );

    throw new Error('An error occurred while processing messages');
  });

  const server = new Server((request, response) => {
    switch (request.url) {
      case '/health/service':
        response.statusCode = 200;
        break;
      case '/health/instance':
        response.statusCode = 200;
        break;
      default:
        response.statusCode = 404;
    }

    response.end();
  });

  try {
    server.listen(serverConfig.port, serverConfig.host);

    console.info(
      `Event consumer started listening on ${serverConfig.host}:${serverConfig.port}`,
    );
  } catch (error: unknown) {
    console.error(
      `An error occurred when starting the event consumer: ${
        (error as Error).message
      }`,
    );
  }
})();
