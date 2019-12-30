import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Warehouse2 } from '../../../models/warehouse2';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Warehouse2Service } from '../../../services/warehouse2.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Injection1 } from '../../../models/injection1';
import { Injection1Service } from '../../../services/injection1.service';
import { Reproceso } from '../../../models/reproceso';
import { ReprocesoService } from '../../../services/reproceso.service';
import { Termination } from '../../../models/termination';
import { TerminationService } from '../../../services/termination.service';
import { Vulcanizado } from 'src/app/models/vulcanizado';
import { VulcanizadoService } from '../../../services/vulcanizado.service';
import swal from 'sweetalert';


// tslint:disable-next-line:label-position



@Component({
  selector: 'app-entradas-warehouse2',
  templateUrl: './entradas-warehouse2.component.html',
  providers: [UserService]
})
export class EntradasWarehouse2Component implements OnInit {

  public warehouse2: Warehouse2;
  public injection: Injection1[];
  public reproceso: Reproceso[];
  public termination: Termination[];
  public guarnecida: Guarnecida[];
  public vulcanizado: Vulcanizado[];
  public token;
  public busqueda;
  public dobles;
  public codigoRepetido = true;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public idAlmacen: string[];
  public status;
  public warehouses: any[];
  public seleccion;
  public clasificacion: any[];
  public formData: FormGroup;

  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private injectionService: Injection1Service,
    private warehouse2Service: Warehouse2Service,
    private guarnecidaService: GuarnecidaService,
    private reprocesoService: ReprocesoService,
    private terminationService: TerminationService,
    private vulcanizadoService: VulcanizadoService,
    private userService: UserService,
    private http: HttpClient,
    

    private fb: FormBuilder
  ) {
    this.token = this.userService.getToken();
    this.warehouse2 = new Warehouse2('', '', []);
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.idAlmacen = new Array();
    this.seleccion = '';
    this.clasificacion = new Array();
    this.status = true;
   
    this.warehouses = [
    'Inyeccion',
    'Terminacion',
    'Guarnecida',
    'Vulcanizado',
    'Reproceso'
    ];



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
    this.getInjection();
    this.getReproceso();
    this.getTermination();
    this.getGuarnecida();
    this.getVulcanizado();

    // INSTRUCCION QUE NO PERMITE INSERTAR ITEMS VACIOS
    const control = this.addressListArray.controls;
    control.splice(1[0]);
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
      // this.clasificacion.push(this.clasification.nativeElement.value);
      this.busqueda = '';
      this.status = true;

      var primera = document.getElementById('primera') as HTMLInputElement;
      var segunda = document.getElementById('segunda') as HTMLInputElement;

      if (primera.checked) {
        this.clasificacion.push(this.primera.nativeElement.value);

        }

      if (segunda.checked) {
        this.clasificacion.push(this.segunda.nativeElement.value);

          }
      console.log('clasifiacion', this.clasificacion);


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
  // LISTA LAS UNIDADES QUE EXISTEN EN TERMINADO
  // ================================================
  getTermination() {
    this.terminationService.getTerminations().subscribe(
      response => {
        if (!response.termination) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.termination = response.termination;
          console.log('termination', this.termination);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA UNIDAD DE TERMINADO
  // ================================================
  deleteItemTermination(dat) {
      
    for (let i = 0; i <= dat.registros.length; i++) {
  
      this.terminationService.updateTermination(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaTermination();
  
              },
              error => {
                console.log(error as any);
              }
            );
          }
  
  }



  // ================================================
  // ELIMINAR COLECCIONES VACIAS DE TERMINADO
  // ================================================
  deleteCanastaVaciaTermination() {
    this.terminationService.getTerminations().subscribe(
      response => {
        if (!response.termination ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.termination) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.terminationService.deleteTermination(this.token, i._id).subscribe(
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
  // LISTA LAS UNIDADES QUE EXISTEN EN VULCANIZADO
  // ================================================
  getVulcanizado() {
    this.vulcanizadoService.getVulcanizados().subscribe(
      response => {
        if (!response.vulcanizado) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.vulcanizado = response.vulcanizado;
          console.log('vulcanizado', this.vulcanizado);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  // ================================================
  // ELIMINA UNA UNIDAD DE VULCANIZADO
  // ================================================
  deleteItemVulcanizado(dat) {
      
    for (let i = 0; i <= dat.registros.length; i++) {
  
      this.vulcanizadoService.updateVulcanizado(this.token, dat.registros[i]).subscribe(
              response => {
                this.deleteCanastaVaciaVulcanizado();
  
              },
              error => {
                console.log(error as any);
              }
            );
          }
  
  }



  // ================================================
  // ELIMINAR COLECCIONES VACIAS DE VULCANIZADO
  // ================================================
  deleteCanastaVaciaVulcanizado() {
    this.vulcanizadoService.getVulcanizados().subscribe(
      response => {
        if (!response.vulcanizado ) {
          console.log('Error en el servidor');
        } else {
  
          for (const i of response.vulcanizado) {
              if (i.registros.length === 0) {
                // this.canastaVacia.push(this.idWarehouse.nativeElement.value);
  
                this.vulcanizadoService.deleteVulcanizado(this.token, i._id).subscribe(
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





  addWarehouse2(data) {
    
    this.warehouse2Service.addWarehouse2(this.token, data).subscribe(
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
                  this.idAlmacen.splice(data);
                  this.getInjection();
                  this.getReproceso();
                  this.getTermination();
                  this.getGuarnecida();
                  this.getVulcanizado();
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



}
