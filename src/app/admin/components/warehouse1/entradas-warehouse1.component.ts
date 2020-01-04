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
import { StrobellService } from '../../../services/strobell.service';
import { Strobell } from '../../../models/strobell';
import { Ojaleteado } from '../../../models/ojaleteado';
import { OjaleteadoService } from '../../../services/ojaleteado.service';
import { Reproceso } from '../../../models/reproceso';
import { ReprocesoService } from '../../../services/reproceso.service';
import { GuarnecidaExterna } from '../../../models/guarnecida-externa';
import { GuarnecidaExternaService } from '../../../services/guarnecida-externa.service';

import { Virado } from '../../../models/virado';
import { ViradoService } from '../../../services/virado.service';
import { Injection1 } from '../../../models/injection1';
import { Injection1Service } from '../../../services/injection1.service';
import swal from 'sweetalert';






@Component({
  selector: 'app-entradas-warehouse1',
  templateUrl: './entradas-warehouse1.component.html',
  providers: [UserService]
})
export class EntradasWarehouse1Component implements OnInit {

  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;
  @ViewChild('idWarehouse') idWarehouse: ElementRef;
  @ViewChild('conStrobell') conStrobell: ElementRef;
  @ViewChild('sinStrobell') sinStrobell: ElementRef;
  @ViewChild('operaratorStrobell') operartorStrobell: ElementRef;
  
  
  
  public warehouse1: Warehouse1;
  public tareaUnidad: TareaUnidad;
  public guarnecidaInterna: Guarnecida[];
  public strobell: Strobell[];
  public ojaleteado: Ojaleteado[];
  public reproceso: Reproceso[];
  public virado: Virado[];
  public guarnecidaExterna: GuarnecidaExterna[];
  public injection: Injection1[];
  public token;
  public busqueda;
  public dobles;
  public codigoRepetido = true;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public operarioStrobell: string[];
  public idAlmacen: string[];
  public status;
  public warehouses: any[];
  public seleccion;
  public clasificacion: any[];

  formData: FormGroup;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private _warehouse1Service: Warehouse1Service,
    private guarnecidaService: GuarnecidaService,
    private strobellService: StrobellService,
    private ojaleteadoService: OjaleteadoService,
    private reprocesoService: ReprocesoService,
    private guarnecidaExternaService: GuarnecidaExternaService,
    private injectionService: Injection1Service,
    private viradoService: ViradoService,
    private _userService: UserService,
    private http: HttpClient,


    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    // this.warehouse1 = new Warehouse1('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '', '');
    // this.guarnecida = new Guarnecida('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.clasificacion = new Array();
    this.operarioStrobell = new Array();
    this.status = true;
    this.seleccion = '';
    

