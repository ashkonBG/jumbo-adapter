/* eslint-disable */
/**
 * DO NOT CHANGE!
 *
 * This file is generated from the OpenAPI Spec.
 * If changes are necessary, change the spec and regenerate this file.
 */

export interface RequestHeaders {
    [k: string]: unknown;
}
export interface Cookies {
    [k: string]: unknown;
}
export interface PathParameters {
    [k: string]: unknown;
}
export interface QueryParameters {
    [k: string]: unknown;
}
export interface RequestBody {
    "application/json": {
        partnerOrderId?: string;
        storeId?: number;
        created?: string;
        customer?: {
            firstName?: string;
            lastName?: string;
            phone?: string;
            email?: string;
            [k: string]: unknown;
        };
        address?: {
            streetName?: string;
            streetNumber?: string;
            postalCode?: string;
            countryCode?: string;
            city?: string;
            [k: string]: unknown;
        };
        items?: {
            id?: number;
            name?: string;
            quantity?: number;
            [k: string]: unknown;
        }[];
        payment?: {
            amount?: number;
            currencyCodeIso?: string;
            [k: string]: unknown;
        };
        deliveryNotes?: string;
        promisedETA?: number;
        [k: string]: unknown;
    };
}
export type ResponseBody = {
    id?: string;
    partnerOrderId?: string;
    state?: string;
    stateChangedOn?: string;
    [k: string]: unknown;
};

