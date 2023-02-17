import type {Message} from '@aws-sdk/client-sqs';
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import {inject, singleton} from 'tsyringe';
import type {CreateFulfillmentOrderTypes} from '@jumbo-supermarkten/gorillas-fulfillment-adapter-client';
import {Client} from '@jumbo-supermarkten/gorillas-fulfillment-adapter-client';

import {StatsD} from 'hot-shots';
import {injectionTokens} from '../di/tokens.js';
import {ContextAwareLogger} from '../log/context-aware-logger.js';
import {OrderConsumerConfig} from '../config/order-consumer.config.js';
import type {OrderMessageContext} from '../log/order-message-context.js';
import type {OrderMessage} from '../models/order-message.js';
import {EventType, FulfilmentCarrier} from '../models/order-message.js';

@singleton()
export class OrderConsumer {
  private processing = false;

  // eslint-disable-next-line max-params
  constructor(
    @inject(injectionTokens.OrderConsumerConfig)
    private readonly config: OrderConsumerConfig,
    @inject(injectionTokens.SqsClient)
    private readonly sqsClient: SQSClient,
    @inject(injectionTokens.MessageAwareLogger)
    private readonly logger: ContextAwareLogger<OrderMessageContext>,
    @inject(injectionTokens.GorillasFulfillmentAdapterClient)
    private readonly client: Client,
    @inject(injectionTokens.MetricsClient)
    private readonly metricsClient: StatsD,
  ) {}

  async start() {
    this.processing = true;

    try {
      await this.processMessages();
    } finally {
      this.stop();
    }
  }

  stop() {
    this.processing = false;
  }

  private async processMessages() {
    while (this.processing) {
      // eslint-disable-next-line no-await-in-loop
      const result = await this.sqsClient.send(
        new ReceiveMessageCommand({
          AttributeNames: [],
          MaxNumberOfMessages: this.config.maxNumberOfMessages,
          MessageAttributeNames: [],
          QueueUrl: this.config.sqsUrl,
          WaitTimeSeconds: this.config.waitTimeSeconds,
        }),
      );

      this.logger.debug(
        {
          receiveMessageResult: {
            metadata: result.$metadata,
            numberOfMessages: result.Messages?.length,
          },
        },
        'SQS command ReceiveMessage executed',
      );

      for (const message of result.Messages ?? []) {
        // eslint-disable-next-line no-await-in-loop
        await this.bindLoggerContextAndProcessMessage(message);
      }
    }
  }

  private async deleteMessage(message: Message) {
    const result = await this.sqsClient.send(
      new DeleteMessageCommand({
        ReceiptHandle: message.ReceiptHandle,
        QueueUrl: this.config.sqsUrl,
      }),
    );

    this.logger.debug(
      {
        deleteMessageResult: {
          metadata: result.$metadata,
        },
      },
      'SQS command DeleteMessage executed',
    );
  }

  private async processMessage(message: Message) {
    this.logger.debug({messageContent: message}, 'Start processing message');

    try {
      const orderMessage = this.parseBody(message.Body);

      if (
        this.isGorillasOrder(orderMessage) &&
        this.isOrderPlaced(orderMessage)
      ) {
        await this.processOrderMessage(orderMessage);
      }

      await this.deleteMessage(message);
    } catch (error: unknown) {
      this.logger.error('An error occurred when processing message');
      throw error;
    }
  }

  private async processOrderMessage(message: OrderMessage) {
    let successful = false;

    try {
      await this.createFulfillmentOrder(Number(message.orderId));
      successful = true;
    } finally {
      this.metricsClient.event(
        'processing order message',
        JSON.stringify({
          successful,
          orderId: message.orderId,
        }),
      );
    }
  }

  private isGorillasOrder(orderMessage: OrderMessage): boolean {
    return (
      orderMessage?.orderDetails?.fulfilmentCarrier ===
      FulfilmentCarrier.GORILLAS
    );
  }

  private isOrderPlaced(orderMessage: OrderMessage): boolean {
    return orderMessage?.eventType === EventType.ORDER_PLACED;
  }

  private async bindLoggerContextAndProcessMessage(
    message: Message,
  ): Promise<unknown> {
    return this.logger.bindContext(
      {messageContext: {messageId: message.MessageId}},
      async () => {
        return this.processMessage(message);
      },
    );
  }

  private parseBody(body: string | undefined): OrderMessage {
    if (!body) {
      throw new Error('Provided message body is empty');
    }

    try {
      const decodedBody = JSON.parse(body) as {Message: string};
      return JSON.parse(decodedBody.Message) as OrderMessage;
    } catch {
      throw new Error('An error occurred when parsing the message body');
    }
  }

  private async createFulfillmentOrder(orderId: number) {
    this.logger.debug({orderId}, 'Create fulfillment order');

    return this.client.createFulfillmentOrder({
      pathParameters: {},
      body: {orderId},
      queryParameters: {},
      headers: {},
    });
  }
}
