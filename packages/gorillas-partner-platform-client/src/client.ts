/* eslint-disable */
/**
 * DO NOT CHANGE!
 *
 * This file is generated from the OpenAPI Spec.
 * If changes are necessary, change the spec and regenerate this file.
 */
import { parseTemplate } from 'url-template';

// make sure to generate types by running `hallo-api types`
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

export interface HTTPRequestFunction {
    <T = unknown>(request: {
        url: string;
        method:
            | 'get'
            | 'head'
            | 'post'
            | 'put'
            | 'delete'
            | 'options'
            | 'patch';
        queryParameters?: Record<string, unknown>;
        body: unknown;
        headers: Record<string, unknown>;
    },
    options: ClientOptions): Promise<{
        statusCode: number;
        body: T;
        headers: Record<string, string>;
    }>;
}

const defaultClientOptions: ClientOptions = {
    parseQueryString: true,
};

export class Client {
    private readonly clientOptions: ClientOptions;

    constructor(private readonly HTTPRequestFunction: HTTPRequestFunction, clientOptions: Partial<ClientOptions> = {}) {
        this.clientOptions = {
            ...defaultClientOptions,
            ...clientOptions,
        }
    }

    private expandUrl(url: string, params: any): string {
        return parseTemplate(url).expand(params)
    }

    
    getAssortment<RequestMediaType extends keyof GetAssortmentTypes.RequestBody = keyof GetAssortmentTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: GetAssortmentTypes.PathParameters, queryParameters: GetAssortmentTypes.QueryParameters, body: MapNeverToUndefined<GetAssortmentTypes.RequestBody[RequestMediaType]>, headers: GetAssortmentTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/assortment", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<GetAssortmentTypes.ResponseBody>({
            url,
            method: "get",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    postGeocheck<RequestMediaType extends keyof PostGeocheckTypes.RequestBody = keyof PostGeocheckTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: PostGeocheckTypes.PathParameters, queryParameters: PostGeocheckTypes.QueryParameters, body: MapNeverToUndefined<PostGeocheckTypes.RequestBody[RequestMediaType]>, headers: PostGeocheckTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/geocheck/checkEligibility", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<PostGeocheckTypes.ResponseBody>({
            url,
            method: "post",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    postOrder<RequestMediaType extends keyof PostOrderTypes.RequestBody = keyof PostOrderTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: PostOrderTypes.PathParameters, queryParameters: PostOrderTypes.QueryParameters, body: MapNeverToUndefined<PostOrderTypes.RequestBody[RequestMediaType]>, headers: PostOrderTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/order", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<PostOrderTypes.ResponseBody>({
            url,
            method: "post",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    upsertWebhooks<RequestMediaType extends keyof UpsertWebhooksTypes.RequestBody = keyof UpsertWebhooksTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: UpsertWebhooksTypes.PathParameters, queryParameters: UpsertWebhooksTypes.QueryParameters, body: MapNeverToUndefined<UpsertWebhooksTypes.RequestBody[RequestMediaType]>, headers: UpsertWebhooksTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/partner/webhooks", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<UpsertWebhooksTypes.ResponseBody>({
            url,
            method: "put",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    renewAuthenticationKey<RequestMediaType extends keyof RenewAuthenticationKeyTypes.RequestBody = keyof RenewAuthenticationKeyTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: RenewAuthenticationKeyTypes.PathParameters, queryParameters: RenewAuthenticationKeyTypes.QueryParameters, body: MapNeverToUndefined<RenewAuthenticationKeyTypes.RequestBody[RequestMediaType]>, headers: RenewAuthenticationKeyTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/partner/authentication", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<RenewAuthenticationKeyTypes.ResponseBody>({
            url,
            method: "put",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
}
