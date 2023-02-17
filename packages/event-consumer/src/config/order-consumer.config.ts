import process from 'node:process';
import {cleanEnv, url} from 'envalid';

const env = cleanEnv(process.env, {
  ORDER_CONSUMER_AWS_SQS_URL: url({
    desc: 'The AWS SQS url that the order consumer should use',
  }),
});

export const orderConsumerConfig = {
  sqsUrl: env.ORDER_CONSUMER_AWS_SQS_URL,
  maxNumberOfMessages: 5,
  waitTimeSeconds: 20,
};

export type OrderConsumerConfig = typeof orderConsumerConfig;
