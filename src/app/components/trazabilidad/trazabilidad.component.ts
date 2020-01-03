import { Component, OnInit, Input, Output} from '@angular/core';
import { GuarnecidaExterna } from '../../models/guarnecida-externa';
import { Guarnecida } from '../../models/guarnecida';
import { Troquelado } from '../../models/troquelado';
import { Strobell } from '../../models/strobell';
import { Ojaleteado } from '../../models/ojaleteado';
import { Warehouse1 } from '../../models/warehouse1';
import { Warehouse2 } from '../../models/warehouse2';
import { Termination } from '../../models/termination';
import { Injection1 } from '../../models/injection1';
import { TerminationService } from '../../services/termination.service';
import { Injection1Service } from '../../services/injection1.service';
import { GuarnecidaExternaService } from '../../services/guarnecida-externa.service';
import { GuarnecidaService } from 'src/app/services/guarnecida.service';
import { GLOBAL } from '../../services/global';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TroqueladoService } from '../../services/troquelado.service';
import { StrobellService } from '../../services/strobell.service';
import { OjaleteadoService } from '../../services/ojaleteado.service';
import { Warehouse1Service } from '../../services/warehouse1.service';
import { Warehouse2Service } from 'src/app/services/warehouse2.service';
import { TareaUnidad } from '../../models/tareaUnidad';
import { TareaUnidadService } from '../../services/tarea-unidad.service';
import { Reproceso } from '../../models/reproceso';
import { ReprocesoService } from '../../services/reproceso.service';
import { Vulcanizado } from 'src/app/models/vulcanizado';
import { VulcanizadoService } from '../../services/vulcanizado.service';


@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styles: []
})
export class TrazabilidadComponent implements OnInit {
  public url: string;
  public buscarCodigo: string;

  public guarnecidaExterna: GuarnecidaExterna[];
  public guarnecidaInterna: Guarnecida[];
  public troquelado: Troquelado[];
  public tareaUnidad: TareaUnidad[];
  public strobell: Strobell[];
  public ojaleteado: Ojaleteado[];
  public warehouse1: Warehouse1[];
  public warehouse2: Warehouse2[];
  public termination: Termination[];
  public injection: Injection1[];
  public reproceso: Reproceso[];
  public vulcanizado: Vulcanizado[];


  public consolidadoGuarnecidaInterna = [];
  public consolidadoGuarnecidaExterna = [];
  public consolidadoTroquelado = [];
  public consolidadoStrobell = [];
  public consolidadoOjaleteado = [];
  public consolidadoAlmacen1 = [];
  public consolidadoAlmacen2 = [];
  public consolidadoTermination = [];
  public consolidadoInjection = [];
  public consolidadoReproceso = [];
  public consolidadoVulcanizado = [];



  public estaCodigoGuarnecidaInterna = false;
  public estaCodigoGuarnecidaExterna = false;
  public estaCodigoTroquelado = false;
  public estaCodigoStrobell = false;
  public estaCodigoOjaleteado = false;
  public estaCodigoAlmacen1 = false;
  public estaCodigoAlmacen2 = false;
  public estaCodigoTerminado = false;
  public estaCodigoInyeccion = false;
  public estaCodigoReproceso = false;
  public estaCodigoVulcanizado = false;



  constructor(
    private guarnecidaInternaService: GuarnecidaService,
    private guarnecidaExternaService: GuarnecidaExternaService,
    private troqueladoService: TroqueladoService,
    private tareaUnidadService: TareaUnidadService,
    private strobellService: StrobellService,
    private ojaleteadoService: OjaleteadoService,
    private almacen1Service: Warehouse1Service,
    private almacen2Service: Warehouse2Service,
    private terminationService: TerminationService,
    private injectionService: Injection1Service,
    private vulcanizadoService: VulcanizadoService,
    public activatedRoute: ActivatedRoute,
    public reprocesoService: ReprocesoService,
    public http: HttpClient,
  ) {
    
   }


  ngOnInit() {

  }


