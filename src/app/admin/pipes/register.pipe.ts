import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'register'
})

@Injectable()
export class RegisterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    const result = [];
    term = JSON.parse(term);
    for (const post of items) {
      if (post._id === term) {
        result.push(post);
      }
    }
    return result;

  }

}
