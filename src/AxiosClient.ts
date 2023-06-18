import {AxiosInstance, AxiosResponse} from "axios";
import {IHttpClient} from "./IHttpClient";
import {ResponseFormat} from "./ResponseFormat";

export class AxiosClient implements IHttpClient{
    private axios!: AxiosInstance;
    public responseFormat = ResponseFormat.json;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public async get(resource: string): Promise<AxiosResponse>{
        return await this.axios.get(`${resource}/`);
    }

    public async post(resource: string, data: unknown): Promise<AxiosResponse> {
        return await this.axios.post(resource, data);
    }

    public async put(resource: string ,data: unknown): Promise<AxiosResponse> {
        return await this.axios.put(resource, data);
    }

    public async getBySearchQuery(searchQuery: string): Promise<AxiosResponse> {
        return await this.axios.get(searchQuery);
    }
}