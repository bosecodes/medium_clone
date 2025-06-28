import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, AfterViewInit{
  form!: FormGroup;

  @ViewChild('titleInput') titleInput: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:[''],
      body:['']
    });

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).then(book => {
      this.form.patchValue(book);
    });
  }

  ngAfterViewInit(): void {
    console.log('Title Input: ', this.titleInput)
  }

}
