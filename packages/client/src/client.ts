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
    GetHealthTypes,
    GetLivenessTypes,
    CreateFulfillmentOrderTypes,
    ValidateAddressEligibilityTypes,
    ValidateOrderEligibilityTypes,
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

    
    getHealth<RequestMediaType extends keyof GetHealthTypes.RequestBody = keyof GetHealthTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: GetHealthTypes.PathParameters, queryParameters: GetHealthTypes.QueryParameters, body: MapNeverToUndefined<GetHealthTypes.RequestBody[RequestMediaType]>, headers: GetHealthTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/health/service", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<GetHealthTypes.ResponseBody>({
            url,
            method: "get",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    getLiveness<RequestMediaType extends keyof GetLivenessTypes.RequestBody = keyof GetLivenessTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: GetLivenessTypes.PathParameters, queryParameters: GetLivenessTypes.QueryParameters, body: MapNeverToUndefined<GetLivenessTypes.RequestBody[RequestMediaType]>, headers: GetLivenessTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/health/instance", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<GetLivenessTypes.ResponseBody>({
            url,
            method: "get",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    createFulfillmentOrder<RequestMediaType extends keyof CreateFulfillmentOrderTypes.RequestBody = keyof CreateFulfillmentOrderTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: CreateFulfillmentOrderTypes.PathParameters, queryParameters: CreateFulfillmentOrderTypes.QueryParameters, body: MapNeverToUndefined<CreateFulfillmentOrderTypes.RequestBody[RequestMediaType]>, headers: CreateFulfillmentOrderTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/fulfillment-order", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<CreateFulfillmentOrderTypes.ResponseBody>({
            url,
            method: "post",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    validateAddressEligibility<RequestMediaType extends keyof ValidateAddressEligibilityTypes.RequestBody = keyof ValidateAddressEligibilityTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: ValidateAddressEligibilityTypes.PathParameters, queryParameters: ValidateAddressEligibilityTypes.QueryParameters, body: MapNeverToUndefined<ValidateAddressEligibilityTypes.RequestBody[RequestMediaType]>, headers: ValidateAddressEligibilityTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/validate-eligibility/address", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<ValidateAddressEligibilityTypes.ResponseBody>({
            url,
            method: "put",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
    validateOrderEligibility<RequestMediaType extends keyof ValidateOrderEligibilityTypes.RequestBody = keyof ValidateOrderEligibilityTypes.RequestBody>({pathParameters, queryParameters, body, headers}: {pathParameters: ValidateOrderEligibilityTypes.PathParameters, queryParameters: ValidateOrderEligibilityTypes.QueryParameters, body: MapNeverToUndefined<ValidateOrderEligibilityTypes.RequestBody[RequestMediaType]>, headers: ValidateOrderEligibilityTypes.RequestHeaders}, endpointOptions?: Partial<ClientOptions>) {
        const options = {
            ...this.clientOptions,
            ...endpointOptions,
        }
        let url = this.expandUrl("/validate-eligibility/order", pathParameters);
        if (options.parseQueryString) {
            url = url + this.expandUrl("{?}", queryParameters);
        }

        return this.HTTPRequestFunction<ValidateOrderEligibilityTypes.ResponseBody>({
            url,
            method: "put",
            queryParameters: options.parseQueryString ? undefined : queryParameters,
            body,
            headers,
        }, options)
    }
    
}
