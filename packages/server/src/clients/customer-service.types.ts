import type {ResponseBody} from '@jumbo-supermarkten/vendors-clients-customer-service/dist/types/retrieve-customer-response.js';

export type RetrieveCustomerResponseBody = Extract<
  ResponseBody,
  {
    customerId?: string;
  }
>;

export type GetCustomerOutput = {
  customerId?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
};
