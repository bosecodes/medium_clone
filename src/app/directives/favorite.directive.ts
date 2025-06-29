import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { BookService } from '../services/book.service';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective implements OnInit {

  @Input()
  appFavorite!: number;

  ngOnInit(): void {
    this.updateIcon();
  }
  

  private isFav = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private bookService: BookService) { }

  @HostListener('click')
  toggleFavorite() {
    this.bookService.toggleFavorite(this.appFavorite);
    this.updateIcon();
  }

  private updateIcon() {
    const isFav = this.bookService.isFavorite(this.appFavorite);
    console.log(`Updating icon for book ${this.appFavorite}: ${isFav}`);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', isFav ? '❤️' : '🤍');
  }
  
}
