import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public formData: FormGroup;
  public busqueda;
  public dobles;
  public codigoRepetido;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public troquelador: string[];

  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;
  @ViewChild('troquelator') troquelator: ElementRef;

  constructor(
    private fb: FormBuilder
  ) {

    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.troquelador = new Array();
    this.codigoRepetido = true;


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
        // this.status = true;

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
    console.log('eliminar', this.formData.value);
    // this.addressListArray.removeAt(index);
    console.log('index', index);

  }
}
