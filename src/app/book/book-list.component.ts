import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap, catchError, EMPTY } from 'rxjs';
import { Book } from './book';
import { BookGenresService } from './book-genres/book-genres.service';
import { BookService } from './book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  genresList: string[] = ["Fantasy", "Romance", "Classics", "Adventure", "Childrens"];
  errorMessage = "";

  books$ = this.bookService.books$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  
  // genres$ = this.bookGenresService.bookGenres$
  //   .pipe(
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   );

  private genreSelectedSubject = new BehaviorSubject<string>("");
  genreSelectedAction$ = this.genreSelectedSubject.asObservable();
  
  booksByGenre$ = combineLatest([ // This is not updating when the observable updates?
    this.books$,
    this.genreSelectedAction$
  ]).pipe(
    tap(([books, selectedGenredId]) => console.log("Genre Selected:", selectedGenredId)),
    map(([books, selectedGenreId]) =>
      books.filter(book =>
        book.genres.filter(g => selectedGenreId ? g === selectedGenreId : true)
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedBook$ = this.bookService.selectedBook$;

  constructor(private bookService: BookService,
              private bookGenresService: BookGenresService) {}

  ngOnInit(): void {
    // console.log("In OnInit");
  }

  bookSelected(bookId: string): void {
    this.bookService.selectBook(bookId);
  }

  genreSelected(g: string): void {
    this.genreSelectedSubject.next(g);
  }
}
