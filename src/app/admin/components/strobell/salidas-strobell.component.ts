
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Strobell } from '../../../models/strobell';
import { StrobellService } from '../../../services/strobell.service';
import { Injection1Service } from '../../../services/injection1.service';
import { Injection1 } from '../../../models/injection1';
import { UserService } from '../../../services/user.service';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';
import swal from 'sweetalert';



@Component({
  selector: 'app-salidas-strobell',
  templateUrl: './salidas-strobell.component.html',
  providers: [StrobellService]
})
export class SalidasStrobellComponent implements OnInit {

  // BUSQUEDA POR UNIDAD
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;

  @ViewChild('selecOperario') selecOperario: ElementRef;

  public formData: FormGroup;
  public salidas: any[];
  public strobell: Strobell[];
  public operators: Operator[];
  public operario: string[];
  public injection: Injection1;
  public token;
  public busqueda;
  public status;
  public seleccion;
  public selecOperator;
  public varSeleccion;
  public dobles;
  public codigoRepetido = true;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];

  constructor(
    private route: ActivatedRoute,
    private strobellService: StrobellService,
    private injectionService: Injection1Service,
    private userService: UserService,
    private operatorService: OperatorService,
    public router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {
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
    this.injection = new Injection1('', '', []);

    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      idWare: [''],
      registros: this.fb.array([this.getaddress()]),

    });
   }

  ngOnInit() {
    this.getStrobell();
    this.getOperator();

    // Instruccion que no permite insertar items vacios
    const control = this.addressListArray.controls;
    control.splice(1[0]);
    
  }


  get addressListArray() {

    return this.formData.get('registros') as FormArray;
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



  // ================================================
  // LISTA LAS UNIDADES QUE EXISTEN EN STROBELL
  // ================================================
  getStrobell() {
    this.strobellService.getStrobells().subscribe(
      response => {
        if (!response.strobell) {
            this.status = false;
            console.log('status', this.status);
          } else {
            this.strobell = response.strobell;
            console.log('strobell', this.strobell);
        }
      },
      error => {
        console.log(error as any);
      }
    );
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

  addInjection1(data) {
    
    this.injectionService.addInjection1(this.token, data).subscribe(
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
                  this.getStrobell();
                },
                error  => {
                  console.log(error as any);
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

  // ================================================
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA DEL STROBELL
  // ================================================
  deleteItem(dat) {
    const a =  this.formData.value;
    
    for (let i = 0; i <= dat.registros.length; i++) {
      this.strobellService.updateStrobell(this.token, dat.registros[i]).subscribe(
              response => {
                
                this.deleteCanastaVaciaStrobell();

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
deleteCanastaVaciaStrobell() {
  this.strobellService.getStrobells().subscribe(
    response => {
      if (!response.strobell ) {
        console.log('Error en el servidor');
      } else {

        for (const i of response.strobell) {
            if (i.registros.length === 0) {
              // this.canastaVacia.push(this.idWarehouse.nativeElement.value);

              this.strobellService.deleteStrobell(this.token, i._id).subscribe(
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
