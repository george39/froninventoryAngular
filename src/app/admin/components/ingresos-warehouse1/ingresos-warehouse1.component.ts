import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// tslint:disable-next-line:label-position



@Component({
  selector: 'app-ingresos-warehouse1',
  templateUrl: './ingresos-warehouse1.component.html',
  providers: [UserService]
})
export class IngresosWarehouse1Component implements OnInit {
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;



  public warehouse1: Warehouse1;
  public tareaUnidad: TareaUnidad;
  public warehouse: Warehouse1[];
  public token;
  public busqueda;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public status;
  public warehouses: any[];
  public seleccion;




  formData: FormGroup;

  constructor(
    private _route: ActivatedRoute,
  	private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private _warehouse1Service: Warehouse1Service,
    private _userService: UserService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.status = true;
    this.warehouses = [
    'Troquelado',
    'Reproceso'
  ];
  this.seleccion = '';
    


    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }


  ngOnInit() {
     this.HomeworkUnit();
     this.getHomeworks();
     
     
     
     const control = this.addressListArray.controls;
     control.splice(1[0]);
  }

  get addressListArray() {
    
    return this.formData.get('registros') as FormArray;
  }


  addAddress() {
    var code = document.getElementById('code');

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
    });
  }


  HomeworkUnit() {
    this.tareaUnidadService.getHomeworkUnit().subscribe(
      response => {
        if (!response.tareaUnidad) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.tareaUnidad = response.tareaUnidad;
          console.log('tareaUnidad', this.tareaUnidad);
        }
      }
    );
  }

  getHomeworks() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          this.warehouse1 = response.warehouse1;
          console.log('tarea almacen', this.warehouse1);
        }
      }
    );
  }



  

  onSubmit(data) {
    console.log('final', data);
    console.log('addreslistArray', this.formData.value);  //this.formData.value
    
    
    
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



  removeAddress(index) {
    const s = this.formData.value.registros;
    s.splice(index, 1);
    
    const control = this.addressListArray.controls;      
    control.splice(index, 1);
    this.codigo.splice(index, 1);
    this.referencia.splice(index, 1);
    this.talla.splice(index, 1);
    console.log('eliminar', this.formData.value);
    // this.addressListArray.removeAt(index);
    console.log('index', index);

  }



}
