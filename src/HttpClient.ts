import {AxiosInstance} from "axios";
import { Logger } from "tslog";
import {IHttpClient} from "./IHttpClient";

export class AxiosClient implements IHttpClient{

    private logger!: Logger<string>;
    private axios!: AxiosInstance;

    constructor(logger: Logger<string>, axios: AxiosInstance) {
        this.logger = logger;
        this.axios = axios;
    }

    public async get(resource: string): Promise<any>{
        this.logger.info(`Getting ${resource}...`);
        return await this.axios.get(`${resource}/`);
    }

    post(resource: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    put(resource: string): Promise<any> {
        return Promise.resolve(undefined);
    }
}