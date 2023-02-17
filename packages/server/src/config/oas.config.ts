import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const directory = dirname(fileURLToPath(import.meta.url));

export const oasConfig = {
  specificationFilePath: join(directory, '../../oas.yml'),
};

export type OasConfig = typeof oasConfig;
