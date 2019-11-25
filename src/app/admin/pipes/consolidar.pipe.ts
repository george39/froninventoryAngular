import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consolidar'
})
export class ConsolidarPipe implements PipeTransform {

  transform(items: any): any {
    var s = [];

    var groupBy = function(miarray, prop, prop2) {
      s.push(miarray);
        return miarray.reduce(function(groups, item, item2) {
            const val = item[prop] + item[prop2];
            groups[val] =  groups[val] || {reference: item.reference,  size: item.size, quantity: 0};

            groups[val].quantity += item.quantity;
            
            return groups;
          }, {});
        };
    //     var resultado = Object.values(groupBy(items, 'size '));

    
    console.log(groupBy(items, 'reference', 'size'));
    return Object.values(groupBy(items, 'reference', 'size'));
  }

}
