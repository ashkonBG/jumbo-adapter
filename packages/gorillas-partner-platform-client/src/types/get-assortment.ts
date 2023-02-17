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
}
export type ResponseBody = {
    products?: {
        id?: number;
        title?: string;
        codes?: {
            id?: string;
            type?: string;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
};

