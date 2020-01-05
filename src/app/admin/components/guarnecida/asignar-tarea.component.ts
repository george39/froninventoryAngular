
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

  @ViewChild('sigzado') sigzado: ElementRef;
  @ViewChild('cerrado') cerrado: ElementRef;
  @ViewChild('guarnecido') guarnecido: ElementRef;

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
  public sigzar: string[];
  public cerrar: string[];
  public guarnecer: string[];
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
    this.sigzar = new Array();
    this.cerrar = new Array();
    this.guarnecer = new Array();
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
      sigzado: [''],
      cerrado: [''],
      guarnecido: [''],
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

      const sigza = document.getElementById('sigzado') as HTMLInputElement;
      const cerrad = document.getElementById('cerrado') as HTMLInputElement;
      const guarn = document.getElementById('guarnecido') as HTMLInputElement;

      if (sigza.checked === true) {
        this.sigzar.push(this.selecOperario.nativeElement.value);
      }

      if (cerrad.checked) {
        this.cerrar.push(this.selecOperario.nativeElement.value);
      }

      if (guarn.checked) {
        this.guarnecer.push(this.selecOperario.nativeElement.value);
      }

      this.status = true;
      this.getGuarnecida();

      console.log('sigzar', this.sigzar);

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
      operator: [''],
      sigzado: [''],
      cerrado: [''],
      guarnecido: [''],
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
                const sigza = document.getElementById('sigzado') as HTMLInputElement;
                const cerrad = document.getElementById('cerrado') as HTMLInputElement;
                const guarn = document.getElementById('guarnecido') as HTMLInputElement;
            
                if (sigza.checked === true) {
                  item.sigzado = this.selecOperator;
                  
                }
            
                if (cerrad.checked) {
                  item.cerrado = this.selecOperator;
                }
            
                if (guarn.checked) {
                  item.guarnecido = this.selecOperator;
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
                  this.sigzar.splice(0, this.sigzar.length);
                  this.cerrar.splice(0, this.cerrar.length);
                  this.guarnecer.splice(0, this.guarnecer.length);
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
                  this.numeroCanasta.splice(0, this.numeroCanasta.length);                 // this.warehouse1 = new Warehouse1('', '', []);

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
                  this.selecOperator = '';
                  this.busqueda = '';
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


