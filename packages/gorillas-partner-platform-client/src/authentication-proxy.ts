import { Client } from './client';

type ApiCredentials = {
  key: string;
  secret: string;
};

const apiKeyHeaderName = 'x-api-key';
const apiSecretHeaderName = 'x-api-secret';

export class AuthenticationProxy {
  private key: string;
  private secret: string;

  constructor(private client: Client, credentials: ApiCredentials) {
    this.key = credentials.key;
    this.secret = credentials.secret;
  }

  changeCredentials(credentials: ApiCredentials) {
    this.key = credentials.key;
    this.secret = credentials.secret;
  }

  createProxy(proxy: ProxyConstructor = Proxy): Client {
    const that = this;

    return new proxy<Client>(this.client, {
      get: (target, prop: keyof Client) => {
        if (typeof target === "object") {
          const targetFunction = target[prop];

          if (typeof targetFunction === "function") {
            return function (...args: any[]) {
              const firstArg = args[0];
              if (firstArg && typeof firstArg === "object" && firstArg.hasOwnProperty('headers') && typeof firstArg['headers'] === "object") {
                let headers = firstArg['headers'] ?? {};

                headers = {
                  [`${apiKeyHeaderName}`]: that.key,
                  [`${apiSecretHeaderName}`]: that.secret,
                  ...headers,
                };

                firstArg['headers'] = headers;
              }

              // @ts-ignore
              return targetFunction.apply(target, args);
            }
          }
        }

        return target[prop];
      }
    });
  }
}
