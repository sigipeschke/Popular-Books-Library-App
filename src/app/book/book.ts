// https://github.com/scostap/goodreads_bbe_dataset/blob/main/README.md
// https://www.convertcsv.io/products/csv2json

export interface Book {
    bookId: string;
    title: string;
    series: string;
    author: string;
    rating: number;
    description: string;
    language: string;
    isbn: string;
    genres: string[];
    characters: string[];
    bookFormat: string;
    edition: string;
    pages: number;
    publisher: string;
    publishDate: string;
    firstPublishDate: string;
    awards: string[];
    numRatings: number;
    ratingsByStars: number[];
    likedPercent: number;
    setting: string[];
    coverImg: string;
    bbeScore: number;
    bbeVotes: number;
    price: number;
}