import type {TestFn} from 'ava';
import anyTest from 'ava';
import type {Client, PostGeocheckTypes} from 'gorillas-partner-platform-client';
import * as td from 'testdouble';
import type {CustomerService} from '../clients/customer-service.js';
import type {OrderService} from '../clients/order-service.js';
import type {ContextAwareLogger} from '../log/context-aware-logger.js';
import type {RequestContext} from '../log/request-context.js';
import {GorillasService} from './gorillas-service.js';
import type {StoreService} from './store-service.js';
import {ProductMapper} from './product-mapper.js';

type PostGeocheckSuccessfulResponse = Extract<
  PostGeocheckTypes.ResponseBody,
  {storeId: string}
>;

const address = {
  streetName: 'Fuutlaan',
  streetNumber: '2',
  postalCode: '5613AC',
  city: 'Eindhoven',
  countryCode: 'NL',
};

const nearJumboStoreId = '123456';

const postGeocheckSuccessful = {
  statusCode: 200,
  body: {
    countryCode: 'NL',
    deliveryEta: '15',
    name: 'Some store somewhere',
    storeId: '42',
    storeOpen: true,
  },
  headers: {},
};

const test = anyTest as TestFn<{
  sut: GorillasService;
  orderServiceMock: OrderService;
  customerServiceMock: CustomerService;
  productMapper: ProductMapper;
  storeServiceMock: StoreService;
  gorillasPartnerPlatformClientMock: Client;
  loggerMock: ContextAwareLogger;
}>;

const productMapperInputs: Record<string, string> = {
  sku1: 'gor1',
  sku2: 'gor2',
  sku3: 'gor3',
};
test.beforeEach((t) => {
  const orderServiceMock = td.object<OrderService>();
  const customerServiceMock = td.object<CustomerService>();
  const storeServiceMock = td.object<StoreService>();
  const gorillasPartnerPlatformClientMock = td.object<Client>();
  const loggerMock = td.object<ContextAwareLogger<RequestContext>>();
  const productMapper = new ProductMapper(productMapperInputs);

  t.context = {
    sut: new GorillasService(
      orderServiceMock,
      customerServiceMock,
      productMapper,
      storeServiceMock,
      gorillasPartnerPlatformClientMock,
      loggerMock,
    ),
    orderServiceMock,
    customerServiceMock,
    productMapper,
    storeServiceMock,
    gorillasPartnerPlatformClientMock,
    loggerMock,
  };
});

test('calls the dependencies', async (t) => {
  td.when(
    t.context.gorillasPartnerPlatformClientMock.postGeocheck({
      pathParameters: {},
      queryParameters: {},
      body: {
        address: {
          streetName: address.streetName,
          streetNumber: address.streetNumber,
          postalCode: address.postalCode,
          city: address.city,
          countryCode: address.countryCode,
        },
      },
      headers: {},
    }),
  ).thenResolve(postGeocheckSuccessful);

  td.when(
    t.context.storeServiceMock.getNearestStore(address.postalCode),
  ).thenResolve(nearJumboStoreId);

  t.pass();
});

test('it produces the expect output for a eligible address', async (t) => {
  td.when(
    t.context.gorillasPartnerPlatformClientMock.postGeocheck(
      td.matchers.anything(),
    ),
  ).thenResolve(postGeocheckSuccessful);

  td.when(
    t.context.storeServiceMock.getNearestStore(td.matchers.anything()),
  ).thenResolve(nearJumboStoreId);

  t.like(await t.context.sut.validateAddressEligibility({address}), {
    isEligible: true,
    storeId: nearJumboStoreId,
  });

  t.pass();
});

test('it produces the expected output for a non-eligible addres', async (t) => {
  const error = {
    error: {
      message: 'Not in delivery area.',
      code: 'NOT_IN_DELIVERY_AREA',
      details: {},
    },
  };
  td.when(
    t.context.gorillasPartnerPlatformClientMock.postGeocheck(
      td.matchers.anything(),
    ),
  ).thenResolve({
    body: {
      error,
    },
  });

  t.like(await t.context.sut.validateAddressEligibility({address}), {
    isEligible: false,
  });

  t.pass();
});

test('it handles a gorillas partner platform client error (5xx) correctly', async (t) => {
  td.when(
    t.context.gorillasPartnerPlatformClientMock.postGeocheck(
      td.matchers.anything(),
    ),
  ).thenReject(new Error('500 Internal Server Error'));

  await t.throwsAsync(t.context.sut.validateAddressEligibility({address}));

  t.pass();
});
