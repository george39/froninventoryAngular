import { Component, OnInit } from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { Router } from '@angular/router';
import { Warehouse2 } from 'src/app/models/warehouse2';
import { Injection1 } from '../../../models/injection1';


@Component({
  selector: 'app-ensayo3',
  templateUrl: './ensayo3.component.html',
  styleUrls: ['./ensayo3.component.css']
})
export class Ensayo3Component implements OnInit {
  public warehouse1: Warehouse1[];
  public token;
  public busqueda;
  public registro: number;


  constructor(
    // tslint:disable-next-line:variable-name
		private _warehouse1Service: Warehouse1Service,
		private router: Router
  ) {
    // this.injection1 = new Injection1('', '', '', '', '');
   }

  ngOnInit() {
    this.getWarehouse();
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

	

}
