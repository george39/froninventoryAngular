
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






// tslint:disable-next-line:label-position



@Component({
  selector: 'app-out-warehouse1',
  templateUrl: './out-warehouse1.component.html',
  styleUrls: ['./out-warehouse1.component.css'],
  providers: [OperatorService, Warehouse1Service]
})
export class OutWarehouse1Component implements OnInit {
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
  public operator: Operator;
  // public canastaVacia: Warehouse1;
  public operario: string[];
  public warehouse: Warehouse1[];
  public termination: Termination;
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
    private _userService: UserService,
    private operatorService: OperatorService,
    private terminationService: TerminationService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);
    this.termination = new Termination('', '', []);
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
    'Troquelado',
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
    console.log('sel', this.varSeleccion);
  }

  agregarCanasta() {
    this.mostrarReferencia = true;
    this.numeroCanasta.push(this.canasta.nativeElement.value);

  }


  addAddress() {
    
    // Me pone el scroll al principio
    const scrol = document.getElementById('caja');
    // scrol.innerHTML = html;
    scrol.scrollTop = scrol.scrollHeight;

    const code = document.getElementById('code');
    console.log('busqueda', this.warehouse1);

    if ( code === null) {
      this.status = false;
    }

    if ( this.code.nativeElement) {
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
      this.busqueda = '';

      console.log('id',  this.idWarehouse.nativeElement.value);
      this.status = true;

      console.log('idalmacen', this.warehouse);


    }
  }

  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      _id: [''],
      operator: [''],
      clasification: ['']
    });
  }


  HomeworkUnit() {
    this.tareaUnidadService.getHomeworkUnit().subscribe(
      response => {
        if (!response.tareaUnidad) {
            this.status = false;
            console.log('status unidad', this.status);

        } else {
          this.tareaUnidad = response.tareaUnidad;
          console.log('tareaUnidad', this.tareaUnidad);
        }
      }
    );
  }


  getWarehouses() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {
            this.status = false;
            console.log('status unidad', this.status);

        } else {
          this.warehouse1 = response.warehouse1;

        //   for (const i of response.warehouse1) {
        //     for ( const r of i.registros) {

        //       let canas = this.canasta.nativeElement.value;
        //       canas = JSON.parse(canas);
        //       const indice = [];
        //       let a = 0;


        //       a += 1;
        //       if (canas === i._id && r.code === '543') {

        //             console.log('warehouse1', a);

        //       }

        //   }
        // }
        }
      }
    );
  }

  getOperator() {
    this.operatorService.getOperators().subscribe(
      response => {
        if (!response.operators) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.operators = response.operators;
          console.log('operator', this.operators);
        }
      }
    );
  }








  // ================================================
  // GUARDAR UNA CANASTA EN TERMINADO
  // ================================================
  addCanasta() {

    let numeroCanasta = this.idCanasta.nativeElement.value;
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {
            this.status = false;
        } else {
          this.warehouse1 = response.warehouse1;
          for (const i of response.warehouse1) {
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

  onSubmit(data) {


    this.terminationService.addTermination(this.token, data).subscribe(
                response => {

                  this.termination.operator = this.selecOperator;

                  console.log('busqueda',  this.busqueda);
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

                  console.log('idalmacen', this.idAlmacen);
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
    // tslint:disable-next-line:forin
    
    var r = '';
    for (let i = 0; i <= dat.registros.length; i++) {
      this._warehouse1Service.updateWarehouse(this.token, dat.registros[i]).subscribe(
              response => {
                // this.warehouse1 = a;
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

      const control = this.addressListArray.controls;
      control.splice(index, 1);
      this.codigo.splice(index, 1);
      this.referencia.splice(index, 1);
      this.talla.splice(index, 1);
      this.idAlmacen.splice(index, 1);
      console.log('eliminar', this.formData.value);
      // this.addressListArray.removeAt(index);
      console.log('index', index);

    }



}

