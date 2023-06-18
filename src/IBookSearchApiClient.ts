import {Book} from "./Books/Models/DTOs/Book";

export interface IBookSearchApiClient {
    getBook(): Promise<Book>;
    getBooksByAuthor(searchQuery: string): Promise<Book>;
}