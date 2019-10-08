import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';

@Component({
  selector: 'app-homework-edit',
  templateUrl: '../add-homework/add-homework.component.html',
  styleUrls: ['./homework-edit.component.css'],
  providers: [UserService, HomeworkService]
})
export class HomeworkEditComponent implements OnInit {
	public title: string;
	public homework: Homework;
	public indentity;
	public token;
	public url: string;
	public status;
	public is_edit;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _homeworkService: HomeworkService
  ) {
  	this.title = 'Modificar tarea';
  	this.homework = new Homework('', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  	this.indentity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
  	this.is_edit = true;

   }

  ngOnInit() {
  	this.getHomework();
  }

  getHomework(){
  	this._route.params.forEach((params: Params) => {
  		let id = params['id'];

  		this._homeworkService.getHomework(id).subscribe(
  			response => {
  				if(!response.homework){
  					this._router.navigate(['/home']);
  				}else{
  					this.homework = response.homework;

  				}
  			},
  			error => {
  				console.log(<any>error);
  				this._router.navigate(['/home']);
  			}
  		);
  	});
  	
  }

  onSubmit(){
  	var id = this.homework._id;
  	this._homeworkService.editHomework(this.token, id, this.homework).subscribe(
  		response => {
  			if(!response.homework){
  				this.status = 'error';
  			}else{
  				this.status = 'success';
  				this.homework = response.homework;
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
