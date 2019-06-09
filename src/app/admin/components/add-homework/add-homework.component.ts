import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css'],
  providers: [UserService, HomeworkService]
})
export class AddHomeworkComponent implements OnInit {
	public title: string;
	public homework: Homework;
	public identityd;
	public token;
	public url: string;
	public status;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _homeworkService: HomeworkService
  ) {
  	this.title = 'Crear tarea';
  	this.homework = new Homework('','','','', 0,'');
  	this.identityd = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
   }

  ngOnInit() {
  }

  onSubmit(){
  	this._homeworkService.addHomework(this.token, this.homework).subscribe(
  		response => {
  			if(!response.homework){
  				this.status = 'error';
  			}else{
  				this.status = 'success';
  				this.homework = response.homework;
  				this._router.navigate(['/admin-panel/detalles-tarea/',this.homework._id]);
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
