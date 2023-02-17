import process from 'node:process';
import {cleanEnv, str} from 'envalid';

const env = cleanEnv(process.env, {
  SQS_CLIENT_AWS_REGION: str({
    desc: 'The AWS region that the sqs client should use',
    default: 'eu-central-1',
  }),
  SQS_CLIENT_AWS_ENDPOINT: str({
    desc: 'The AWS endpoint that the sqs client should use',
    default: '',
  }),
});

export const sqsClientConfig = {
  region: env.SQS_CLIENT_AWS_REGION,
  endpoint: env.SQS_CLIENT_AWS_ENDPOINT,
};

export type SqsClientConfig = typeof sqsClientConfig;
