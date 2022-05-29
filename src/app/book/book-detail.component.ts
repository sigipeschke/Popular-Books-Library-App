import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { BookService } from './book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  amazonLink = "";
  errorMessage = "";

  book$ = this.bookService.selectedBook$
    .pipe(
      tap((book) => this.amazonBook(book?.title)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

  clearBook(): void {
    this.bookService.selectBook("");
  }

  amazonBook(title?: string): void {
    this.amazonLink = "https://www.amazon.com/s?k=" + title?.split(" ").join("+").toLocaleLowerCase() + "&i=stripbooks-intl-ship";
  }

  constructor(private bookService: BookService) { }

}
