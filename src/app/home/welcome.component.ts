import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap, catchError, EMPTY } from 'rxjs';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WelcomeComponent implements OnInit {
  errorMessage = "";

  books$ = this.bookService.books$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksTopPicks$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.likedPercent >= 97.0))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksHighlyRated$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.rating >= 4.0))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksAwardWinners$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.awards.length >= 400))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksGAdventure$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.genres.includes("Adventure")))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksGRomance$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.genres.includes("Romance")))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksGClassics$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.genres.includes("Classics")))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  booksGChildrens$ = this.bookService.books$
    .pipe(
      map(books => this.shuffle(books.filter(book => book.genres.includes("Childrens")))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  selectedBook$ = this.bookService.selectedBook$;
  
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.selectBook("");
  }

  shuffle(a: any[]): any[] {
    return a.sort(() => Math.random() - 0.5);
  }

  bookSelected(bookId: string): void {
    this.bookService.selectBook(bookId);
  }
}
