import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, EMPTY, map, Observable, startWith, Subject, Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: any[] = [];

  sub!: Subscription;

  pagedBooks: any[] = [];

  // implementing pagination
  currentPage = 1;
  pageSize = 5;

  // implementing a search filter
  books$ = this.bookService.books$;
  searchTerm$ = new Subject<string>();
  filteredBooks$: Observable<any[]> = EMPTY;
  searchText='';

  
  constructor (private bookService: BookService) {}

  ngOnInit(): void {
    this.sub = this.bookService.books$.subscribe(data => this.books = data);
    this.bookService.fetchBooks();

    this.bookService.books$.subscribe(books => {
      this.books = books;
      this.updatePagedBooks();
    });

    this.filteredBooks$ = combineLatest([
      this.books$,
      this.searchTerm$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith('') // show all at first
      )
    ]).pipe(
      map(([books, term]) => {
        term = term.toLowerCase();
        return books.filter(book =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      })
    );
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  updatePagedBooks() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBooks = this.books.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.books.length) {
      this.currentPage++;
      this.updatePagedBooks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedBooks();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  totalPages(): number {
    return Math.ceil(this.books.length / this.pageSize);
  }
  
  trackById(index: number, book: any) {
    return book.id;
  }


}