  getGuarnecidaInterna() {
    this.guarnecidaInternaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {

        } else {
          response.guarnecidaInterna.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoGuarnecidaInterna.push(consolidado);
                this.estaCodigoGuarnecidaInterna = true;
                this.buscarCodigo = '';

              }

            });
          });
          this.guarnecidaInterna =  this.consolidadoGuarnecidaInterna;

              }
            },
            error => {
              console.log(error as any);
            }
            );
    }


  getGuarnecidaExterna() {
    this.guarnecidaExternaService.getGuarnecidasExterna().subscribe(
      response => {
        if (!response.guarnecidaExterna) {

        } else {
          response.guarnecidaExterna.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoGuarnecidaExterna.push(consolidado);
                this.estaCodigoGuarnecidaExterna = true;
                this.buscarCodigo = '';

              }

            });
          });
          this.guarnecidaExterna =  this.consolidadoGuarnecidaExterna;
          console.log('guarnexterna', this.guarnecidaExterna);

              }
            },
            error => {
              console.log(error as any);
            }
            );
    }


    getTroquelado() {
      this.tareaUnidadService.getHomeworksUnit().subscribe(
        response => {
          if (!response.tareaUnidad) {
  
          } else {
            // response.troquelado.forEach((item) => {
            //   item.registros.forEach((consolidado) => {
  
            //     if ( consolidado.code === this.buscarCodigo) {
            //       this.consolidadoTroquelado.push(consolidado);
            //       this.estaCodigoTroquelado = true;
            //       this.buscarCodigo = '';
  
            //     }
  
            //   });
            // });
            response.tareaUnidad.forEach((item) => {
              if (item.code === this.buscarCodigo) {
                this.consolidadoTroquelado.push(item);
                this.estaCodigoTroquelado = true;
                this.buscarCodigo = '';
              }
            });
            this.tareaUnidad =  this.consolidadoTroquelado;
            
  
                }
              },
              error => {
                console.log(error as any);
              }
              );
      }


  getStrobell() {
    this.strobellService.getStrobells().subscribe(
      response => {
        if (!response.strobell) {

        } else {
          response.strobell.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoStrobell.push(consolidado);
                this.estaCodigoStrobell = true;
                this.buscarCodigo = '';

              }

            });
          });
          this.strobell =  this.consolidadoStrobell;

              }
            },
            error => {
              console.log(error as any);
            }
            );
    }


getOjaleteado() {
  this.ojaleteadoService.getOjaleteados().subscribe(
    response => {
      if (!response.ojaleteado) {

      } else {
        response.ojaleteado.forEach((item) => {
          item.registros.forEach((consolidado) => {

            if ( consolidado.code === this.buscarCodigo) {
              this.consolidadoOjaleteado.push(consolidado);
              this.estaCodigoOjaleteado = true;
              this.buscarCodigo = '';

            }

          });
        });
        this.ojaleteado =  this.consolidadoOjaleteado;

            }
          },
          error => {
            console.log(error as any);
          }
          );
  }


  getAlamcen1() {
    this.almacen1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          response.warehouse1.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoAlmacen1.push(consolidado);
                this.estaCodigoAlmacen1 = true;
                this.buscarCodigo = '';

              }

            });
          });
          this.warehouse1 =  this.consolidadoAlmacen1;

              }
            },
            error => {
              console.log(error as any);
            }
            );
    // this.consolidadoAlmacen1 = [];
    }


getAlamcen2() {
  this.almacen2Service.getWarehouses2().subscribe(
    response => {
      if (!response.warehouse2) {

      } else {
        response.warehouse2.forEach((item) => {
          item.registros.forEach((consolidado) => {

            if ( consolidado.code === this.buscarCodigo) {
              this.consolidadoAlmacen2.push(consolidado);
              this.estaCodigoAlmacen2 = true;
              this.buscarCodigo = '';

            }

          });
        });
        this.warehouse2 =  this.consolidadoAlmacen2;

            }
          },
          error => {
            console.log(error as any);
          }
          );
  }


  getTermination() {
    this.terminationService.getTerminations().subscribe(
      response => {
        if (!response.termination) {

        } else {
          response.termination.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoTermination.push(consolidado);
                this.estaCodigoTerminado = true;
                this.buscarCodigo = '';
  
              }
            });
          });
          this.termination = this.consolidadoTermination;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }


  getInjection() {
    this.injectionService.getInjections().subscribe(
      response => {
        if (!response.injection) {

        } else {
          response.injection.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoInjection.push(consolidado);
                this.estaCodigoInyeccion = true;
                this.buscarCodigo = '';

              }

            });
          });

          this.injection = this.consolidadoInjection;


        }
      },
      error => {
        console.log(error as any);
      }
    );

  }


  getReproceso() {
    this.reprocesoService.getReproceso().subscribe(
      response => {
        if (!response.reproceso) {

        } else {
          response.reproceso.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoReproceso.push(consolidado);
                this.estaCodigoReproceso = true;
                this.buscarCodigo = '';

              }

            });
          });

          this.reproceso = this.consolidadoReproceso;


        }
      },
      error => {
        console.log(error as any);
      }
    );

  }

  getVulcanizado() {
    this.vulcanizadoService.getVulcanizados().subscribe(
      response => {
        if (!response.vulcanizado) {

        } else {
          response.vulcanizado.forEach((item) => {
            item.registros.forEach((consolidado) => {

              if ( consolidado.code === this.buscarCodigo) {
                this.consolidadoVulcanizado.push(consolidado);
                this.estaCodigoVulcanizado = true;
                this.buscarCodigo = '';

              }

            });
          });

          this.vulcanizado = this.consolidadoVulcanizado;


        }
      },
      error => {
        console.log(error as any);
      }
    );

  }



  todos() {

    this.getGuarnecidaInterna();
    this.getGuarnecidaExterna();
    this.getTroquelado();
    this.getStrobell();
    this.getOjaleteado();
    this.getAlamcen1();
    this.getAlamcen2();
    this.getTermination();
    this.getInjection();
    this.getReproceso();
    this.getVulcanizado();
    
  }

}
