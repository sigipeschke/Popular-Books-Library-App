import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap, catchError, EMPTY } from 'rxjs';
import { Book } from './book';
import { BookService } from './book.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  genresList: string[] = ["Action", "Adventure", "Childrens", "Classics", "Comedy", "Contemporary", "Drama", "Fantasy", "Fiction", "Historical", "Literature", "Magic", "Novel", "Paranormal", "Poetry", "Romance", "School", "Short Stories", "Supernatural", "Thriller", "War"];
  ratingList: any[] = [["", 0], ["☆☆☆☆☆", 4.5], ["☆☆☆☆", 4], ["☆☆☆", 3], ["☆☆", 2], ["☆", 1]];
  errorMessage = "";

  books$ = this.bookService.books$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  selectedBook$ = this.bookService.selectedBook$;



  private titleSelectedSubject = new BehaviorSubject<string>("");
  titleSelectedAction$ = this.titleSelectedSubject.asObservable();

  private _titleFilter: string = "";
  get titleFilter(): string {
    return this._titleFilter;
  }
  set titleFilter(a: string) {
    this._titleFilter = a;
    this.titleSelectedSubject.next(a);
  }

  booksByTitle$ = combineLatest([
    this.bookService.books$,
    this.titleSelectedAction$
  ]).pipe(
    map(([books, title]) => books.filter(book => 
      book.title.toLocaleLowerCase().includes(title.toLowerCase())
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );



  private authorSelectedSubject = new BehaviorSubject<string>("");
  authorSelectedAction$ = this.authorSelectedSubject.asObservable();

  private _authorFilter: string = "";
  get authorFilter(): string {
    return this._authorFilter;
  }
  set authorFilter(a: string) {
    this._authorFilter = a;
    this.authorSelectedSubject.next(a);
  }

  booksByAuthor$ = combineLatest([
    this.bookService.books$,
    this.authorSelectedAction$
  ]).pipe(
    map(([books, author]) => books.filter(book => 
      book.author.toLocaleLowerCase().includes(author.toLowerCase())
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );  



  private genreSelectedSubject = new BehaviorSubject<string>("");
  genreSelectedAction$ = this.genreSelectedSubject.asObservable();
  
  booksByGenre$ = combineLatest([
    this.bookService.books$,
    this.genreSelectedAction$
  ]).pipe(
    map(([books, selectedGenreId]) => books.filter(book => book.genres.includes(selectedGenreId))),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );



  private ratingSelectedSubject = new BehaviorSubject<number>(0);
  ratingSelectedAction$ = this.ratingSelectedSubject.asObservable();

  booksByRating$ = combineLatest([
    this.bookService.books$,
    this.ratingSelectedAction$
  ]).pipe(
    map(([books, selectedRating]) => books.filter(book => book.rating >= selectedRating)),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );



  filteredBooks$ = combineLatest([
    this.bookService.books$,
    this.booksByTitle$,
    this.booksByAuthor$,
    this.booksByGenre$,
    this.booksByRating$
  ]).pipe(
    map(([books, titleFiltered, authorFiltered, genreFiltered, ratingFiltered]) => 
      books.filter(book => 
        titleFiltered.some(b => b.bookId === book.bookId) &&
        authorFiltered.some(b => b.bookId === book.bookId) &&
        genreFiltered.some(b => b.bookId === book.bookId) &&
        ratingFiltered.some(b => b.bookId === book.bookId)
        )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.selectBook("");
  }

  bookSelected(bookId: string): void {
    this.bookService.selectBook(bookId);
  }

  genreSelected(g: string): void {
    this.genreSelectedSubject.next(g);
  }

  ratingSelected(r: number): void {
    this.ratingSelectedSubject.next(r);
  }

}
