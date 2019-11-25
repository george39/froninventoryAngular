import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { Warehouse2Service } from '../../../services/warehouse2.service';
import { Warehouse2 } from '../../../models/warehouse2';
import { UpdateReferenceService } from '../../../services/update-reference.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-update-reference',
  templateUrl: './update-reference.component.html',
  styles: []
})
export class UpdateReferenceComponent implements OnInit {
  public busqueda;
  public warehouse2: Warehouse2;
  public token;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public status;
  public formData: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouse2Service: Warehouse2Service,
    private updateReferenceService: UpdateReferenceService,
    private userService: UserService,

    private fb: FormBuilder

  ) { 
    this.token = userService.getToken();
    this.warehouse2 = new Warehouse2('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.status = true;

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
  @ViewChild('primera') primera: ElementRef;
  @ViewChild('segunda') segunda: ElementRef;

  ngOnInit() {
    this.getWarehouse2();

     // INSTRUCCION QUE NO PERMITE INSERTAR ITEMS VACIOS
    const control = this.addressListArray.controls;
    control.splice(1[0]);
  }


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
      this.status = true;
      // this.clasificacion.push(this.clasification.nativeElement.value);
      this.busqueda = '';


    }
  }

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

  getWarehouse2() {
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        this.warehouse2 = response.warehouse2;
        console.log('almacen ', this.warehouse2);
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

  updateReference(dat) {

    for (let i = 0; i <= dat.registros.length; i++) {

      this.updateReferenceService.updateReference(this.token, dat.registros[i]).subscribe(
              response => {
                this.warehouse2 = response.warehouse2;
                this.formData.reset();
                const control = this.addressListArray.controls;
                control.splice(dat);
                const s = this.formData.value.registros;
                s.splice(dat);
                this.codigo.splice(dat);
                this.referencia.splice(dat);
                this.talla.splice(dat);
                this.idAlmacen.splice(dat);
                this.busqueda = '';
                this.getWarehouse2();

            },
              error => {
                console.log(error as any);
              }
            );
          }
  }

}
