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
        streetName: string;
        streetNumber: string;
        postalCode?: string;
        city: string;
        [k: string]: unknown;
    };
}
export type ResponseBody = ({
    isEligible: true;
    quickCommerceWarehouseId?: string;
    deliveryEta?: number;
    storeOpen?: boolean;
    [k: string]: unknown;
} | {
    isEligible: false;
    error: {
        code?: string;
        message: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
});

