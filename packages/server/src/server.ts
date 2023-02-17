import tracer from 'dd-trace';

import {createApp} from './app.js';
import {serverConfig} from './config/server.config.js';

tracer.init();

(async () => {
  const server = await createApp();
  await server.listen(serverConfig.port, serverConfig.host);

  console.info(
    `Server started listening on ${serverConfig.host}:${serverConfig.port}`,
  );
})();
