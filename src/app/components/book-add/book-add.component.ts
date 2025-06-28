import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  constructor(private bookService: BookService) {}

  onSubmit(form: NgForm) {
    this.bookService.addBook(form.value).subscribe();
  }
}
