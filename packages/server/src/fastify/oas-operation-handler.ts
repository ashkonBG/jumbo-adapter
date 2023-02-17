import type {FastifyReply, FastifyRequest} from 'fastify';

export type OasOperationHandler = {
  getOperationId(): string;
  handle(request: FastifyRequest, reply: FastifyReply): Promise<unknown>;
};
