import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'register'
})

@Injectable()
export class RegisterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    return items.filter(function(item) {
      return item.code.toLowerCase().includes(term.toLowerCase());
      
    });
  }

  

  

}
