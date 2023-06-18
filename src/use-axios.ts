import {AxiosClient} from "./HttpClient";
import Axios, {AxiosInstance} from "axios";
import {Logger} from "tslog";

const axios: AxiosInstance = Axios.create({
    timeout: 30 * 1000,
    baseURL: "localhost",
    headers: {
        "Content-type": "application/json"
    }
});

const logger: Logger<string> = new Logger({ name: "myLogger" });

const axiosClient = new AxiosClient(logger, axios);