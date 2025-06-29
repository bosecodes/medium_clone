import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith, Subject, BehaviorSubject, Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  // Config
  pageSize = 3;

  // Streams
  searchTerm$ = new Subject<string>();
  currentPage$ = new BehaviorSubject<number>(1);

  // Derived streams
  filteredBooks$!: Observable<any[]>;
  pagedBooks$!: Observable<any[]>;
  totalPages$!: Observable<number>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.fetchBooks();
  
    // Creates filteredBooks$ reactive stream:
    this.filteredBooks$ = combineLatest([
      this.bookService.books$,   // emits full book list (mock or API)
      this.searchTerm$.pipe(     // emits search input changes
        startWith(''),           // ensures search starts empty → shows all books initially
        debounceTime(300),       // avoids reacting to every keystroke instantly
        distinctUntilChanged()   // skip unchanged search terms
      )
    ]).pipe(
      map(([books, term]) => {
        const lowerTerm = term.toLowerCase();
        return books.filter(book =>
          book.title.toLowerCase().includes(lowerTerm) ||
          book.author.toLowerCase().includes(lowerTerm)
        );
      })
    );
  
    // Creates totalPages$ reactive stream:
    this.totalPages$ = this.filteredBooks$.pipe(
      map(filtered => Math.max(1, Math.ceil(filtered.length / this.pageSize)))
    );
  
    // Creates pagedBooks$ reactive stream:
    this.pagedBooks$ = combineLatest([
      this.filteredBooks$,
      this.currentPage$
    ]).pipe(
      map(([filtered, currentPage]) => {
        const start = (currentPage - 1) * this.pageSize;
        return filtered.slice(start, start + this.pageSize);
      })
    );
  }
  

  onSearch(term: string) {
    this.currentPage$.next(1); // reset to first page on search
    this.searchTerm$.next(term);
  }

  nextPage(totalPages: number) {
    const curr = this.currentPage$.value;
    if (curr < totalPages) {
      this.currentPage$.next(curr + 1);
    }
  }

  prevPage() {
    const curr = this.currentPage$.value;
    if (curr > 1) {
      this.currentPage$.next(curr - 1);
    }
  }

  ngOnDestroy(): void {
    this.currentPage$.complete();
    this.searchTerm$.complete();
  }

  trackById(index: number, book: any) {
    return book.id;
  }

  // add a dark mode toggle
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

}
