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
    

    // var precio = items.reduce((total, item) => {
    //     return  item;
    // });

    // var groupBy = function(miarray, prop, prop2) {
    //     return miarray.reduce(function(groups, item, item2) {
    //         const val = item[prop] + item[prop2];
    //         groups[val] =  groups[val] || {reference: item.reference,  size: item.size, quantity: 0};

    //         groups[val].quantity += item.quantity;
            
    //         return groups;
    //       }, {});
    //     };
    // //     var resultado = Object.values(groupBy(items, 'size '));

    // console.log(groupBy(items, 'reference', 'size'));
    // // console.log('datos', resultado);
    // return Object.values(groupBy(items, 'reference', 'size'));
    
    var a = [];
    // var rep = '543';
    // delete items[rep];
    var groupBy = function(miarray, prop, prop2, prop3) {
      return miarray.reduce(function(groups, item) {
          const val = item[prop];

          if (item.size === '33') {
            item.trestres = 0.5;
          }

          if (item.size === '34') {
            item.trescuatro = 0.5;
          }

          if (item.size === '35') {
            item.trescinco = 0.5;
          }

          if (item.size === '36') {
            item.tresseis = 0.5;
          }

          if (item.size === '37') {
            item.tressiete = 0.5;
          }

          if (item.size === '38') {
            item.tresocho = 0.5;
          }

          if (item.size === '39') {
            item.tresnueve = 0.5;
          }
          if (item.size === '40') {
            item.cuarenta = 0.5;
          }

          if (item.size === '41') {
            item.cuarentayuno = 0.5;
          }

          if (item.size === '42') {
            item.cuarentaydos = 0.5;
          }

          if (item.size === '43') {
            item.cuarentaytres = 0.5;
          }

          if (item.size === '44') {
            item.cuarentaycutro = 0.5;
          }

          if (item.size === '45') {
            item.cuarentaycinco = 0.5;
          }

          if (item.size === '46') {
            item.cuarentayseis = 0.5;
          }

          if (item.size === '47') {
            item.cuarentaysiete = 0.5;
          }
          groups[val] =  groups[val] || {reference: item.reference, operator: item.operator,
               trestres: 0, trescuatro: 0, trescinco: 0, tresseis: 0, tressiete: 0,
               tresocho: 0, tresnueve: 0,  cuarenta: 0, cuarentayuno: 0, cuarentaydos: 0,
               cuarentaytres: 0, cuarentaycuatro: 0, cuarentaycinco: 0, cuarentayseis: 0,
               cuarentaysiete: 0};
          
          
          
          groups[val].trestres += item.trestres;
          groups[val].trescuatro += item.trescuatro;
          groups[val].trescinco += item.trescinco;
          groups[val].tresseis += item.tresseis;
          groups[val].tressiete += item.tressiete;
          groups[val].tresocho += item.tresocho;
          groups[val].tresnueve += item.tresnueve;
          groups[val].cuarenta += item.cuarenta;
          groups[val].cuarentayuno += item.cuarentayuno;
          groups[val].cuarentaydos += item.cuarentaydos;
          groups[val].cuarentaytres += item.cuarentaytres;
          groups[val].cuarentaycutro += item.cuarentaycutro;
          groups[val].cuarentaycinco += item.cuarentaycinco;
          groups[val].cuarentayseis += item.cuarentayseis;
          groups[val].cuarentaysiete += item.cuarentaysiete;
          
          return groups;
        }, {});
      };
      
    
    
    console.log('items', items);
  //     var resultado = Object.values(groupBy(items, 'size '));
    console.log(groupBy(items, 'reference', 'tresocho', 'cuarenta'));
  // console.log('datos', resultado);
    var s =  Object.values(groupBy(items, 'reference', 'trestres',
     'tresocho' ));
    
    return s;
   
    

    // items.forEach(category => {
    //     // tslint:disable-next-line:align
    //     if (!final.find(cat => cat.reference === category.reference &&  cat.size === category.size)){
    //         const {code, reference, size } = category;
    //         final.push({code, reference, size});

    //     }
    // });

  }

}
