
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Strobell } from '../../../models/strobell';
import { StrobellService } from '../../../services/strobell.service';
import { OjaleteadoService } from '../../../services/ojaleteado.service';
import { Ojaleteado } from '../../../models/ojaleteado';
import { UserService } from '../../../services/user.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';



@Component({
  selector: 'app-salidas-ojaleteado',
  templateUrl: './salidas-ojaleteado.component.html',
  providers: [StrobellService]
})
export class SalidasOjaleteadoComponent implements OnInit {

  // BUSQUEDA POR UNIDAD
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;

  @ViewChild('selecOperario') selecOperario: ElementRef;

  public formData: FormGroup;
  public salidas: any[];
  public strobell: Strobell;
  public ojaleteado: Ojaleteado[];
  public operators: Operator[];
  public operario: string[];
  public seleccion;
  public selecOperator;
  public token;
  public busqueda;
  public status;
  public title: string;
  public varSeleccion;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];

  constructor(
    private route: ActivatedRoute,
    private strobellService: StrobellService,
    private ojaleteadoService: OjaleteadoService,
    private operatorService: OperatorService,
    private userService: UserService,
    public router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {
    this.title = 'Salidas para inyección 1';
    this.token = this.userService.getToken();
    this.status = true;
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.operario = new Array();
    this.seleccion = '';
    this.selecOperator = '';
    this.varSeleccion = '';
    this.strobell = new Strobell('', '', []);

    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      idWare: [''],
      registros: this.fb.array([this.getaddress()]),

    });
   }

  ngOnInit() {
    this.getOjaleteado();
    this.getOperator();

    // Instruccion que no permite insertar items vacios
    const control = this.addressListArray.controls;
    control.splice(1[0]);
    
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

  capturar() {
    this.varSeleccion = this.selecOperator;
    // this.varSeleccion = JSON.stringify(this.varSeleccion);
    const code = document.getElementById('opcion');
    
  }


  get addressListArray() {

    return this.formData.get('registros') as FormArray;
  }

  // ================================================
  // LISTA LAS UNIDADES QUE EXISTEN EN STROBELL
  // ================================================
  getOjaleteado() {
    this.ojaleteadoService.getOjaleteados().subscribe(
      response => {
        if (!response.ojaleteado) {
            this.status = false;
            console.log('status', this.status);
          } else {
            this.ojaleteado = response.ojaleteado;
            console.log('ojaleteado', this.ojaleteado);
        }
      },
      error => {
        console.log(error as any);
      }
    );
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
      this.operario.push(this.selecOperario.nativeElement.value);
      // this.clasificacion.push(this.clasification.nativeElement.value);
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
      quantity: 0.5,
      clasification: ['']
    });
  }

  addStrobell(data) {
    
    this.strobellService.addStrobell(this.token, data).subscribe(
                response => {
                  console.log('data',  this.formData.value);
                  this.formData.reset();
                  const control = this.addressListArray.controls;
                  control.splice(data);
                  const s = this.formData.value.registros;
                  s.splice(data);
                  this.codigo.splice(data);
                  this.referencia.splice(data);
                  this.talla.splice(data);
                  this.idAlmacen.splice(data);
                  this.operario.splice(data);
                  this.busqueda = '';
                  this.selecOperator = '';
                  this.getOjaleteado();
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
    this.idAlmacen.splice(index, 1);

  }

  // ================================================
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA DEL STROBELL
  // ================================================
  deleteItem(dat) {
    const a =  this.formData.value;
    
    for (let i = 0; i <= dat.registros.length; i++) {
      this.ojaleteadoService.updateOjaleteado(this.token, dat.registros[i]).subscribe(
              response => {
                
                this.deleteCanastaVaciaOjaleteado();

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
deleteCanastaVaciaOjaleteado() {
  this.ojaleteadoService.getOjaleteados().subscribe(
    response => {
      if (!response.ojaleteado ) {
        console.log('Error en el servidor');
      } else {

        for (const i of response.ojaleteado) {
            if (i.registros.length === 0) {
              // this.canastaVacia.push(this.idWarehouse.nativeElement.value);

              this.ojaleteadoService.deleteOjaleteado(this.token, i._id).subscribe(
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


}

