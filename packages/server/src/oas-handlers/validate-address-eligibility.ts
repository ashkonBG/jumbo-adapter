import type {FastifyReply, FastifyRequest} from 'fastify';
import {inject, singleton} from 'tsyringe';
import {StatusCodes} from 'http-status-codes';
import {serializeError} from 'serialize-error';

import {GorillasService} from '../services/gorillas-service.js';
import {injectionTokens} from '../di/tokens.js';
import {ContextAwareLoggerContainer} from '../log/context-aware-logger.js';
import type {OasOperationHandler} from '../fastify/oas-operation-handler.js';
import type {ValidateAddressEligibilityTypes} from '../types/index.js';

@singleton()
export class ValidateAddressEligibilityHandler implements OasOperationHandler {
  constructor(
    private readonly gorillasService: GorillasService,
    @inject(injectionTokens.RequestAwareLogger)
    private readonly logger: ContextAwareLoggerContainer,
  ) {}

  getOperationId() {
    return 'validateAddressEligibility';
  }

  async handle(
    request: FastifyRequest<{
      Querystring: ValidateAddressEligibilityTypes.QueryParameters;
      Headers: ValidateAddressEligibilityTypes.RequestHeaders;
      Params: ValidateAddressEligibilityTypes.PathParameters;
      Body: ValidateAddressEligibilityTypes.RequestBody['application/json'];
    }>,
    reply: FastifyReply,
  ): Promise<ValidateAddressEligibilityTypes.ResponseBody | string> {
    try {
      return await this.gorillasService.validateAddressEligibility(
        request.body,
      );
    } catch (error: unknown) {
      this.logger.getLogger().error(serializeError(error));
      void reply.code(StatusCodes.INTERNAL_SERVER_ERROR);
      return '';
    }
  }
}
