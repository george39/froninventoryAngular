import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { UserService } from '../../../services/user.service';
import { Warehouse1 } from '../../../models/warehouse1';

@Component({
  selector: 'app-list-warehouse1',
  templateUrl: './list-warehouse1.component.html',
  styleUrls: ['./list-warehouse1.component.css'],
  providers: [Warehouse1Service, UserService]
})
export class ListWarehouse1Component implements OnInit {
	public title: string;
	public warehouse1: Warehouse1[];
	public token;
	public busqueda;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _warehouse1Service: Warehouse1Service
  ) {
  	this.title = 'Registrar productos';
  	this.token = this._userService.getToken();
   }

  ngOnInit() {
  	this.getWarehouses1();
  }

  getWarehouses1(){
  	this._warehouse1Service.getWarehouses1().subscribe(
  		response => {
  			if(!response.warehouse1){

			}else{
				this.warehouse1 = response.warehouse1;	
			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
