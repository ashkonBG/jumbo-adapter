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
        customer: {
            name: string;
            surname: string;
            surnamePrefix?: string;
            contact: {
                phone?: string;
                [k: string]: unknown;
            };
            [k: string]: unknown;
        };
        address?: {
            streetName: string;
            streetNumber: string;
            postalCode?: string;
            city: string;
            [k: string]: unknown;
        };
        location?: {
            latitude: number;
            longitude: number;
            [k: string]: unknown;
        };
        order: {
            referenceId?: string;
            orderLines?: [
                {
                    ean: string;
                    quantity: number;
                    [k: string]: unknown;
                },
                ...({
                    ean: string;
                    quantity: number;
                    [k: string]: unknown;
                })[]
            ];
            [k: string]: unknown;
        };
        deliveryNotes?: string;
        mfcStoreId?: string;
        [k: string]: unknown;
    };
}
export type ResponseBody = undefined;

