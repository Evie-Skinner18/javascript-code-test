import {BookSearchApiClient} from "./BookSearchApiClient";
import Axios, {AxiosInstance} from "axios/index";
import {Logger} from "tslog";
import {AxiosClient} from "./AxiosClient";
import {Book} from "./Books/Models/DTOs/Book";


    const axios: AxiosInstance = Axios.create({
        timeout: 30 * 1000,
        baseURL: "http://api.book-seller-example.com",
        headers: {
            "Content-type": "application/json"
        }
    });

const logger: Logger<BookSearchApiClient> = new Logger({ name: "BookSearchClientLogger" });

const axiosClient = new AxiosClient(axios);
const bookSearchClient = new BookSearchApiClient(axiosClient, logger);

const authorName = "Shakespeare";
const limit = 10;
const searchQuery = `/by-author?q=${authorName}&limit=${limit}&format=${axiosClient.responseFormat}`;

const booksByShakespeare: Book[] = await bookSearchClient.getBooksByAuthor(searchQuery);

console.log("Books by Shakespeare: ");
booksByShakespeare.forEach((book: Book) => {
    console.log(book.title);
})
