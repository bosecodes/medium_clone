import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { 
    this.loadFavorites();
  }

  private booksUrl = 'https://jsonplaceholder.typicode.com/posts';
  private booksSubject = new BehaviorSubject<any[]>([]);
  books$ = this.booksSubject.asObservable();

  private mockBooks = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 6, title: 'Moby Dick', author: 'Herman Melville' },
    { id: 7, title: 'War and Peace', author: 'Leo Tolstoy' },
    { id: 8, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { id: 9, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 10, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 11, title: 'Jane Eyre', author: 'Charlotte Brontë' },
    { id: 12, title: 'Wuthering Heights', author: 'Emily Brontë' },
    { id: 13, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 14, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 15, title: 'Animal Farm', author: 'George Orwell' },
    { id: 16, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
    { id: 17, title: 'Les Misérables', author: 'Victor Hugo' },
    { id: 18, title: 'The Odyssey', author: 'Homer' },
    { id: 19, title: 'Frankenstein', author: 'Mary Shelley' },
    { id: 20, title: 'Dracula', author: 'Bram Stoker' }
  ].map(book => ({
    ...book,
    imageUrl: this.generateRandomImageUrl()
  }));;
  

  fetchBooks(): void {
    // for api call use the commented approach
    // this.http.get<any[]>(this.booksUrl)
    //   .pipe(
    //     map(books => books.filter(b => b.id <= 10))
    //   )
    //   .subscribe(books => this.booksSubject.next(books));
    this.booksSubject.next(this.mockBooks);
  }

  getBook(id: number): Promise<any> {
    return this.http.get(`${this.booksUrl}/${id}`).toPromise();
  }

  // for api call this is the approach, to test it, we are using
  // mock array for second appraoch
  // addBook(book: any): Observable<any> {
  //   // not use this since if i do, then book will be add randomly to the api server 
  //   // cant see it in list component
  //   // return this.http.post(this.booksUrl, book); as an observable

  //   return this.http.post<any>(this.booksUrl, book).pipe(
  //     map(addedBook => {
  //       const currentBooks = this.booksSubject.value;
  //       this.booksSubject.next([...currentBooks, addedBook]);
  //       return addedBook;
  //     })
  //   )
  // }

  addBook(book: any): Observable<any> {
    const newBook = {
      ...book,
      id: this.generateId(),
      imageUrl: this.generateRandomImageUrl()
    };
    
    this.mockBooks.push(newBook);
    this.booksSubject.next([...this.mockBooks]);
    return of(newBook);
  }

  private generateRandomImageUrl(): string {
    return `https://picsum.photos/600?random=${Math.floor(Math.random() * 1000)}`;
  }
  
  private generateId(): number {
    return this.mockBooks.length > 0
      ? Math.max(...this.mockBooks.map(b => b.id)) + 1
      : 1;
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.booksUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.booksUrl}/${id}`);
  }

  private favoriteIds = new Set<number>();

  toggleFavorite(id: number) {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }
    this.saveFavorites();
  }
  
  isFavorite(id: number): boolean {
    return this.favoriteIds.has(id);
  }
  
  private saveFavorites() {
    localStorage.setItem('favoriteIds', JSON.stringify(Array.from(this.favoriteIds)));
  }
  
  private loadFavorites() {
    const data = localStorage.getItem('favoriteIds');
    if (data) {
      this.favoriteIds = new Set<number>(JSON.parse(data));
    }
  }
}
