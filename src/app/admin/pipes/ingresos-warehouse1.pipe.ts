import { Pipe, PipeTransform } from '@angular/core';




@Pipe({
  name: 'ingresos'
})


export class IngresosWarehouse1Pipe implements PipeTransform {


  transform(items: any, term: any): any {
    if ( term === '' || term === undefined) {
      return items;
    }
    

    const resultadoConsulta = [];
    for ( const post of items ) {
      if (post.code === term) {
        resultadoConsulta.push(post);
        
        }
    }
    return resultadoConsulta;
  }

}
