import {IHttpClient} from "./IHttpClient";
import {Book} from "./Books/Models/DTOs/Book";
import {Logger} from "tslog";
import {BookSearchApiError} from "./BookSearchApiError";
import {AxiosResponse} from "axios";

export class BookSearchApiClient{
    private httpClient!: IHttpClient;
    private logger!: Logger<BookSearchApiClient>;

    constructor(httpClient: IHttpClient, logger: Logger<any>) {
        this.httpClient = httpClient;
        this.logger = logger;
    }

    public async getBooksByAuthor(searchQuery: string): Promise<Book[]>{
        let booksByAuthor: Book[] = [ ];
        if (this.searchQueryIsValid(searchQuery)){
            try {
                const axiosResponse = await this.httpClient
                    .getBySearchQuery(`/${searchQuery}`) as AxiosResponse<Book[]>;

                this.logger.info(this.handleResponse(axiosResponse.status, axiosResponse.statusText));
            } catch (e) {
                this.logger.error(`Error getting books by author: ${(e as BookSearchApiError).message}`);
            }
        } else {
            this.logger.error(`Invalid search query for getBooksByAuthor() - ${searchQuery}`);
        }

        return booksByAuthor;
    }

    public searchQueryIsValid(searchQuery: string): boolean{
        return searchQuery.includes("by-author") &&
            searchQuery.includes("limit") &&
            searchQuery.includes("format");
    }

    public handleResponse(responseCode: number, responseCodeText?: string): string{
        let message: string = "";

        if (responseCode != 200){
            message = `Error getting books by author: response status was
                ${responseCode} ${responseCodeText}`;
        }

        return message;
    }
}