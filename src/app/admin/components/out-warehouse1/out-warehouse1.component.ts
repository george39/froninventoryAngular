
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';


import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';




// tslint:disable-next-line:label-position



@Component({
  selector: 'app-out-warehouse1',
  templateUrl: './out-warehouse1.component.html',
  styleUrls: ['./out-warehouse1.component.css'],
  providers: [OperatorService]
})
export class OutWarehouse1Component implements OnInit {
  public operators: Operator[];
  

  constructor(
    private _route: ActivatedRoute,
  	private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private _warehouse1Service: Warehouse1Service,
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private operatorService: OperatorService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    // this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);
    // this.operator = new Operator('', '', '');
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.status = true;
    this.warehouses = [
    'Troquelado',
    'Reproceso'
  ];

    this.warehouse = [];
    this.seleccion = '';



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
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;



  public warehouse1: Warehouse1;
  public tareaUnidad: TareaUnidad;
  public guarnecida: Guarnecida;
  public operator: Operator;
  public warehouse: [];
  public token;
  public busqueda;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public status;
  public warehouses: any[];
  public seleccion;




  formData: FormGroup;
error;

  ngOnInit() {
     this.HomeworkUnit();
     // this.getWarehouses();
     this.getOperator();
     console.log('tareaU', this.operator);


    // Instruccion que no permite insertar items vacios
     const control = this.addressListArray.controls;
     control.splice(1[0]);
  }


  addAddress() {
    const code = document.getElementById('code');

    if ( code === null) {
      this.status = false;
    }

    if ( this.code.nativeElement) {

      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.idAlmacen.push(this.idWarehouse.nativeElement.value);
      this.busqueda = '';
      this.status = true;
      console.log('datos', control);


    }
  }

  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      _id: [''],
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

  


  deleteItem(dat) {
    const a =  this.formData.value;
    // tslint:disable-next-line:forin
    for (let i = 0; i <= dat.registros.length; i++) {
      console.log('ware', dat.registros[i]);
            

      this._warehouse1Service.updateWarehouse(this.token, dat.registros[i]).subscribe(
              response => {
                this.warehouse1 = a;

              },
              error => {
                console.log(error as any);
              }
            );
          }

  }





  onSubmit(data) {
    console.log('final', data);
    console.log('addreslistArray', this.formData.value);  // this.formData.value



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
                },
                error  => {
                  console.log(error as any);
                }
                );

    }


    eliminarGuarnecida() {

      this.guarnecidaService.updateGuarnecida(this.token, this.warehouse1).subscribe(
        response =>  {


            },
            error => {
              console.log(error as any);
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

