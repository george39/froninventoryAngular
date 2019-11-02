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


// tslint:disable-next-line:label-position



@Component({
  selector: 'app-entradas-warehouse1',
  templateUrl: './entradas-warehouse1.component.html',
  providers: [UserService]
})
export class EntradasWarehouse1Component implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private _warehouse1Service: Warehouse1Service,
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private http: HttpClient,


    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    // this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.clasificacion = new Array();
    this.status = true;
    this.seleccion = '';

    this.warehouses = [
    'Guarnecida interna',
    'Guarnecida externa',
    'Strobell',
    'Ojaleteado',
    'Virado',
    'Reproceso'
    ];



    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      idWare: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }

  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;
  @ViewChild('conStrobell') conStrobell: ElementRef;
  @ViewChild('sinStrobell') sinStrobell: ElementRef;
  
  
  
  public warehouse1: Warehouse1;
  public tareaUnidad: TareaUnidad;
  public guarnecida: Guarnecida;
  public token;
  public busqueda;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public status;
  public warehouses: any[];
  public seleccion;
  public clasificacion: any[];

  formData: FormGroup;


  ngOnInit() {
    this.getGuarnecida();
    // this.getWarehouses()

    // INSTRUCCION QUE NO PERMITE INSERTAR ITEMS VACIOS
    const control = this.addressListArray.controls;
    control.splice(1[0]);
  }


  get addressListArray() {

    return this.formData.get('registros') as FormArray;
  }


  // ================================================
  // AGREGA UNA UNIDAD A LA LISTA PARA SER GUARDADA 
  // ================================================
  addAddress() {
    // Me pone el scroll al principio
    var scrol = document.getElementById('caja');
    // scrol.innerHTML = html;
    scrol.scrollTop = scrol.scrollHeight;


    const code = document.getElementById('code');
    console.log('code', code);
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
      // this.clasificacion.push(this.clasification.nativeElement.value);
      this.busqueda = '';
      this.status = true;

      var conStrobell = document.getElementById('conStrobell') as HTMLInputElement;
      var sinStrobell = document.getElementById('sinStrobell') as HTMLInputElement;

      if (conStrobell.checked) {
        this.clasificacion.push(this.conStrobell.nativeElement.value);

        }

      if (sinStrobell.checked) {
        this.clasificacion.push(this.sinStrobell.nativeElement.value);

          }



    }
  }


// ================================================
// RECOJE LOS VALORES DE CADA UNO DE LOS ITEMS
// ================================================
  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      _id: [''],
      quantity: 0.5,
      clasification: ['']
    });
  }


  // ================================================
  // LISTA LAS UNIDADES QUE EXISTEN EN GUARNECIDA
  // ================================================
  getGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecida) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.guarnecida = response.guarnecida;
          console.log('guarnecida', this.guarnecida);
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
// GUARDA UN CONJUNTO DE UNIDADES EN EL ALMACEN 1
// ================================================
  onSubmit(data) {
    
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
// ELIMINA UN ITEM DE LA LISTA ANTES DE GUARDAR
// ================================================
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
