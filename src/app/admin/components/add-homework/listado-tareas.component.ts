import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  
  providers: [HomeworkService, UserService]
})
export class ListadoTareasComponent implements OnInit {
	public title: string;
	public homeworks: Homework[];
	public token;
  public busqueda;


  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _homeworkSerivice: HomeworkService,
  	private _userService: UserService
  ) {
  	this.title = 'Listado de tareas';
  	this.token = this._userService.getToken();
   }

  ngOnInit() {
  	this.getHomeworks();
  }

  getHomeworks() {
  	this._homeworkSerivice.getHomeworks().subscribe(
  		response => {
  			if (!response.homeworks) {

			} else {
				this.homeworks = response.homeworks;
			}
  		},
  		error => {
  			console.log(error as any);
  		}
  	);
  }

  deleteHomework(id) {
    $('#myModal-' + id).modal('hide');
    this._homeworkSerivice.deleteHomework(this.token, id).subscribe(
      response => {
        if(!response.homework){
          console.log('Error en el servidor');
        }
        this.getHomeworks();
      },
      error => {
        alert('Error en el servidor');
      }
    );
  }

}
