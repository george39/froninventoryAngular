
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';



import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
// tslint:disable-next-line:label-position



@Component({
  selector: 'app-entradas-guarnecida',
  templateUrl: './entradas-guarnecida.component.html',
  styles: []
})
export class EntradasGuarnecidaComponent implements OnInit {

  public tareaUnidad: TareaUnidad;
  public guarnecida: Guarnecida;
  public warehouse: [];
  public token;
  public busqueda;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public troquelador: string[];
  public status;
  public codigoRepetido;
  public repetido;
  public dobles;
  public warehouses: any[];
  public seleccion;
  public clasificacion: any[];

  formData: FormGroup;

  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private tareaUnidadService: TareaUnidadService,    
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private http: HttpClient,
    

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    // this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.troquelador = new Array();
    
    this.clasificacion = new Array();
    this.status = true;
    this.codigoRepetido = true;
    this.repetido = [];
   
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
  @ViewChild('troquelator') troquelator: ElementRef;


  ngOnInit() {
     this.HomeworkUnit();
     // this.getWarehouses();

     // INSTRUCCION QUE NO PERMITE INSERTAR ITEMS VACIOS
     const control = this.addressListArray.controls;
     control.splice(1[0]);
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
    // this.repetido.push(this.code.nativeElement.value);

    const code = document.getElementById('code');
    if ( code === null) {

      this.noEncontrado();

      }

    this.repetidos();



    if ( this.code.nativeElement && this.codigoRepetido === true) {

        this.codigo.push(this.code.nativeElement.value);
        this.addressListArray.push(this.getaddress());
        const control = this.formData.controls.registros;
        const control2 = this.addressListArray.controls;
        this.referencia.push(this.reference.nativeElement.value);
        this.talla.push(this.size.nativeElement.value);
        this.idAlmacen.push(this.idWarehouse.nativeElement.value);
        this.troquelador.push(this.troquelator.nativeElement.value);
        // this.clasificacion.push(this.clasification.nativeElement.value);
        this.status = true;

        this.busqueda = '';
        console.log('formdata', this.codigo);
    }
  }

  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
      troquelator: [''],
      quantity: 0.5,
      clasification: ['']
    });
  }


  HomeworkUnit() {
    this.tareaUnidadService.getHomeworksUnit().subscribe(
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

  deleteTroquelado(id) {
    this.tareaUnidadService.deleteTroquelado(this. token, id).subscribe(
      response => {
        this.HomeworkUnit();

      },
      error => {
        console.log(error as any);
      }
    );
  }


  // deleteItem(dat) {
  //   const a =  this.formData.value;
  //   // tslint:disable-next-line:forin
  //   for (let i = 0; i <= dat.registros.length; i++) {
  //     console.log('ware', dat.registros[i]);
            

  //     this._warehouse1Service.updateWarehouse(this.token, dat.registros[i]).subscribe(
  //             response => {
  //               this.warehouse1 = a;

  //             },
  //             error => {
  //               console.log(error as any);
  //             }
  //           );
  //         }

  // }





  onSubmit(data) {
    
    this.guarnecidaService.addGuarnecida(this.token, data).subscribe(
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
                  this.HomeworkUnit();
                },
                error  => {
                  console.log(error as any);
                }
                );

    }


    // eliminarGuarnecida() {

    //   this.guarnecidaService.updateGuarnecida(this.token, this.warehouse1).subscribe(
    //     response =>  {


    //         },
    //         error => {
    //           console.log(error as any);
    //         }
    //         );
    //       }



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
      console.log('eliminar', this.formData.value);
      // this.addressListArray.removeAt(index);
      console.log('index', index);

    }



}
