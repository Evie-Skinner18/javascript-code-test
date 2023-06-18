import {Book} from "../Books/Models/DTOs/Book";
import {BookSearchApiClient} from "../BookSearchApiClient";
import {Logger} from "tslog";
import {IHttpClient} from "../IHttpClient";

const theMetamorphosis= new Book();
theMetamorphosis.isbn = "1234";
theMetamorphosis.author = "Franz Kafka";
theMetamorphosis.title = "The Metamorphosis";
theMetamorphosis.price = "£5";
theMetamorphosis.quantity = "1";

const aCountryDoctor= new Book();
aCountryDoctor.isbn = "6584";
aCountryDoctor.author = "Franz Kafka";
aCountryDoctor.title = "A Country Doctor";
aCountryDoctor.price = "£2";
aCountryDoctor.quantity = "1";

const mockHttpClient: IHttpClient = {
    get: jest.fn().mockResolvedValue(theMetamorphosis),
    getBySearchQuery: jest.fn().mockResolvedValue([ theMetamorphosis,  aCountryDoctor]),
    post: jest.fn(),
    put: jest.fn()
};


const logger: Logger<BookSearchApiClient> = new Logger({ name: "BookSearchLogger" });
const bookSearchApiClient = new BookSearchApiClient(mockHttpClient, logger);

test("getBooksByAuthor() - Should invoke the IHttpClient\'s getBySearchQuery() method", async() => {// asser
    const searchQuery =
        "http://api.book-seller-example.com/by-author?q=kafka&limit=5&format=json";

    await bookSearchApiClient.getBooksByAuthor(searchQuery);

    expect(mockHttpClient.getBySearchQuery).toHaveBeenCalledTimes(1);
});

test("searchQueryIsValid() - Should return true when the search query contains the \'by-author' parameter", () => {// asser
    const searchQuery =
        "http://api.book-seller-example.com/by-author?q=kafka&limit=5&format=json";

    expect(bookSearchApiClient.searchQueryIsValid(searchQuery)).toBe(true);
});


test("handleResponse() - Should return an error message when the status code is not 200", () => {// asser
    const statusCode = 500;
    const message = bookSearchApiClient.handleResponse(statusCode);

    const isErrorMessage = message.includes("Error");

    expect(isErrorMessage).toBe(true);
});