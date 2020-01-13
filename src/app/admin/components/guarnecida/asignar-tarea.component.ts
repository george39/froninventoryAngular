
import { Component, OnInit, ViewChild, ElementRef, DoCheck} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, from } from 'rxjs';
import { catchError, subscribeOn } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';
import { TestObject } from 'protractor/built/driverProviders';
import swal from 'sweetalert';





@Component({
  selector: 'app-asignar-tarea',
  templateUrl: './asignar-tarea.component.html',
  providers: [OperatorService]
})
export class AsignarTareaComponent implements OnInit {

 // BUSQUEDA POR UNIDAD
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;

  @ViewChild('cerrado') cerrado: ElementRef;
  @ViewChild('pegadaCuello') pegadaCuello: ElementRef;
  @ViewChild('costuraCordonera') costuraCordonera: ElementRef;
  @ViewChild('costuraEmbono') costuraEmbono: ElementRef;
  @ViewChild('costuraCuello') costuraCuello: ElementRef;
  @ViewChild('pegadoLengua') pegadoLengua: ElementRef;
  @ViewChild('costuraRibete') costuraRibete: ElementRef;
  @ViewChild('abollonado') abollonado: ElementRef;

  // BUSQUEDA POR CANASTA
  @ViewChild('idCanasta') idCanasta: ElementRef;
  @ViewChild('registros') registros: ElementRef;
  @ViewChild('selecOperario') selecOperario: ElementRef;
  @ViewChild('canastaNumero') canastaNumero: ElementRef;
  @ViewChild('canasta') canasta: ElementRef;



  public operators: Operator[];
  public guarnecidaInterna: Guarnecida;
  public operario: string[];
  public token;
  public busqueda;
  public busqueda2;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public status;
  public warehouses: any[];
  public seleccion;
  public salidas: any[];
  public selecSalidas;
  public selecOperator;
  public varSeleccion;
  public dobles;
  public tipoSalida;
  public codigoRepetido = true;
  public numeroCanasta: string[];
  public clasificacion: string[];
  public cerrar: string[];
  public pegarCuello: string[];
  public costurearCordonera: string[];
  public costurearEmbono: string[];
  public costurearCuello: string[];
  public pegarLengua: string[];
  public costurearRibete: string[];
  public abollonar: string[];
  public mostrarReferencia;
  public canastaVacia: string[];



  formData: FormGroup;


  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,    
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private operatorService: OperatorService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.guarnecidaInterna = new Guarnecida('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.clasificacion = new Array();
    this.operario = new Array();
    this.mostrarReferencia = false;
    this.canastaVacia = new Array();
    this.numeroCanasta = new Array();
    this.pegarCuello = new Array();
    this.cerrar = new Array();
    this.pegarCuello = new Array();
    this.costurearCordonera = new Array();
    this.costurearEmbono = new Array();
    this.costurearCuello = new Array();
    this.pegarLengua = new Array();
    this.costurearRibete = new Array();
    this.abollonar = new Array();
    this.seleccion = '';
    this.selecSalidas = '';
    this.selecOperator = '';
    this.varSeleccion = '';
    this.status = true;
    this.warehouses = [
    'Troquelado',
    'Reproceso'
    ];
    this.salidas = [
      'unidad',
      'canasta'
    ];








    this.formData = this.fb.group({
      operator: [''],
      cerrado: [''],
      name: [''],
      idWare: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }

  get addressListArray() {

    return this.formData.get('registros') as FormArray;
  }



  ngOnInit() {
     this.getOperator();
     this.getGuarnecida();


     // Instruccion que no permite insertar items vacios
     const control = this.addressListArray.controls;
     control.splice(1[0]);
  }




// ================================================
// FUNCION PARA SELECCIONAR UN OPERARIO
// ================================================
  capturar() {
    this.varSeleccion = this.selecOperator;
    const code = document.getElementById('opcion');
  }


  // ================================================
  // FUNCION QUE AGREGA UNA CANASTA PARA SER GUARDADA
  // ================================================
  agregarCanasta() {
    this.mostrarReferencia = true;
    this.numeroCanasta.push(this.canastaNumero.nativeElement.value);
    this.operacionHecha();

    
  }


  // ================================================
  // DEVUELVE ALERTA QUE NO ENCONTRO CODIGO
  // ================================================
  noEncontrado() {

    swal('Ojo', 'El codigo' + ' ' + this.busqueda + ' ' + 'no se encontro', 'error');
    this.busqueda = '';
    window.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
      }
  }, false);
  }


  // ================================================
  // NO PERMITE AGREGAR CODIGOS REPETIDOS
  // ================================================
  repetidos() {
    this.dobles = this.codigo.filter(function(item, index, array) {
      return array.indexOf(item) === index;
      });
    for (let i of this.dobles) {

      if (this.busqueda === i) {
         this.codigoRepetido = false;
         this.dobles.splice(1);
         console.log('rep', this.dobles);
         swal('Importante', 'El codigo' + ' ' + this.busqueda + ' ' + 'ya existe en la lista', 'warning');


         window.addEventListener("keypress", function(event) {
           if (event.keyCode === 13){
             event.preventDefault();
            }
          }, true);
         this.busqueda = '';
      } else {
        this.codigoRepetido = true;
      }

    }
  }


