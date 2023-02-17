import {Client} from '@jumbo-supermarkten/vendors-clients-customer-service';
import {inject, injectable} from 'tsyringe';
import {injectionTokens} from '../di/tokens.js';
import type {
  GetCustomerOutput,
  RetrieveCustomerResponseBody,
} from './customer-service.types.js';

@injectable()
export class CustomerService {
  constructor(
    @inject(injectionTokens.CustomerServiceClient)
    private readonly client: Client,
  ) {}

  async getCustomer(customerId: string): Promise<GetCustomerOutput> {
    const result = await this.client.retrieveCustomerResponse({
      pathParameters: {
        customerId,
      },
      queryParameters: {},
      body: undefined,
      headers: {
        'jmb-customer-id': customerId,
        'jmb-authenticated': true,
      },
    });

    const body = result.body as RetrieveCustomerResponseBody;

    return {
      customerId: body.customerId,
      firstName: body.contactInformation?.name?.firstName,
      lastName: body.contactInformation?.name?.lastName,
      middleName: body.contactInformation?.name?.middleName,
      phoneNumber: this.extractPhoneNumber(body),
    };
  }

  /**
   * Attempt to extract a phone number from the retrieve customer response body.
   * It attempts to find a mobile phone number and falls back to any other phone number stored.
   * @returns a phone number or empty string if none is found
   */
  private extractPhoneNumber(
    body: RetrieveCustomerResponseBody,
  ): string | undefined {
    const phoneNumbers = body.contactInformation?.telephones ?? [];

    // If no phone number is found return an empty string
    if (phoneNumbers.length === 0) {
      return;
    }

    // If only one phone number is found simply return that
    if (phoneNumbers.length === 1) {
      return phoneNumbers[0].number;
    }

    // If there are multiple phone numbers found, try to extract the mobile phone number.
    const mobilePhoneNumber = phoneNumbers.find(
      (number) => number?.type === 'Mobile',
    );
    if (mobilePhoneNumber) {
      return mobilePhoneNumber.number;
    }

    // If non of the above cases succeed just return any number
    return phoneNumbers[0].number;
  }
}
