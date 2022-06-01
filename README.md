# BookLibrary

This angular project utilizes PrimeNG carousels and dataview to navigate a 1000 book dataset. The goal was to implement knowledge learned through introductory angular courses. 

Data is extracted from a 50000+ book csv file and stored in a .json file, retrieved using http get and accessible through an observable. Filters are applied using combineLatest so the data may be displayed using async pipes. User form fields are utilized for filtering and navigating the dataset.

See the project live here: https://popular-book-library-app.herokuapp.com/home
