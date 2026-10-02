import { AxiosInstance } from "axios";
import {ResponseFormat} from "./ResponseFormat";
import { Logger } from "tslog";

// todo: I added support for fetch() by changing this class which was naughty!
// correct my mistake
export class RestHttpClient {
    private baseUrl: string;
    private axios: AxiosInstance;
    private responseFormat: ResponseFormat;
    private logger: Logger<RestHttpClient>;

    constructor(baseUrl: string, axios: AxiosInstance, responseFormat: ResponseFormat, logger: Logger<RestHttpClient>) {
        this.baseUrl = baseUrl;
        this.axios = axios;
        this.responseFormat = responseFormat;
        this.logger = logger;
    }

    public async getWithAxios(resource: string): Promise<any> {
        return await this.axios.get(`${resource}/`)
    }
    
    public async postWithAxios(resource: string, payload: unknown): Promise<any> {
        return await this.axios.post(resource, payload)
    }

    public async putWithAxios(resource: string, payload: unknown): Promise<any> {
        return await this.axios.put(resource, payload)
    }

    public async getWithFetch(resource: string): Promise<any> {
        return await fetch(`${this.baseUrl}/${resource}`, {
            method: 'GET',
            headers: {
                Accept: `application/${this.responseFormat}`,
            },
        });
    }

    public async postWithFetch(resource: string): Promise<any> {
        return await fetch(`${this.baseUrl}/${resource}`, {
            method: 'POST',
            headers: {
                Accept: `application/${this.responseFormat}`,
            },
        });
    }
}