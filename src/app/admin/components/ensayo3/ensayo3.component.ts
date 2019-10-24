import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Guarnecida } from '../../../models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse2 } from 'src/app/models/warehouse2';
import { Injection1 } from '../../../models/injection1';
import { UserService } from '../../../services/user.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-ensayo3',
  templateUrl: './ensayo3.component.html',
  styleUrls: ['./ensayo3.component.css'],
  providers: [TareaUnidadService]
})
export class Ensayo3Component implements OnInit {
  

  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;

  public busqueda;

  // warehouse1 = new Warehouse1('', '', '', '', '', []);
  
  public token;
  public tareaUnidad: TareaUnidad;
  public guarnecida: Guarnecida;
  
  public registro: number;
  public regis: string[];
  public regis2: string[];
  public marcas: any[];
  public codigo: string[];
  public referencia: string[];
  public talla: string[];


  constructor(
    
    
    private router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _tareaUnidadService: TareaUnidadService,
    private http: HttpClient,
    private _guarnecidaService: GuarnecidaService
  ) {
    this.marcas = new Array();
        
        
    this.token = this._userService.getToken();
    this.regis = new Array();
    this.regis2 = new Array();
    // this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.guarnecida = new Guarnecida('', '', []);

    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
   }

  ngOnInit() {
   this.getTareaUnidad();
   this.getGuarnecida();
   
  }


  getTareaUnidad() {
    this._tareaUnidadService.getHomeworkUnit().subscribe(
      response => {
        if (!response.tareaUnidad) {

        } else {
          this.tareaUnidad = response.tareaUnidad;
          console.log('tareunidad', this.tareaUnidad);
        }
      }
    );
  }


  getGuarnecida() {
    this._guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecida) {

        } else {
          this.guarnecida = response.guarnecida;
          console.log('tareunidad', this.guarnecida);
        }
      }
    );
  }


  

  
  addMarca() {
    
    this.codigo.push(this.code.nativeElement.value);
    this.referencia.push(this.reference.nativeElement.value);
    this.talla.push(this.size.nativeElement.value);
  }
  
  borrarMarca(index) {
    this.marcas.splice(index, 1);
  }
  
  
  
  
  

  removeForm(index) {


     


  }

  // onsubmit() {
  //   console.log(this.marcas);
  // }


  onsubmit() {


    for (let i = 0; i <= this.marcas.length; i++) {

      this._tareaUnidadService.addTareaUnidad(this.token, this.marcas[i]).subscribe(
        response => {
          console.log(this.marcas[i]);



          // form.reset();

        },
        error => {
          const errorMessage = error as any;
        }
      );
    }

     }

	

}
