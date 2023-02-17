import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {getAbsoluteFSPath} from 'swagger-ui-dist';

import {oasConfig} from './oas.config.js';

const directory = dirname(fileURLToPath(import.meta.url));

export const swaggerUiConfig = {
  documentationRoute: '/documentation',
  openApiSpecFilePath: oasConfig.specificationFilePath,
  openApiSpecDocumentRoute: '/oas.yml',
  swaggerUiHtmlFilePath: join(directory, '../../public/swagger.html'),
  swaggerUiAssetsRoutePrefix: '/swagger-ui/',
  swaggerUiAssetsDirectoryPath: getAbsoluteFSPath(),
};

export type SwaggerUiConfig = typeof swaggerUiConfig;
