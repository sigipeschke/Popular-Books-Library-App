import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, map, tap, catchError, throwError, combineLatest, shareReplay } from "rxjs";
import { Book } from "./book";

@Injectable({
    providedIn: "root"
})

export class BookService {
    booksUrl = "assets/best_books.json"

    books$ = this.http.get<Book[]>(this.booksUrl)
        .pipe(
            catchError(this.handleError),
            shareReplay(1)
        );

    private bookSelectedSubject = new BehaviorSubject<string>("");
    bookSelectedAction$ = this.bookSelectedSubject.asObservable();

    selectedBook$ = combineLatest([
        this.books$,
        this.bookSelectedAction$
    ]).pipe(
        map(([books, selectedBookId]) =>
            books.find(book => book.bookId === selectedBookId)
        )
    );

    constructor (private http: HttpClient) {}

    selectBook(selectedBookId: string): void {
        this.bookSelectedSubject.next(selectedBookId);
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.message}`;
        }
        console.error(err);
        return throwError(() => errorMessage);
        }
    }