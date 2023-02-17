import type {FastifyReply, FastifyRequest} from 'fastify';
import {inject, singleton} from 'tsyringe';
import {StatusCodes} from 'http-status-codes';
import {serializeError} from 'serialize-error';

import {GorillasService} from '../services/gorillas-service.js';
import {injectionTokens} from '../di/tokens.js';
import {ContextAwareLoggerContainer} from '../log/context-aware-logger.js';
import type {OasOperationHandler} from '../fastify/oas-operation-handler.js';
import type {CreateFulfillmentOrderTypes} from '../types/index.js';

@singleton()
export class CreateFulfillmentOrderHandler implements OasOperationHandler {
  constructor(
    private readonly gorillasService: GorillasService,
    @inject(injectionTokens.RequestAwareLogger)
    private readonly logger: ContextAwareLoggerContainer,
  ) {}

  getOperationId() {
    return 'createFulfillmentOrder';
  }

  async handle(
    request: FastifyRequest<{
      Querystring: CreateFulfillmentOrderTypes.QueryParameters;
      Headers: CreateFulfillmentOrderTypes.RequestHeaders;
      Params: CreateFulfillmentOrderTypes.PathParameters;
      Body: CreateFulfillmentOrderTypes.RequestBody['application/json'];
    }>,
    reply: FastifyReply,
  ): Promise<string> {
    try {
      await this.gorillasService.createFulfillmentOrder(request.body);

      void reply.code(StatusCodes.CREATED);
      return '';
    } catch (error: unknown) {
      this.logger.getLogger().error(serializeError(error));
      void reply.code(StatusCodes.INTERNAL_SERVER_ERROR);
      return '';
    }
  }
}
