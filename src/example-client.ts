import Axios, {AxiosInstance} from 'axios/index';
import {Logger} from 'tslog';
import {Book} from './Books/Models/DTOs/Book';
import { RestHttpClient } from './RestHttpClient';
import { ResponseFormat } from './ResponseFormat';

const baseUrl = 'http://api.book-seller-example.com';

const axios: AxiosInstance = Axios.create({
    timeout: 30 * 1000,
    baseURL: baseUrl ,
    headers: {
        'Content-type': 'application/json'
    }
});

const jsonFormat = ResponseFormat.json;

const logger: Logger<RestHttpClient> = new Logger({ name: 'BookSearchClientLogger' });

const bookSearchClient = new RestHttpClient(baseUrl, axios, jsonFormat, logger);

const authorName = "Shakespeare";
const limit = 10;
const searchQuery = `/by-author?q=${authorName}&limit=${limit}&format=${jsonFormat}`;

const booksByShakespeare: Book[] = await bookSearchClient.getWithAxios(searchQuery);

console.log('Books by Shakespeare: ');
booksByShakespeare.forEach((book: Book) => {
    console.log(book.title);
})
