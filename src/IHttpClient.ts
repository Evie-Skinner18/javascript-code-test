import {ResponseFormat} from "./ResponseFormat";

export interface IHttpClient {
    responseFormat: ResponseFormat;

    get(resource: string): Promise<any>;
    getBySearchQuery(searchQuery: string): Promise<any>;
    post(resource: string, payload: unknown): Promise<any>;
    put(resource: string, payload: unknown): Promise<any>;
}