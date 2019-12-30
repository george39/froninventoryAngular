
import { Component, OnInit, ViewChild, ElementRef, DoCheck} from '@angular/core';
import { Warehouse2 } from '../../../models/warehouse2';


import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Warehouse2Service } from '../../../services/warehouse2.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, from } from 'rxjs';
import { catchError, subscribeOn } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';
import { TerminationService } from '../../../services/termination.service';
import { Termination } from '../../../models/termination';
import { TestObject } from 'protractor/built/driverProviders';
import { Reproceso } from '../../../models/reproceso';
import { ReprocesoService } from '../../../services/reproceso.service';
import { Injection1Service } from '../../../services/injection1.service';
import { ValeTerminacionService } from '../../../services/vale-terminacion.service';
import { ValeTerminado } from '../../../models/valeTerminado';
import swal from 'sweetalert';





// tslint:disable-next-line:label-position



@Component({
  selector: 'app-salidas-warehouse2',
  templateUrl: './salidas-warehouse2.component.html',
  providers: [OperatorService]
})
export class SalidasWarehouse2Component implements OnInit {
 // BUSQUEDA POR UNIDAD
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;

  @ViewChild('primera') primera: ElementRef;
  @ViewChild('segunda') segunda: ElementRef;

  // BUSQUEDA POR CANASTA
  @ViewChild('idCanasta') idCanasta: ElementRef;
  @ViewChild('registros') registros: ElementRef;
  @ViewChild('selecOperario') selecOperario: ElementRef;
  @ViewChild('canasta') canasta: ElementRef;



  public operators: Operator[];
  public reproceso: Reproceso;
  public guarnecida: Guarnecida;
  public operator: Operator;
  public valeTerminado: ValeTerminado;
  // public canastaVacia: Warehouse1;
  public operario: string[];
  public warehouse2: Warehouse2[];
  public termination: Termination;
  public token;
  public busqueda;
  public busqueda2;
  public dobles;
  public codigoRepetido = true;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public idCan;

  public status;
  public warehouses: any[];
  public seleccion;
  public salidas: any[];
  public selecSalidas;
  public selecOperator;
  public varSeleccion;
  public mesa: any[];
  public regis: string[];
  public numeroCanasta: string[];
  public resultado: string[];
  public clasificacion: string[];
  public mostrarReferencia;
  public canastaVacia: string[];
  public operarioListado;



  formData: FormGroup;


  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private injectionService: Injection1Service,
    private warehouse2Service: Warehouse2Service,
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private operatorService: OperatorService,
    private terminationService: TerminationService,
    private reprocesoService: ReprocesoService,
    private valeTerminadoService: ValeTerminacionService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.guarnecida = new Guarnecida('', '', []);
    this.termination = new Termination('', '', []);
    this.reproceso = new Reproceso('', '', []);
    this.valeTerminado = new ValeTerminado('', '', []);
    // this.operator = new Operator('', '', '');
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.resultado = new Array();
    this.clasificacion = new Array();
    this.operario = new Array();
    this.idCan = '';
    this.mostrarReferencia = false;
    this.canastaVacia = new Array();

    this.status = true;
    this.warehouses = [
    'Terminado',
    'Inyeccion',
    'Reproceso'
  ];
    this.salidas = [
      'unidad',
      'canasta'
    ];


    this.seleccion = '';
    this.selecSalidas = '';
    this.selecOperator = '';
    this.varSeleccion = '';
    this.mesa = new Array();
    this.regis = new Array();
    this.numeroCanasta = new Array();
    this.operarioListado = '';






