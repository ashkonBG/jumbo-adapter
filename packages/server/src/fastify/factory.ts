import * as path from 'node:path';
import type {FastifyInstance, FastifyServerOptions} from 'fastify';
import fastify from 'fastify';
import type {DependencyContainer} from 'tsyringe';
import fastifyStatic from '@fastify/static';
import FastifyOpenApiGlue from 'fastify-openapi-glue';

import {injectionTokens} from '../di/tokens.js';
import {GetHealthHandler} from '../oas-handlers/get-health.js';
import {GetLivenessHandler} from '../oas-handlers/get-liveness.js';
import {CreateFulfillmentOrderHandler} from '../oas-handlers/create-fulfillment-order.js';
import {ValidateAddressEligibilityHandler} from '../oas-handlers/validate-address-eligibility.js';
import type {ServerConfig} from '../config/server.config.js';
import type {OasConfig} from '../config/oas.config.js';
import type {ContextAwareLogger} from '../log/context-aware-logger.js';
import type {RequestContext} from '../log/request-context.js';
import type {SwaggerUiConfig} from '../config/swagger-ui.config.js';
import {IngestWebhookHandler} from '../oas-handlers/ingest-webhook.js';
import {AcknowledgeWebhookHandler} from '../oas-handlers/acknowledge-webhook.js';

export function fastifyFactory(
  container: DependencyContainer,
): FastifyInstance {
  const serverConfig = container.resolve<ServerConfig>(
    injectionTokens.ServerConfig,
  );

  const options: FastifyServerOptions = {
    logger: container
      .resolve<ContextAwareLogger<RequestContext>>(
        injectionTokens.RequestAwareLogger,
      )
      .getLogger(),
    disableRequestLogging: true,
    requestIdHeader: serverConfig.requestIdHeaderName,
  };

  const app = fastify(options);

  registerPlugins(app, container);
  registerHooks(app, container);

  return app;
}

function registerPlugins(app: FastifyInstance, container: DependencyContainer) {
  registerOpenApiGluePlugin(app, container);
  registerSwaggerUiPlugin(app, container);
}

function registerOpenApiGluePlugin(
  app: FastifyInstance,
  container: DependencyContainer,
) {
  const oasConfig = container.resolve<OasConfig>(injectionTokens.OasConfig);
  const getHealthHandler = container.resolve(GetHealthHandler);
  const getLivenessHandler = container.resolve(GetLivenessHandler);
  const createFulfillmentOrderHandler = container.resolve(
    CreateFulfillmentOrderHandler,
  );
  const validateAddressEligibilityHandler = container.resolve(
    ValidateAddressEligibilityHandler,
  );
  const acknowledgeWebhookHandler = container.resolve(
    AcknowledgeWebhookHandler,
  );
  const ingestWebhookHandler = container.resolve(IngestWebhookHandler);

  void app.register(FastifyOpenApiGlue, {
    specification: oasConfig.specificationFilePath,
    service: {
      [getHealthHandler.getOperationId()]:
        getHealthHandler.handle.bind(getHealthHandler),
      [getLivenessHandler.getOperationId()]:
        getLivenessHandler.handle.bind(getLivenessHandler),
      [createFulfillmentOrderHandler.getOperationId()]:
        createFulfillmentOrderHandler.handle.bind(
          createFulfillmentOrderHandler,
        ),
      [validateAddressEligibilityHandler.getOperationId()]:
        validateAddressEligibilityHandler.handle.bind(
          validateAddressEligibilityHandler,
        ),
      [ingestWebhookHandler.getOperationId()]:
        ingestWebhookHandler.handle.bind(ingestWebhookHandler),
      [acknowledgeWebhookHandler.getOperationId()]:
        acknowledgeWebhookHandler.handle.bind(acknowledgeWebhookHandler),
    },
  });
}

function registerSwaggerUiPlugin(
  fastify: FastifyInstance,
  container: DependencyContainer,
) {
  const swaggerUiConfig = container.resolve<SwaggerUiConfig>(
    injectionTokens.SwaggerUiConfig,
  );

  void fastify.register(fastifyStatic, {
    root: path.dirname(swaggerUiConfig.swaggerUiHtmlFilePath),
  });
  void fastify.register(fastifyStatic, {
    root: swaggerUiConfig.swaggerUiAssetsDirectoryPath,
    prefix: swaggerUiConfig.swaggerUiAssetsRoutePrefix,
    decorateReply: false,
  });
  fastify.get(swaggerUiConfig.openApiSpecDocumentRoute, (request, reply) => {
    void reply.sendFile(
      path.basename(swaggerUiConfig.openApiSpecFilePath),
      path.dirname(swaggerUiConfig.openApiSpecFilePath),
    );
  });
  fastify.get(swaggerUiConfig.documentationRoute, (request, reply) => {
    void reply.sendFile(path.basename(swaggerUiConfig.swaggerUiHtmlFilePath));
  });
}

function registerHooks(
  fastify: FastifyInstance,
  container: DependencyContainer,
) {
  const logger = container.resolve<ContextAwareLogger<RequestContext>>(
    injectionTokens.RequestAwareLogger,
  );

  fastify.addHook('onRequest', (request, reply, done) => {
    const context: RequestContext = {
      http: {
        method: request.routerMethod,
        url: request.url,

        request_id: request.id as string,
      },
    };

    logger.bindContext(context, done);
  });
}
