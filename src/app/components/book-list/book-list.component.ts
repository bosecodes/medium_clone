import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  currentPage = 1;
  pageSize = 5;

  constructor (private bookService: BookService) {}

  ngOnInit(): void {
    this.sub = this.bookService.books$.subscribe(data => this.books = data);
    this.bookService.fetchBooks();

    this.bookService.books$.subscribe(books => {
      this.books = books;
      this.updatePagedBooks();
    })
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
