import { Pipe, PipeTransform } from '@angular/core';




@Pipe({
  name: 'dinamica'
})


export class DinamicaPipe implements PipeTransform {


  transform(items: any): any {
    // if ( term === '' || term === undefined) {
    //   return items;
    // }

    const resultadoConsulta = 0;
    const final = [];
    const otro = [];
    const s = 0;

    // var precio = items.reduce((total, item) => {
    //     return  item;
    // });

    var groupBy = function(miarray, prop, prop2) {
        return miarray.reduce(function(groups, item, item2) {
            const val = item[prop] + item[prop2];
            groups[val] =  groups[val] || {reference: item.reference,  size: item.size, quantity: 0};

            groups[val].quantity += item.quantity;
            
            return groups;
          }, {});
        };
    //     var resultado = Object.values(groupBy(items, 'size '));

    console.log(groupBy(items, 'reference', 'size'));
    // console.log('datos', resultado);
    return Object.values(groupBy(items, 'reference', 'size'));
    

    // items.forEach(category => {
    //     // tslint:disable-next-line:align
    //     if (!final.find(cat => cat.reference === category.reference &&  cat.size === category.size)){
    //         const {code, reference, size } = category;
    //         final.push({code, reference, size});

    //     }
    // });

  }

}
