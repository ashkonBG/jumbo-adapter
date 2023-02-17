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
        scope?: string;
        [k: string]: unknown;
    };
}
export type ResponseBody = {
    secret?: string;
    scope?: string;
    validUntil?: string;
    [k: string]: unknown;
} | {
    error?: {
        code?: string;
        message?: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};

