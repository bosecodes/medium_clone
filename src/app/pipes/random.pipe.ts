import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'random',
  pure: false
})
export class RandomPipe implements PipeTransform {

  transform(value: string): string {
    return value + ' #' + Math.floor(Math.random() * 1000);
  }
  
}
