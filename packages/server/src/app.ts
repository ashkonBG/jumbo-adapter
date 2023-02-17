import 'reflect-metadata';
import type {FastifyInstance} from 'fastify';

import {createContainer} from './di/container.js';
import {injectionTokens} from './di/tokens.js';

export async function createApp() {
  const container = await createContainer();

  return container.resolve<FastifyInstance>(injectionTokens.Fastify);
}
