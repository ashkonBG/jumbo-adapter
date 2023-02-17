import type {FastifyReply, FastifyRequest} from 'fastify';
import {StatusCodes} from 'http-status-codes';
import {inject, singleton} from 'tsyringe';
import {injectionTokens} from '../di/tokens.js';

import type {OasOperationHandler} from '../fastify/oas-operation-handler.js';
import {ContextAwareLogger} from '../log/context-aware-logger.js';

@singleton()
export class IngestWebhookHandler implements OasOperationHandler {
  constructor(
    @inject(injectionTokens.RequestAwareLogger)
    private readonly logger: ContextAwareLogger,
  ) {}

  getOperationId() {
    return 'ingestWebhook';
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    this.logger.debug({body: request.body}, 'ingest webhook');
    void reply.code(StatusCodes.ACCEPTED).send('');
  }
}