    this.warehouses = [
    'Guarnecida-Interna',
    'Guarnecida-Externa',
    'Strobell',
    'Ojaleteado',
    'Virado',
    'Inyeccion-Cementado',
    'Reproceso'
    ];



    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      idWare: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }

  

  ngOnInit() {
    this.getGuarnecida();
    this.getGuarnecidaExterna();
    this.getStrobell();
    this.getOjaleteado();
    this.getReproceso();
    this.getVirado();
    this.getInjection();
    
    

    // INSTRUCCION QUE NO PERMITE INSERTAR ITEMS VACIOS
    const control = this.addressListArray.controls;
    control.splice(1[0]);
  }


  get addressListArray() {

    return this.formData.get('registros') as FormArray;
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
           if (event.keyCode === 13) {
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
    this.busqueda = '';

    if ( this.code.nativeElement && this.codigoRepetido === true) {

      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.idAlmacen.push(this.idWarehouse.nativeElement.value);
      // this.operarioStrobell.push(this.operartorStrobell.nativeElement.value);
      // this.clasificacion.push(this.clasification.nativeElement.value);
      this.busqueda = '';
      this.status = true;

      const conStrobel = document.getElementById('conStrobell') as HTMLInputElement;
      const sinStrobel = document.getElementById('sinStrobell') as HTMLInputElement;

      if (conStrobel.checked) {
        this.clasificacion.push(this.conStrobell.nativeElement.value);

        }

      if (sinStrobel.checked) {
        this.clasificacion.push(this.sinStrobell.nativeElement.value);

          }

      console.log('clasificacion', this.clasificacion);



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
      operarioStrobell: [],
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
        if (!response.guarnecidaInterna ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.guarnecidaInterna) {
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
  // LISTA LAS UNIDADES QUE EXISTEN EN GUARNECIDA EXTERNA
  // ================================================
  getGuarnecidaExterna() {
    this.guarnecidaExternaService.getGuarnecidasExterna().subscribe(
      response => {
        if (!response.guarnecidaExterna) {
          this.status = false;
          console.log('no entro ', this.status);
        } else {
          this.guarnecidaExterna = response.guarnecidaExterna;
          console.log('guarnecidaExterna', this.guarnecidaExterna);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



// ================================================
// ELIMINA UNA UNIDAD DE GUARNECIDA EXTERNA
// ================================================
  deleteItemGuarnecidaExterna(dat) {
    
    for (let i = 0; i <= dat.registros.length; i++) {

      this.guarnecidaExternaService.updateGuarnecidaExterna(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaGuarnecidaExterna();

              },
              error => {
                console.log(error as any);
              }
            );
          }

  }


// ================================================
// ELIMINAR COLECCIONES VACIAS DE GUARNECIDA EXTERNA
// ================================================
  deleteCanastaVaciaGuarnecidaExterna() {
    this.guarnecidaExternaService.getGuarnecidasExterna().subscribe(
      response => {
        if (!response.guarnecidaExterna ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.guarnecidaExterna) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.guarnecidaExternaService.deleteGuarnecidaExterna(this.token, i._id).subscribe(
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
  // ELIMINA UNA UNIDAD DE OJALETEADO
  // ================================================
  deleteItemOjaleteado(dat) {

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
  // ELIMINAR COLECCIONES VACIAS DE OJALETEADO
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
  // ELIMINA UNA UNIDAD DE STROBELL
  // ================================================
  deleteItemStrobell(dat) {

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
  // ELIMINAR COLECCIONES VACIAS DE STROBELL
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

  // ================================================
  // LISTA LAS UNIDADES QUE EXISTEN EN INYECCION
  // ================================================
  getInjection() {
    this.injectionService.getInjections().subscribe(
      response => {
        if (!response.injection) {
            this.status = false;
            console.log('statusi', this.status);
          } else {
            this.injection = response.injection;
            console.log('injection', this.injection);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA UNIDAD DE INYECCION
  // ================================================
  deleteItemInjection(dat) {

    for (let i = 0; i <= dat.registros.length; i++) {

      this.injectionService.updateInjection(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaInjection();

            },
              error => {
                console.log(error as any);
              }
            );
          }
  }




  // ================================================
  // ELIMINAR COLECCIONES VACIAS DE   INYECCION
  // ================================================
  deleteCanastaVaciaInjection() {
    this.injectionService.getInjections().subscribe(
      response => {
        if (!response.injection ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.injection) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.injectionService.deleteInjection1(this.token, i._id).subscribe(
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
  // LISTA LAS UNIDADES QUE EXISTEN EN REPROCESO
  // ================================================
  getReproceso() {
    this.reprocesoService.getReproceso().subscribe(
      response => {
        if (!response.reproceso) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.reproceso = response.reproceso;
          console.log('reproceso', this.reproceso);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA UNIDAD DE REPROCESO
  // ================================================
  deleteItemReproceso(dat) {
      
    for (let i = 0; i <= dat.registros.length; i++) {
  
      this.reprocesoService.updateReproceso(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaReproceso();
  
              },
              error => {
                console.log(error as any);
              }
            );
          }
  
  }



  // ================================================
  // ELIMINAR COLECCIONES VACIAS DE REPROCESO
  // ================================================
  deleteCanastaVaciaReproceso() {
    this.reprocesoService.getReproceso().subscribe(
      response => {
        if (!response.reproceso ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.reproceso) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.reprocesoService.deleteReproceso(this.token, i._id).subscribe(
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
  // LISTA LAS UNIDADES QUE EXISTEN EN VIRADO
  // ================================================
  getVirado() {
    this.viradoService.getVirados().subscribe(
      response => {
        if (!response.virado) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.virado = response.virado;
          console.log('virado', this.virado);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA UNIDAD DE VIRADO
  // ================================================
  deleteItemVirado(dat) {
      
    for (let i = 0; i <= dat.registros.length; i++) {
  
      this.viradoService.updateInVirado(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaVirado();
  
              },
              error => {
                console.log(error as any);
              }
            );
          }
  
  }



  // ================================================
  // ELIMINAR COLECCIONES VACIAS DE VIRADO
  // ================================================
  deleteCanastaVaciaVirado() {
    this.viradoService.getVirados().subscribe(
      response => {
        if (!response.virado ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.virado) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.viradoService.deleteVirado(this.token, i._id).subscribe(
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
                  this.getReproceso();
                  this.getStrobell();
                  this.getOjaleteado();
                  this.getGuarnecidaExterna();
                  this.getInjection();

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