// ================================================
// AGREGA A UNA LISTA CADA VES QUE SE LEA UN CODIGO
// ================================================
  addAddress() {
    
    // Me pone el scroll al principio
    const scrol = document.getElementById('caja');
    // scrol.innerHTML = html;
    scrol.scrollTop = scrol.scrollHeight;

    const code = document.getElementById('code');
   

    if ( code === null) {
      this.noEncontrado();
    }

    this.repetidos();
    this.operacionHecha();

    if ( this.code.nativeElement && this.codigoRepetido === true) {
      const primera = document.getElementById('primera') as HTMLInputElement;
      const segunda = document.getElementById('segunda') as HTMLInputElement;

      // if (primera.checked) {
      //   this.clasificacion.push(this.primera.nativeElement.value);

      //   }

      // if (segunda.checked) {
      //   this.clasificacion.push(this.segunda.nativeElement.value);

      //     }

      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.idAlmacen.push(this.idWarehouse.nativeElement.value);
      this.operario.push(this.selecOperario.nativeElement.value);
      this.busqueda = '';

      const cerrad = document.getElementById('cerrado') as HTMLInputElement;
      const pegadCuello = document.getElementById('pegadaCuello') as HTMLInputElement;
      const costCordonera = document.getElementById('costuraCordonera') as HTMLInputElement;
      const costEmbono = document.getElementById('costuraEmbono') as HTMLInputElement;
      const costCuello = document.getElementById('costuraCuello') as HTMLInputElement;
      const pegadLengua = document.getElementById('pegadoLengua') as HTMLInputElement;
      const costRivete = document.getElementById('costuraRibete') as HTMLInputElement;
      const abollonad = document.getElementById('abollonado') as HTMLInputElement;

      if (cerrad.checked) {
        this.cerrar.push(this.selecOperario.nativeElement.value);
      }

      if (pegadCuello.checked === true) {
        this.pegarCuello.push(this.selecOperario.nativeElement.value);
      }

      if (costCordonera.checked) {
        this.costurearCordonera.push(this.selecOperario.nativeElement.value);
      }

      if (costEmbono.checked) {
        this.costurearEmbono.push(this.selecOperario.nativeElement.value);
      }

      if (costCuello.checked) {
        this.costurearCuello.push(this.selecOperario.nativeElement.value);
      }

      if (pegadLengua.checked) {
        this.pegarLengua.push(this.selecOperario.nativeElement.value);
      }

      if (costRivete.checked) {
        this.costurearRibete.push(this.selecOperario.nativeElement.value);
      }

      if (abollonad.checked) {
        this.abollonar.push(this.selecOperario.nativeElement.value);
      }

      this.status = true;
      this.getGuarnecida();

      console.log('pegarCuello', this.pegarCuello);

    }
  }


// ==============================================================
// CAPTURA EL VALOR DE CADA UNO DE LOS ITEMS AGREGADOS A LA LISTA
// ==============================================================
  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      _id: [''],
      quantity: 0.5,
      operator: [''],
      cerrado: [''],
      pegadaCuello: [''],
      costuraCordonera: [''],
      costuraEmbono: [''],
      costuraCuello: [''],
      pegadoLengua: [''],
      costuraRibete: [''],
      abollonado: [''],
      clasification: ['']
    });
  }


  // ================================================
  // ELIMINA UN ITEM DE LA LISTA
  // ================================================
  removeAddress(index) {
    const s = this.formData.value.registros;
    s.splice(index, 1);
    this.dobles.splice(index, 1);
    const control = this.addressListArray.controls;
    control.splice(index, 1);
    this.codigo.splice(index, 1);
    this.referencia.splice(index, 1);
    this.talla.splice(index, 1);
    this.idAlmacen.splice(index, 1);
    this.codigoRepetido = true;

  }



// ================================================
// GENERA UNA LISTA DE TODO GUARNECIDA
// ================================================
  getGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {
            this.status = false;

        } else {
          this.guarnecidaInterna = response.guarnecidaInterna;
        }
      }
    );
  }


