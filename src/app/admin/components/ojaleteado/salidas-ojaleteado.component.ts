
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
import swal from 'sweetalert';



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

  @ViewChild('unidad') unidad: ElementRef;
  @ViewChild('perforado') perforado: ElementRef;
  @ViewChild('fueOjaleteado') fueOjaleteado: ElementRef;
   
  @ViewChild('selecOperario') selecOperario: ElementRef;
  
  // BUSQUEDA POR CANASTA
  @ViewChild('idCanasta') idCanasta: ElementRef;
  @ViewChild('registros') registros: ElementRef;
  @ViewChild('canasta') canasta: ElementRef;
  @ViewChild('canastaNumero') canastaNumero: ElementRef;


  public formData: FormGroup;
  public salidas: any[];
  public strobell: Strobell;
  public ojaleteado: Ojaleteado[];
  public operators: Operator[];
  public ojaleteador: string[];
  public perforador: string[];
  public seleccion;
  public selecOperator;
  public token;
  public busqueda;
  public busqueda2;
  public status;
  public dobles;
  public codigoRepetido = true;
  public title: string;
  public varSeleccion;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public tipoSalida;
  public mostrarReferencia;
  public numeroCanasta: string[];

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
    this.title = 'Salidas para strobell';
    this.token = this.userService.getToken();
    this.status = true;
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.ojaleteador = new Array();
    this.perforador = new Array();
    this.numeroCanasta = new Array();
    this.seleccion = '';
    this.selecOperator = '';
    this.varSeleccion = '';
    this.mostrarReferencia = false;
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


  agregarCanasta() {
    this.mostrarReferencia = true;
    this.numeroCanasta.push(this.canastaNumero.nativeElement.value);
    console.log('numerocanasta', this.numeroCanasta);

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
  // LISTA LAS UNIDADES QUE EXISTEN EN OJALETEADO
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
      this.ojaleteador.push(this.fueOjaleteado.nativeElement.value);
      this.perforador.push(this.perforado.nativeElement.value);
      // this.clasificacion.push(this.clasification.nativeElement.value);
      const perforar = document.getElementById('perforado') as HTMLInputElement;
      const ojaletear = document.getElementById('ojaleteado') as HTMLInputElement;
      

      if (perforar.checked === true) {
        this.perforador.push(this.selecOperario.nativeElement.value);
      }

      if (ojaletear.checked) {
        this.ojaleteador.push(this.selecOperario.nativeElement.value);
      }


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
      ojaleteador: [''],
      perforador: [''],
      quantity: 0.5,
      clasification: ['']
    });
  }


  // ================================================
  // GUARDAR UNA UNIDAD EN STROBELL
  // ================================================
  addStrobell(data) {
    this.ojaleteadoService.getOjaleteados().subscribe(
      response => {
        response.ojaleteado.forEach((item) => {
          item.registros.forEach((todo) => {
              todo.ojaleteador = this.selecOperator;
          });
        });
      }
    );
    
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
                  this.ojaleteador.splice(data);
                  this.perforador.splice(data);
                  this.busqueda = '';
                  this.selecOperator = '';
                  this.getOjaleteado();
                },
                error  => {
                  console.log(error as any);
                }
                );

    }

  // ================================================
  // GUARDAR UNA CANASTA EN STROBELL
  // ================================================
  addStrobellCanasta() {

    let numeroCanasta = this.idCanasta.nativeElement.value;
    this.ojaleteadoService.getOjaleteados().subscribe(
      response => {
        if (!response.ojaleteado) {
            this.status = false;
        } else {
          this.ojaleteado = response.ojaleteado;
          for (const i of response.ojaleteado) {
            numeroCanasta = JSON.parse(numeroCanasta);
            this.strobell = i;
            this.strobell.operator = this.selecOperator;
            if ( i._id === numeroCanasta ) {
              i.registros.forEach((item) => {
                const perforar = document.getElementById('perforado') as HTMLInputElement;
                const ojaletear = document.getElementById('ojaleteado') as HTMLInputElement;
                
            
                if (perforar.checked === true) {
                  item.perforador = this.selecOperator;
                  
                }
            
                if (ojaletear.checked) {
                  item.ojaleteador = this.selecOperator;
                }
            
                

              });

              this.strobellService.addStrobell(this.token, this.strobell).subscribe(
                response => {
                  
                  this.selecOperator = '';
                  this.busqueda2 = '';
                  this.canastaNumero.nativeElement.value = '';
                  this.perforador.splice(0, this.perforador.length);
                  this.ojaleteador.splice(0, this.ojaleteador.length);

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
  // ELIMINAR UNA UNIDAD  EN UNA CANASTA OJALETEADO
  // ================================================
  deleteItemOjaleteado(dat) {
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


  // ================================================
  // ELIMINA UNA CANASTA EN EL OJALETEADO
  // ================================================
deleteOjaleteado(id) {

  this.ojaleteadoService.deleteOjaleteado(this.token, id).subscribe(
    response => {
      if (!response.ojaleteado ) {
        console.log('Error en el servidor');
      }
     // this.getWarehouses();
      this.canastaNumero.nativeElement.value = '';
      this.numeroCanasta.splice(0, this.numeroCanasta.length);
    },
    error => {
      alert('Error en el servidor');
    }
  );
}


}

