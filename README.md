# Bookworms Haven

## Description

Bookworms Haven is an exciting journey into the world of literature. Discover your next favorite book from a wide selection of popular titles, expertly curated into different categories like Top Picks, Highly Rated, Award Winners, and various Genres. Dive into the sea of books and find your treasure with a powerful search feature. This project is an excellent way to explore new books, find your next read and expand your literary horizons.

See the project live here: https://popular-book-library-app.herokuapp.com/home

## Features

The feature page presents books in a visually appealing way, with carousels of different curated categories such as Top Picks, Highly Rated, Award Winners, and various Genres.

A search page that allows users to filter the books based on Title, Author, Genre, or Rating.

The detail page, which appears as a modal popup when selecting a book, provides specific information about the book, including a description and a link to purchase the book on Amazon.

Data is extracted from a 50000+ book csv file and stored in a .json file, retrieved using http get and accessible through an observable. Filters are applied using combineLatest so the data may be displayed using async pipes. User form fields are utilized for filtering and navigating the dataset.

## Technologies

HTML, CSS, TypeScript, Angular, PrimeNG, RxJS

## Screenshots

### Feature Page

![alt text](https://github.com/sigipeschke/Popular-Books-Library-App/blob/master/src/assets/library-img-1.PNG)
<br /><br />

### Search Page

![alt text](https://github.com/sigipeschke/Popular-Books-Library-App/blob/master/src/assets/library-img-2.PNG)
<br /><br />

### Detail Modal

![alt text](https://github.com/sigipeschke/Popular-Books-Library-App/blob/master/src/assets/library-img-3.PNG)
<br /><br />

## Getting Started

### Install dependencies

Run `npm install`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
