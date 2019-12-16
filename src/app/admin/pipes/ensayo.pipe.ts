import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ensayo'
})
export class EnsayoPipe implements PipeTransform {

  transform(items: any): any {
    var s = [];
    var result={};
    for(var key of items){
      s.push(key);
    }
    
    var groupBy = function(miarray, prop, prop2) {
      return miarray.reduce(function(groups, item, item2) {
        
        const val = item[prop] + item[prop2];
        groups[val] =  groups[val] || {reference: item.reference,  size: item.size, quantity: 0};
        
        groups[val].quantity += item.quantity;
        
       
        return groups;
        
          }, {});
        };
    //     var resultado = Object.values(groupBy(items, 'size '));
    console.log('result', s);
    console.log('groups', groupBy(items, 'reference', 'size'));
    return Object.values(groupBy(items, 'reference', 'size'));

  }

  }


