import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'barcode'
})

@Injectable()
export class BarcodeWarehouse1 implements PipeTransform{
	transform(items: any, term: any):any {
		if(term === undefined){
			return items;
		}

		return items.filter(function(item){
			return item.reference.toLowerCase().includes(term.toLowerCase());
			
		});
	}
}

