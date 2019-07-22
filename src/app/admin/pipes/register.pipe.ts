import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'register'
})
export class RegisterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    return items.filter(function(item) {
      return item.name.toLowerCase().includes(term.toLowerCase());
    });
  }

  

  

}
