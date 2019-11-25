import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})

@Injectable()
export class SearchPipe implements PipeTransform{
	transform(items: any, term: any):any {
		if(term === undefined){
			console.log('register', items);
			return items;
		}

		return items.filter(function(item){
			return item._id.toLowerCase().includes(term.toLowerCase());
			
		});
	}
}