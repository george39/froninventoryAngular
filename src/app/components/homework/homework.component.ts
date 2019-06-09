import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { HomeworkService } from '../../services/homework.service';
import { UserService } from '../../services/user.service';
import { Homework } from '../../models/homework';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css'],
  providers: [HomeworkService, UserService]
})
export class HomeworkComponent implements OnInit {
	public title: string;
	public homeworks: Homework[]; 
	public url: string;
	public token: string;
  public busqueda;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _homeworkService: HomeworkService,
  	private _userService: UserService

  ) {
  	this.title = 'Listado de tareas';
  	this.url = GLOBAL.url;
  	this.token = this._userService.getToken();
   }

  ngOnInit() {
  	this.getHomeworks();
  }

   getHomeworks(){
    this._homeworkService.getHomeworks().subscribe(
      response => {
        if(!response.homeworks){

        }else{
          this.homeworks = response.homeworks;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
