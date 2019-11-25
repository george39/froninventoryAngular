import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchId'
})
export class SearchIdPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined || term === '') {
			return items;
		}
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
