export interface IHttpClient {
    get(resource: string): Promise<any>;
    post(resource: string): Promise<any>;
    put(resource: string): Promise<any>;
}