import { StatsD } from "hot-shots";
import { Client, HTTPRequestFunction } from "./client";
import {
    GetAssortmentTypes,
    PostGeocheckTypes,
    PostOrderTypes,
    UpsertWebhooksTypes,
    RenewAuthenticationKeyTypes,
} from './types'

type MapNeverToUndefined<T> = [T] extends [never] ? undefined : T;

interface ClientOptions {
    parseQueryString: boolean;
}

export class MetricsClient extends Client {

    constructor(private readonly httpRequestFunction: HTTPRequestFunction, clientOptions: Partial<ClientOptions> = {}, private statsClient: StatsD) {
        super(httpRequestFunction, clientOptions);
    }

    getAssortment<RequestMediaType extends keyof GetAssortmentTypes.RequestBody = keyof GetAssortmentTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: GetAssortmentTypes.PathParameters, queryParameters: GetAssortmentTypes.QueryParameters, body: MapNeverToUndefined<GetAssortmentTypes.RequestBody[RequestMediaType]>, headers: GetAssortmentTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const instrumented = this.statsClient.asyncTimer(super.getAssortment.bind(this), 'gorillas.getAssortment');
        return instrumented({pathParameters, queryParameters, body, headers}, endpointOptions);
    }
    
    postGeocheck<RequestMediaType extends keyof PostGeocheckTypes.RequestBody = keyof PostGeocheckTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: PostGeocheckTypes.PathParameters, queryParameters: PostGeocheckTypes.QueryParameters, body: MapNeverToUndefined<PostGeocheckTypes.RequestBody[RequestMediaType]>, headers: PostGeocheckTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const instrumented = this.statsClient.asyncTimer(super.postGeocheck.bind(this), 'gorillas.postGeocheck');
        return instrumented({pathParameters, queryParameters, body, headers}, endpointOptions);
    }
    
    postOrder<RequestMediaType extends keyof PostOrderTypes.RequestBody = keyof PostOrderTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: PostOrderTypes.PathParameters, queryParameters: PostOrderTypes.QueryParameters, body: MapNeverToUndefined<PostOrderTypes.RequestBody[RequestMediaType]>, headers: PostOrderTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const instrumented = this.statsClient.asyncTimer(super.postOrder.bind(this), 'gorillas.postOrder');
        return instrumented({pathParameters, queryParameters, body, headers}, endpointOptions);
    }
    
    upsertWebhooks<RequestMediaType extends keyof UpsertWebhooksTypes.RequestBody = keyof UpsertWebhooksTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: UpsertWebhooksTypes.PathParameters, queryParameters: UpsertWebhooksTypes.QueryParameters, body: MapNeverToUndefined<UpsertWebhooksTypes.RequestBody[RequestMediaType]>, headers: UpsertWebhooksTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const instrumented = this.statsClient.asyncTimer(super.upsertWebhooks.bind(this), 'gorillas.upsertWebhooks');
        return instrumented({pathParameters, queryParameters, body, headers}, endpointOptions);
    }

    renewAuthenticationKey<RequestMediaType extends keyof RenewAuthenticationKeyTypes.RequestBody = keyof RenewAuthenticationKeyTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: RenewAuthenticationKeyTypes.PathParameters, queryParameters: RenewAuthenticationKeyTypes.QueryParameters, body: MapNeverToUndefined<RenewAuthenticationKeyTypes.RequestBody[RequestMediaType]>, headers: RenewAuthenticationKeyTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const instrumented = this.statsClient.asyncTimer(super.renewAuthenticationKey.bind(this), 'gorillas.renewAuthenticationKey');
        return instrumented({pathParameters, queryParameters, body, headers}, endpointOptions);
    }
}
