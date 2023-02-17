# Gorillas fulfillment adapter

This adapter provides an abstraction to communicate with the Gorillas Partner Platform. It can:
- Validate whether an address is eligible for delivery
- Validate whether an order can be placed
- Listens to order-created events from the `order-service` and places them at Gorillas

## API

The API is defined in oas.yml and can be viewed using [Swagger](https://gorillas-fulfillment-adapter.internal.test.cloud.jumbo.com/documentation).

## Environments

| Environment | Base url                                                           | Swagger                                                                                     |
| ----------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Dev         | https://gorillas-fulfillment-adapter.internal.dev.cloud.jumbo.com  | [Swagger](https://gorillas-fulfillment-adapter.internal.dev.cloud.jumbo.com/documentation)  |
| Test        | https://gorillas-fulfillment-adapter.internal.test.cloud.jumbo.com | [Swagger](https://gorillas-fulfillment-adapter.internal.test.cloud.jumbo.com/documentation) |
| Acc         | https://gorillas-fulfillment-adapter.internal.acc.cloud.jumbo.com  | [Swagger](https://gorillas-fulfillment-adapter.internal.acc.cloud.jumbo.com/documentation)  |
| Prod        | https://gorillas-fulfillment-adapter.internal.prod.cloud.jumbo.com | [Swagger](https://gorillas-fulfillment-adapter.internal.prod.cloud.jumbo.com/documentation) |

When integrating with the adapter from a Kubernetes deployment please use https://gorillas-fulfillment-adapter.gorillas-fulfillment-adapter as base url.

## Development

This project uses conventional commits formatting, enforced by `commitlint`. Installing dependencies will also setup commit hooks via Husky.

```bash
# Prepare the .env file
$ cp .env.example .env
# Install dependencies
$ npm install
```

Now you can edit `.env` and apply any changes you may need

## Running the service locally

```bash
# Run the service in dev mode
$ npm run dev
```

This will launch the service on http://localhost:3000 (unless otherwise specified in `.env`), Swagger will be available on http://localhost:3000/documentation.

## Running the tests

```bash
# Run the tests
$ npm run test
```