// ================================================
// GENERA UNA LISTA DE TODOS LOS OPERARIOS
// ================================================
  getOperator() {
    this.operatorService.getOperators().subscribe(
      response => {
        if (!response.operators) {
            this.status = false;
        } else {
          this.operators = response.operators;
        }
      }
    );
  }


  // ================================================
  //   ABISAR SI UNA OPERACION FUE HECHA YA
  // ================================================
  operacionHecha() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
          const cerrad = document.getElementById('cerrado') as HTMLInputElement;
          const pegadCuello = document.getElementById('pegadaCuello') as HTMLInputElement;
          const costCordonera = document.getElementById('costuraCordonera') as HTMLInputElement;
          const costEmbono = document.getElementById('costuraEmbono') as HTMLInputElement;
          const costCuello = document.getElementById('costuraCuello') as HTMLInputElement;
          const pegadLengua = document.getElementById('pegadoLengua') as HTMLInputElement;
          const costRivete = document.getElementById('costuraRibete') as HTMLInputElement;
          const abollonad = document.getElementById('abollonado') as HTMLInputElement;

          response.guarnecidaInterna.forEach((todo) => {
            todo.registros.forEach((operacion) => {
              if (cerrad.checked &&  operacion.cerrado !== '') {
                swal('Importante', 'La operacion CERRADO ya fue realizada', 'warning');
                cerrad.checked = false;
              }

              if (pegadCuello.checked && operacion.pegadaCuello !== '') {
                swal('Importante', 'La operacion PEGADO DE CUELLO ya fue realizada', 'warning');
                pegadCuello.checked = false;
              }
            });
          });
      },
      error => {
        console.log(error as any);
      }
    );

  }


  // ================================================
  // ASIGNA UN NOMBRE DE OPERARIO A UNA CANASTA
  // ================================================
  updateCanasta(id) {
    
    let numeroCanasta = this.idCanasta.nativeElement.value;
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {
            this.status = false;
        } else {
          this.guarnecidaInterna = response.guarnecidaInterna;
          for (const i of response.guarnecidaInterna) {
            numeroCanasta = JSON.parse(numeroCanasta);
            this.guarnecidaInterna = i;
            this.guarnecidaInterna.operator = this.selecOperator;
            if ( i._id === numeroCanasta ) {
              i.registros.forEach((item) => {

                const cerrad = document.getElementById('cerrado') as HTMLInputElement;
                const pegadCuello = document.getElementById('pegadaCuello') as HTMLInputElement;
                const costCordonera = document.getElementById('costuraCordonera') as HTMLInputElement;
                const costEmbono = document.getElementById('costuraEmbono') as HTMLInputElement;
                const costCuello = document.getElementById('costuraCuello') as HTMLInputElement;
                const pegadLengua = document.getElementById('pegadoLengua') as HTMLInputElement;
                const costRivete = document.getElementById('costuraRibete') as HTMLInputElement;
                const abollonad = document.getElementById('abollonado') as HTMLInputElement;

                if (cerrad.checked) {
                  item.cerrado = this.selecOperator;
                }

                if (pegadCuello.checked === true) {
                  item.pegadaCuello = this.selecOperator;

                }

                if (costCordonera.checked) {
                  item.costuraCordonera = this.selecOperator;
                }

                if (costEmbono.checked) {
                  item.costuraEmbono = this.selecOperator;
                }

                if (costCuello.checked) {
                  item.costuraCuello = this.selecOperator;
                }

                if (pegadLengua.checked) {
                  item.pegadoLengua = this.selecOperator;
                }

                if (costRivete.checked) {
                  item.costuraRivete = this.selecOperator;
                }

                if (abollonad.checked) {
                  item.abollonado = this.selecOperator;
                }
                

              });

              this.guarnecidaService.updateCanasta(this.token, id, this.guarnecidaInterna).subscribe(
                response => {
                  this.selecSalidas = '';
                  this.selecOperator = '';
                  this.busqueda2 = '';
                  this.busqueda = '';
                  this.canastaNumero.nativeElement.value = '';
                  
                  this.numeroCanasta.splice(0, this.numeroCanasta.length);
                  this.cerrar.splice(0, this.cerrar.length);
                  this.pegarCuello.splice(0, this.pegarCuello.length);
                  this.costurearCordonera.splice(0, this.costurearCordonera.length);
                  this.costurearEmbono.splice(0, this.costurearEmbono.length);
                  this.costurearCuello.splice(0, this.costurearCuello.length);
                  this.pegarLengua.splice(0, this.pegarLengua.length);
                  this.costurearRibete.splice(0, this.costurearRibete.length);
                  this.abollonar.splice(0, this.abollonar.length);
                  this.deseleccionar();
                  this.getGuarnecida();
                  

                  

                },
                error => {
                  console.log(error as any);
                }
              );

            }

          }
        }
      }
    );
  }





  // ================================================
  // GUARDA UNA CANASTA EN GUARNECIDA
  // ================================================
  addCanasta() {

    let numeroCanasta = this.idCanasta.nativeElement.value;
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {
            this.status = false;
        } else {
          this.guarnecidaInterna = response.guarnecidaInterna;
          for (const i of response.guarnecidaInterna) {
            numeroCanasta = JSON.parse(numeroCanasta);
            this.guarnecidaInterna = i;
            this.guarnecidaInterna.operator = this.selecOperator;
            if ( i._id === numeroCanasta ) {

                this.guarnecidaService.addGuarnecida(this.token, this.guarnecidaInterna).subscribe(
                response => {
                  this.selecSalidas = '';
                  this.selecOperator = '';
                  this.busqueda2 = '';
                  this.canastaNumero.nativeElement.value = '';
                  this.numeroCanasta.splice(0, this.numeroCanasta.length); 
                  // this.warehouse1 = new Warehouse1('', '', []);
                  

                },
                error => {
                  console.log(error as any);
                }
              );

            }

          }
        }
      }
    );
  }


  deseleccionar() {
    const cerrad = document.getElementById('cerrado') as HTMLInputElement;
    const pegadCuello = document.getElementById('pegadaCuello') as HTMLInputElement;
    const costCordonera = document.getElementById('costuraCordonera') as HTMLInputElement;
    const costEmbono = document.getElementById('costuraEmbono') as HTMLInputElement;
    const costCuello = document.getElementById('costuraCuello') as HTMLInputElement;
    const pegadLengua = document.getElementById('pegadoLengua') as HTMLInputElement;
    const costRivete = document.getElementById('costuraRibete') as HTMLInputElement;
    const abollonad = document.getElementById('abollonado') as HTMLInputElement;

    if (cerrad.checked) {
      cerrad.checked = false;
    }

    if (pegadCuello.checked === true) {
      pegadCuello.checked = false;

    }

    if (costCordonera.checked) {
      costCordonera.checked = false;
    }

    if (costEmbono.checked) {
      costEmbono.checked = false;
    }

    if (costCuello.checked) {
      costCuello.checked = false;
    }

    if (pegadLengua.checked) {
      pegadLengua.checked = false;
    }

    if (costRivete.checked) {
      costRivete.checked = false;
    }

    if (abollonad.checked) {
      abollonad.checked = false;
    }
    
  }




