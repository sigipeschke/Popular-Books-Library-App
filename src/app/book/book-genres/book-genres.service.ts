import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, map, tap, catchError, throwError, combineLatest, shareReplay } from "rxjs";
import { BookGenre } from "./book-genre";

@Injectable({
    providedIn: "root"
})

export class BookGenresService {
    private bookGenresUrl = "book-genres/book-genres-data";

    bookGenres$ = this.http.get<BookGenre[]>(this.bookGenresUrl)
        .pipe(
            tap(d => console.log("Genres:", JSON.stringify(d))),
            catchError(this.handleError)
        );

    constructor (private http: HttpClient) {}

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