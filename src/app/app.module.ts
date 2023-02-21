import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { BookListComponent } from './book/book-list.component';
import { BookDetailComponent } from './book/book-detail.component';

import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { BookService } from './book/book.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BookListComponent,
    BookDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    DataViewModule,
    DialogModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