// ================================================
// ASIGNAR UNA UNIDAD A UN OPERARIO EN GUARNECIDA
// ================================================

  addUnidad(data) {
    
    this.guarnecidaService.addGuarnecida(this.token, data).subscribe(
                response => {
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
                  this.selecSalidas = '';
                  this.clasificacion.splice(data);
                  this.idAlmacen.splice(data);
                  this.operario.splice(data);

                  this.cerrar.splice(data);
                  this.pegarCuello.splice(data);
                  this.costurearCordonera.splice(data);
                  this.costurearEmbono.splice(data);
                  this.costurearCuello.splice(data);
                  this.pegarLengua.splice(data);
                  this.costurearRibete.splice(data);
                  this.abollonar.splice(data);

                  
                  this.selecOperator = '';
                  this.busqueda = '';
                  this.deseleccionar();
                  this.getGuarnecida();
                  

                },
                error  => {
                  console.log(error as any);
                }
                );
                

    }



  // ================================================
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA DE GUARNECIDA
  // ================================================
  deleteItem(dat) {
    for (let i = 0; i <= dat.registros.length; i++) {
      this.guarnecidaService.updateGuarnecida(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVacia();

              },
              error => {
                console.log(error as any);
              }
              );
            }
  }


// ================================================
// ELIMINAR COLECCIONES VACIAS
// ================================================
  deleteCanastaVacia() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna ) {
          console.log('Error en el servidor');
        } else {

          for (const i of response.guarnecidaInterna) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);

              this.guarnecidaService.deleteGuarnecida(this.token, i._id).subscribe(
                  response => {

                  },
                  error => {
                    console.log(error as any);
                  }
                );

              } else {

            }
          }
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA CANASTA EN GUARNECIDA
  // ================================================
  deleteGuarnecida(id) {

    this.guarnecidaService.deleteGuarnecida(this.token, id).subscribe(
      response => {
        if (!response.guarnecidaInterna ) {
          console.log('Error en el servidor');
        }

        this.canastaNumero.nativeElement.value = '';
        this.numeroCanasta.splice(0, this.numeroCanasta.length);
      },
      error => {
        alert('Error en el servidor');
      }
    );
  }


}


