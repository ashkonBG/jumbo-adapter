import type {FastifyReply, FastifyRequest} from 'fastify';
import {StatusCodes} from 'http-status-codes';
import {singleton} from 'tsyringe';

import type {OasOperationHandler} from '../fastify/oas-operation-handler.js';

@singleton()
export class AcknowledgeWebhookHandler implements OasOperationHandler {
  getOperationId() {
    return 'acknowledgeWebhook';
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    void reply.code(StatusCodes.NO_CONTENT).send('');
  }
}
