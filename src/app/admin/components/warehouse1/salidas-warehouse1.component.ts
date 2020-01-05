
import { Component, OnInit, ViewChild, ElementRef, DoCheck} from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';


import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { Warehouse1Service } from '../../../services/warehouse1.service';
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
import { GuarnecidaExterna } from '../../../models/guarnecida-externa';
import { GuarnecidaExternaService } from '../../../services/guarnecida-externa.service';
import { OjaleteadoService } from '../../../services/ojaleteado.service';
import { Ojaleteado } from '../../../models/ojaleteado';
import { Injection1 } from '../../../models/injection1';
import { Injection1Service } from '../../../services/injection1.service';
import { Strobell } from '../../../models/strobell';
import { StrobellService } from '../../../services/strobell.service';
import { Reproceso } from '../../../models/reproceso';
import { ReprocesoService } from '../../../services/reproceso.service';
import { Virado } from '../../../models/virado';
import { ViradoService } from '../../../services/virado.service';
import swal from 'sweetalert';
import { Vulcanizado } from '../../../models/vulcanizado';
import { VulcanizadoService } from '../../../services/vulcanizado.service';







// tslint:disable-next-line:label-position



@Component({
  selector: 'app-salidas-warehouse1',
  templateUrl: './salidas-warehouse1.component.html',  
  providers: [OperatorService, Warehouse1Service]
})
export class SalidasWarehouse1Component implements OnInit {
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
  public warehouse1: Warehouse1;
  public tareaUnidad: TareaUnidad;
  public guarnecida: Guarnecida;
  public guarnecidaExterna: GuarnecidaExterna;
  public injection1: Injection1;
  public strobell: Strobell;
  public vulcanizado: Vulcanizado;
  public reproceso: Reproceso;
  public operator: Operator;
  public dobles;
  public codigoRepetido = true;
  // public canastaVacia: Warehouse1;
  public operario: string[];
  public ojaleteador: string[];
  public warehouse: Warehouse1[];
  public termination: Termination;
  public ojaleteado: Ojaleteado;
  public virado: Virado;
  public token;
  public busqueda;
  public busqueda2;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public idCan;

  public status;
  public warehouses: any[];
  public externos: any[];
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



  formData: FormGroup;


  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private _warehouse1Service: Warehouse1Service,
    private guarnecidaService: GuarnecidaService,
    private guarnecidaExternaService: GuarnecidaExternaService,
    private ojaleteadoService: OjaleteadoService,
    private injection1Service: Injection1Service,
    private strobellService: StrobellService,
    private reprocesoService: ReprocesoService,
    private viradoService: ViradoService,
    private vulcanizadoService: VulcanizadoService,
    private _userService: UserService,
    private operatorService: OperatorService,
    private terminationService: TerminationService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);
    this.guarnecidaExterna = new GuarnecidaExterna('', '', []);
    this.ojaleteado = new Ojaleteado('', '', []);
    this.injection1 = new Injection1('', '', []);
    this.reproceso = new Reproceso('', '', []);
    this.virado = new Virado('', '', []);
    this.vulcanizado = new Vulcanizado('', '', []);
    // this.operator = new Operator('', '', '');
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.resultado = new Array();
    this.clasificacion = new Array();
    this.operario = new Array();
    this.ojaleteador = new Array();
    this.idCan = '';
    this.mostrarReferencia = false;
    this.canastaVacia = new Array();

    this.status = true;
    this.warehouses = [
    'Guarnecida-Externa',
    'Ojaleteado',
    'Inyeccion-Cementado',
    'Strobell',
    'Virado',
    'Vulcanizado',
    'Reproceso'
  ];

    this.externos = [
      'Enoc',
      'Viviana',
      'Carolina',
      'Fernando',
      'Ariel'
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
     this.HomeworkUnit();
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

    if ( this.code.nativeElement && this.codigoRepetido === true) {
      // const primera = document.getElementById('primera') as HTMLInputElement;
      // const segunda = document.getElementById('segunda') as HTMLInputElement;

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
      ojaleteador: [''],
      quantity: 0.5,
      clasification: ['']
    });
  }


  HomeworkUnit() {
    this.tareaUnidadService.getHomeworksUnit().subscribe(
      response => {
        if (!response.tareaUnidad) {
            this.status = false;
            

        } else {
          this.tareaUnidad = response.tareaUnidad;
          
        }
      }
    );
  }


  getGuarnecidaExterna() {
    this.guarnecidaExternaService.getGuarnecidasExterna().subscribe(
      response => {
        if (!response.guarnecidaExterna) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.guarnecidaExterna = response.guarnecidaExterna;
          console.log('guarnecidaExterna', this.guarnecidaExterna);
        }
      }
    );
  }


  getWarehouses() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {
            this.status = false;
            

        } else {
          this.warehouse1 = response.warehouse1;
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
// GUARDAR UNA UNIDAD EN OJALETEADO
// ================================================
  addOjaleteado(data) {
    this.ojaleteadoService.addOjaleteado(this.token, data).subscribe(
        response => {

          this.ojaleteado.operator = this.selecOperator;
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
  // GUARDAR UNA UNIDAD EN GUARNECIDA EXTERNA
  // ================================================
  addGuarnecidaExterna(data) {
    
    this.guarnecidaExternaService.addGuarnecida(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
  // GUARDAR UNA UNIDAD EN  VIRADO
  // ================================================
  addVirado(data) {
    
    this.viradoService.addVirado(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
  // GUARDAR UNA UNIDAD EN INYECCÓN 1
  // ================================================
  addInjection1(data) {
    
    this.injection1Service.addInjection1(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
  // GUARDAR UNA UNIDAD EN STROBELL
  // ================================================
  addStrobell(data) {
    
    this.strobellService.addStrobell(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
  // GUARDAR UNA UNIDAD EN VULCANIZADO
  // ================================================
  addVulcanizado(data) {
    
    this.vulcanizadoService.addVulcanizado(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  this.seleccion = '';
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
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
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA DEL ALMACEN 1
  // ================================================
  deleteItem(dat) {
    const a =  this.formData.value;
    
    for (let i = 0; i <= dat.registros.length; i++) {
      this._warehouse1Service.updateWarehouse(this.token, dat.registros[i]).subscribe(
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
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1 ) {
          console.log('Error en el servidor');
        } else {

          for (const i of response.warehouse1) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this._warehouse1Service.deleteWarehouse(this.token, i._id).subscribe(
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
  // ELIMINA UNA CANASTA EN EL ALMACEN 1
  // ================================================
deleteWarehouse(id) {

    this._warehouse1Service.deleteWarehouse(this.token, id).subscribe(
      response => {
        if (!response.warehouse1 ) {
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

