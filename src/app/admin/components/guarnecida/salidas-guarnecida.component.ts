
import { Component, OnInit, ViewChild, ElementRef, DoCheck} from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';


import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, from } from 'rxjs';
import { catchError, subscribeOn } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';
import { TestObject } from 'protractor/built/driverProviders';
import swal from 'sweetalert';






// tslint:disable-next-line:label-position



@Component({
  selector: 'app-salidas-guarnecida',
  templateUrl: './salidas-guarnecida.component.html',
  providers: [OperatorService]
})
export class SalidasGuarnecidaComponent implements OnInit {
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
  // public warehouse1: Warehouse1;
  public guarnecidaInterna: Guarnecida;
  public operator: Operator;
  // public canastaVacia: Warehouse1;
  public operario: string[];
  
  public token;
  public busqueda;
  public busqueda2;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public idCan;
  public dobles;
  public codigoRepetido = true;

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

  public formData: FormGroup;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _warehouse1Service: Warehouse1Service,
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private operatorService: OperatorService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    // this.warehouse1 = new Warehouse1('', '', []);
    this.guarnecidaInterna = new Guarnecida('', '', []);
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
    this.seleccion = '';
    this.selecSalidas = '';
    this.selecOperator = '';
    this.varSeleccion = '';
    this.mesa = new Array();
    this.regis = new Array();
    this.numeroCanasta = new Array();

    this.status = true;
    this.warehouses = [
    'Almacen1',
    'Reproceso'
  ];

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
     this.getGuarnecida();


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


  addAddress() {
    // Me pone el scroll al principio
    var scrol = document.getElementById('caja');
    // scrol.innerHTML = html;
    scrol.scrollTop = scrol.scrollHeight;


    const code = document.getElementById('code');
    console.log('code', code);
    if ( code === null) {
      this.noEncontrado();
    }

    this.repetidos();

    if ( this.code.nativeElement && this.codigoRepetido === true) {

      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.idAlmacen.push(this.idWarehouse.nativeElement.value);
      // this.clasificacion.push(this.clasification.nativeElement.value);
      this.busqueda = '';
      this.status = true;

      console.log('clasifiacion', this.clasificacion);


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
      clasification: ['']
    });
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
  // LISTA LAS UNIDADES QUE EXISTEN EN GUARNECIDA
  // ================================================
  getGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.guarnecidaInterna = response.guarnecidaInterna;
          console.log('guarnecida', this.guarnecidaInterna);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



// ================================================
// ELIMINA UNA UNIDAD DE GUARNECIDA
// ================================================
  deleteItemGuarnecida(dat) {
    
    for (let i = 0; i <= dat.registros.length; i++) {

      this.guarnecidaService.updateGuarnecida(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaGuarnecida();

              },
              error => {
                console.log(error as any);
              }
            );
          }

  }


// ================================================
// ELIMINAR COLECCIONES VACIAS DE GUARNECIDA
// ================================================
  deleteCanastaVaciaGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecida ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.guarnecida) {
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
  // GUARDAR UNA CANASTA EN ALMACEN 1
  // ================================================
  addWarehouse1(data) {
    
    this._warehouse1Service.addWarehouse1(this.token, data).subscribe(
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
                  this.busqueda = '';
                  this.clasificacion.splice(data);
                  this.idAlmacen.splice(data);
                  this.getGuarnecida();

                },
                error  => {
                  console.log(error as any);
                }
                );

    }




// ================================================
// GUARDAR UNA UNIDAD EN ALMACEN 1
// ================================================

  // onSubmit(data) {


  //   this.terminationService.addTermination(this.token, data).subscribe(
  //               response => {

  //                 this.termination.operator = this.selecOperator;

                  
  //                 this.formData.reset();
  //                 const control = this.addressListArray.controls;
  //                 control.splice(data);
  //                 this.seleccion = '';
  //                 const s = this.formData.value.registros;
  //                 s.splice(data);
  //                 this.codigo.splice(data);
  //                 this.referencia.splice(data);
  //                 this.talla.splice(data);
  //                 this.selecSalidas = '';
  //                 this.clasificacion.splice(data);
  //                 this.idAlmacen.splice(data);
  //                 this.operario.splice(data);
  //                 this.selecOperator = '';
  //                 this.busqueda = '';
  //                 this.getWarehouses();

                  
  //               },
  //               error  => {
  //                 console.log(error as any);
  //               }
  //               );

  //   }






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