    this.formData = this.fb.group({
      operator: [''],
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
     this.getWarehouses();


     // Instruccion que no permite insertar items vacios
     const control = this.addressListArray.controls;
     control.splice(1[0]);
  }






  capturar() {
    this.varSeleccion = this.selecOperator;
    // this.varSeleccion = JSON.stringify(this.varSeleccion);
    const code = document.getElementById('opcion');
    
  }

  agregarCanasta() {
    this.mostrarReferencia = true;
    this.numeroCanasta.push(this.canasta.nativeElement.value);

  }


   // ================================================
  // DEVUELVE ALERTA QUE NO ENCONTRO CODIGO
  // ================================================
  noEncontrado() {

    swal('No encontrado', 'El codigo' + ' ' + this.busqueda + ' ' + 'no se encontro', 'error');
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
         swal('Repetido', 'El codigo' + ' ' + this.busqueda + ' ' + 'ya existe en la lista', 'warning');


         window.addEventListener("keypress", function(event) {
           if (event.keyCode === 13) {
             event.preventDefault();
            }
          }, true);
         this.busqueda = '';
      } else {
        this.codigoRepetido = true;
      }

    }
  }


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
    this.busqueda = '';

    if ( this.code.nativeElement && this.codigoRepetido === true) {
      const primera = document.getElementById('primera') as HTMLInputElement;
      const segunda = document.getElementById('segunda') as HTMLInputElement;

      if (primera.checked) {
        this.clasificacion.push(this.primera.nativeElement.value);

        }

      if (segunda.checked) {
        this.clasificacion.push(this.segunda.nativeElement.value);

          }

      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.idAlmacen.push(this.idWarehouse.nativeElement.value);
      this.operario.push(this.selecOperario.nativeElement.value);
      
      this.operarioListado = this.operario[0];

      console.log('operario', this.operario);

      
      this.status = true;

      


    }
  }

  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      _id: [''],
      operator: [''],
      quantity: 0.5,
      trestres: 0,
      trescuatro: 0,
      trescinco: 0,
      tresseis: 0,
      tressiete: 0,
      tresocho: 0,
      tresnueve: 0,
      cuarenta: 0,
      cuarentayuno: 0,
      cuarentaydos: 0,
      cuarentaytres: 0,
      cuarentaycuatro: 0,
      cuarentaycinco: 0,
      cuarentayseis: 0,
      cuarentaysiete: 0,
      clasification: ['']
    });
  }


  getWarehouses() {
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        if (!response.warehouse2) {
            this.status = false;
            

        } else {
          this.warehouse2 = response.warehouse2;
        }
      }
    );
  }

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
  // GUARDAR UNA CANASTA EN TERMINADO
  // ================================================
  addCanasta() {

    let numeroCanasta = this.idCanasta.nativeElement.value;
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        if (!response.warehouse1) {
            this.status = false;
        } else {
          this.warehouse2 = response.warehouse2;
          for (const i of response.warehouse2) {
            numeroCanasta = JSON.parse(numeroCanasta);
            this.termination = i;
            this.termination.operator = this.selecOperator;
            if ( i._id === numeroCanasta ) {

                this.terminationService.addTermination(this.token, this.termination).subscribe(
                response => {
                  this.selecSalidas = '';
                  this.selecOperator = '';
                  this.busqueda2 = '';
                  this.canasta.nativeElement.value = '';

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




// ================================================
// GUARDAR UNA UNIDAD EN TERMINADO
// ================================================
  addTerminado(data) {
    this.terminationService.addTermination(this.token, data).subscribe(
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
                  this.getWarehouses();

                  
                },
                error  => {
                  console.log(error as any);
                }
                );

    }


  // ================================================
// GUARDAR UNA VALE DE TERMINADO
// ================================================
addValeTerminado(data) {
  this.valeTerminadoService.addValeTerminado(this.token, data).subscribe(
    response => {
      
      this.termination.operator = this.selecOperator;
      
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
      this.getWarehouses();
  

      
    },
    error  => {
      console.log(error as any);
    }
    );

  }  



// ================================================
// GUARDAR UNA UNIDAD EN INYECCION
// ================================================
  addInjection(data) {
    this.injectionService.addInjection1(this.token, data).subscribe(
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
                  this.getWarehouses();

                  
                },
                error  => {
                  console.log(error as any);
                }
                );

    } 


    
// ================================================
// GUARDAR UNA UNIDAD EN REPROCESO
// ================================================
  addReproceso(data) {
    this.reprocesoService.addReproceso(this.token, data).subscribe(
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
                  this.getWarehouses();

                },
                error  => {
                  console.log(error as any);
                }
                );

    }



  // ================================================
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA DEL ALMACEN 2
  // ================================================
  deleteItemWarehouse2(dat) {
    const a =  this.formData.value;
    
    for (let i = 0; i <= dat.registros.length; i++) {
      this.warehouse2Service.updateWarehouse2(this.token, dat.registros[i]).subscribe(
              response => {
                
                this.deleteCanastaVaciaWarehouse2();

              },
              error => {
                console.log(error as any);
              }
              );
            }
            
  }


// ================================================
// ELIMINAR COLECCIONES VACIAS EN ALMACEN 2
// ================================================
  deleteCanastaVaciaWarehouse2() {
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        if (!response.warehouse2 ) {
          console.log('Error en el servidor');
        } else {

          for (const i of response.warehouse2) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.warehouse2Service.deleteWarehouse2(this.token, i._id).subscribe(
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
  // ELIMINA UNA CANASTA EN EL ALMACEN 2
  // ================================================
deleteWarehouse(id) {

    this.warehouse2Service.deleteWarehouse2(this.token, id).subscribe(
      response => {
        if (!response.warehouse2 ) {
          console.log('Error en el servidor');
        }
       // this.getWarehouses();
        this.canasta.nativeElement.value = '';
        this.numeroCanasta.splice(0, this.numeroCanasta.length);
      },
      error => {
        alert('Error en el servidor');
      }
    );
  }



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



}

