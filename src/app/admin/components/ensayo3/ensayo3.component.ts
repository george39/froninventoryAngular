import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse2 } from 'src/app/models/warehouse2';
import { Injection1 } from '../../../models/injection1';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'app-ensayo3',
  templateUrl: './ensayo3.component.html',
  styleUrls: ['./ensayo3.component.css']
})
export class Ensayo3Component implements OnInit {
  

  @ViewChild('fondovalor') fondovalor: ElementRef;
  @ViewChild('size') size: ElementRef;

  public busqueda;

  // warehouse1 = new Warehouse1('', '', '', '', '', []);
  warehouse1: Warehouse1;
  warehouse: Warehouse1;
  public token;
  
  public registro: number;
  public regis: string[];
  public regis2: string[];
  public marcas: any[];
  dataarray = [];


  constructor(
    
		private _warehouse1Service: Warehouse1Service,		
    private router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.marcas = new Array();
    this.warehouse1 = new Warehouse1('', '', []);    
        
    this.token = this._userService.getToken();
    this.regis = new Array();
    this.regis2 = new Array();
   }

  ngOnInit() {
   this.getWarehouse();
   this.getWare();
   
   
   
  }

  

  

  buscarWarehouse(termino: string) {
    this._warehouse1Service.buscarAlmacen(termino)
        .subscribe(almacen => this.warehouse = almacen);
  }

  getWarehouse() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          this.warehouse1 = response.warehouse1;
        }
      }
    );
  }

  getWare() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse) {

        } else {
          this.warehouse = response.warehouse;
          
        }
      }
    );
  }

  
  addMarca() {
    this.warehouse1 = new Warehouse1('', '', []);
    this.marcas.push(this.warehouse1);
    let re: any = document.getElementsByName('operator');
    this.regis.push(re);
    // this.regis.push(this.fondovalor.nativeElement.value);
    // this.regis2.push(this.size.nativeElement.value);
    console.log(re);
  }
  
  borrarMarca(index) {
    this.marcas.splice(index, 1);
  }
  
  
  
  
  addForm() {
    this.warehouse1 = new Warehouse1('', '', []);
    this.dataarray.push(this.warehouse1);
    console.log('agregar', this.dataarray.length);
  }


  removeForm(index) {


      this.dataarray.splice(index, 1);
      console.log('eliminar', this.dataarray.length);


  }

  // onsubmit() {
  //   console.log(this.marcas);
  // }


  onsubmit() {


    for (let i = 0; i <= this.marcas.length; i++) {

      this._warehouse1Service.addWarehouse1(this.token, this.marcas[i]).subscribe(
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
