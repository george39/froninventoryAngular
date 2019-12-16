import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReference'
})
export class SearchReferencePipe implements PipeTransform {

  transform(items: any, term: any): any {
		if(term === undefined) {
			return items;
		}
		
		
		return items.filter(function(item){
			return item.reference.toLowerCase().includes(term.toLowerCase());
			
		});
	}

}
