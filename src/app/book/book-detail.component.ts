import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { BookService } from './book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  errorMessage = "";

  book$ = this.bookService.selectedBook$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )


  constructor(private bookService: BookService) { }

}
