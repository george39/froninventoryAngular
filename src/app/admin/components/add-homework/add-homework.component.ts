import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { Troquelado } from '../../../models/troquelado';
import { TroqueladoService } from '../../../services/troquelado.service';



@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css'],
  providers: [UserService, HomeworkService, TareaUnidadService, TroqueladoService]
})
export class AddHomeworkComponent implements OnInit {

	

	public title: string;
	public homework: Homework;
	public tareaUnidad: TareaUnidad;
	public troquelado: Troquelado;
	public identityd;
	public token;
	public url: string;
	public status;
	public r;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _homeworkService: HomeworkService,
	private _tareaUnidadService: TareaUnidadService,
	private troqueladoService: TroqueladoService
  ) {
  	this.title = 'Crear tarea';
  	this.homework = new Homework('', '', '', '', 0, '');
  	this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
  	this.identityd = this._userService.getIdentity();
  	this.token = this._userService.getToken();
	  this.url = GLOBAL.url;
	  
   }

  ngOnInit() {
	  
  }

  onSubmit() {

	this._homeworkService.addHomework(this.token, this.homework).subscribe(
		response => {
			if(!response.homework){
				this.status = 'error';
			}else{
				this.status = 'success';
				this.homework = response.homework;

				// Guardar registros por unidad
				for ( let i = 1; i <= this.homework.quantity; i++) {
					this.tareaUnidad.operator = this.homework.operator;
					this.tareaUnidad.name = this.homework.name;
					this.tareaUnidad.reference = this.homework.reference;
					this.tareaUnidad.size = this.homework.size;
					this.tareaUnidad.code = this.homework._id + [i];
						
				
					  this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
						response => {
						  if (!response.tareaUnidad) {
							
							
							  // this.tareaUnidad = response.tareaUnidad;
						  } else {
				
							
						  }
						},
						error => {
						  const errorMessage = error as any;
						}
					  );
					}


				
				this._router.navigate(['/admin-panel/detalles-tarea/', this.homework._id]);
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

 


  guardar() {
	  

	for ( let i = 1; i <= this.homework.quantity; i++) {
	this.tareaUnidad.operator = this.homework.operator;
	this.tareaUnidad.name = this.homework.name;
	this.tareaUnidad.reference = this.homework.reference;
	this.tareaUnidad.size = this.homework.size;
	this.tareaUnidad.code = this.homework._id + [i];
		

      this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
        response => {
          if (!response.tareaUnidad) {
            
            
			  // this.tareaUnidad = response.tareaUnidad;
          } else {

            
          }
        },
        error => {
          const errorMessage = error as any;
        }
      );
    }
  }

  

}
