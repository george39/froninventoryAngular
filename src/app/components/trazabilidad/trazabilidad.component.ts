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
  public strobell: Strobell[];
  public ojaleteado: Ojaleteado[];
  public almacen1: Warehouse1[];
  public almacen2: Warehouse2[];
  public termination: Termination[];
  public injection: Injection1[];
  

  public consolidadoGuarnecidaInterna = [];
  public consolidadoGuarnecidaExterna = [];
  public consolidadoTroquelado = [];
  public consolidadoStrobell = [];
  public consolidadoOjaleteado = [];
  public consolidadoAlmacen1 = [];
  public consolidadoAlmacen2 = [];
  public consolidadoTermination = [];
  public consolidadoInjection = [];

  

  public estaCodigoGuarnecidaInterna = false;
  public estaCodigoGuarnecidaExterna = false;
  public estaCodigoTroquelado = false;
  public estaCodigoStrobell = false;
  public estaCodigoOjaleteado = false;
  public estaCodigoAlamacen1 = false;
  public estaCodigoAlamacen2 = false;
  public estaCodigoTerminado = false;
  public estaCodigoInyeccion = false;



  constructor(
    private guarnecidaInternaService: GuarnecidaService,
    private guarnecidaExternaService: GuarnecidaExternaService,
    private troqueladoService: TroqueladoService,
    private strobellService: StrobellService,
    private ojaleteadoService: OjaleteadoService,
    private alamcen1Service: Warehouse1Service,
    private alamcen2Service: Warehouse2Service,
    private terminationService: TerminationService,
    private injectionService: Injection1Service,
    public activatedRoute: ActivatedRoute,
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
        if (!response.guarnecidaExterma) {

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

              }
            },
            error => {
              console.log(error as any);
            }
            );
    }


    getGuarnecidaTroquelado() {
      this.troqueladoService.getTroquelados().subscribe(
        response => {
          if (!response.troquelado) {
  
          } else {
            response.troquelado.forEach((item) => {
              item.registros.forEach((consolidado) => {
  
                if ( consolidado.code === this.buscarCodigo) {
                  this.consolidadoTroquelado.push(consolidado);
                  this.estaCodigoTroquelado = true;
                  this.buscarCodigo = '';
  
                }
  
              });
            });
            this.troquelado =  this.consolidadoTroquelado;
  
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
              this.consolidadoTermination.push(consolidado);
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



  todos() {

    this.getGuarnecidaInterna();
    this.getInjection();
    
  }

}
