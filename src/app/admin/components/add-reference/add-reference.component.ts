import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { ReferenceService } from '../../../services/reference.service';
import { UserService } from '../../../services/user.service';
import { Reference } from '../../../models/reference';

@Component({
  selector: 'app-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['./add-reference.component.css'],
  providers: [UserService, ReferenceService]
})
export class AddReferenceComponent implements OnInit {
	public title: string;
	public reference: Reference;
	public identity;
	public token;
	public url: string;
	public status;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _referenceSerice: ReferenceService,
  ) { 
  	this.title = 'Crear referencia';
  	this.reference = new Reference('', '', '', '', '', '');
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
  }

  ngOnInit() {
  	
  }

  onSubmit(){
  	this._referenceSerice.addReference(this.token, this.reference).subscribe(
  		response => {
  			if(!response.reference){
  				this.status = 'error';
  			}else {
  				this.status = 'success';
  				this.reference = response.reference;

  				this._router.navigate(['/admin-panel/listado-tareas']);
  			}
  		},
  		error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				this.status = 'error';
  			}
  		}
  	);
  }

}
