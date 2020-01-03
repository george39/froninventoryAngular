import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { HomeworkService } from '../../../services/homework.service';
import { UserService } from '../../../services/user.service';
import { Homework } from '../../../models/homework';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';


@Component({
  selector: 'app-homework-edit',
  templateUrl: '../add-homework/add-homework.component.html',
  styleUrls: ['./homework-edit.component.css'],
  providers: [UserService, HomeworkService]
})
export class HomeworkEditComponent implements OnInit {
	public title: string;
	public homework: Homework;
	public tareaUnidad: TareaUnidad;
	public indentity;
	public token;
	public url: string;
	public status;
	public is_edit;
	public idTarea = [];

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
	  private _homeworkService: HomeworkService,
	  private tareaUnidadService: TareaUnidadService
	
  ) {
  	this.title = 'Modificar tarea';
	  this.homework = new Homework('', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	  this.tareaUnidad = new TareaUnidad('', '', '', '', '', '', '');
  	this.indentity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
  	this.is_edit = true;

   }

  ngOnInit() {
	  this.getHomework();
	  this.getHomeworkUnit();
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
  				console.log(error as any);
  				this._router.navigate(['/home']);
  			}
  		);
  	});
  	
  }

  getHomeworkUnit() {
	this._route.params.forEach((params: Params) => {
		let id = params['id'];

		this.tareaUnidadService.getHomeworksUnit().subscribe(
			response => {
				if(!response.tareaUnidad){
					this._router.navigate(['/home']);
				}else{
					this.tareaUnidad = response.tareaUnidad;

				}
			},
			error => {
				console.log(error as any);
				this._router.navigate(['/home']);
			}
		);
	});
	
  }

  deleteTareaUnidad() {
	var id_tareau = this.homework._id;
	id_tareau = JSON.stringify(id_tareau);
	this.tareaUnidadService.getHomeworksUnit().subscribe(
		response => {
			response.tareaUnidad.forEach((item) => {
			//  item.tarea_id  = JSON.parse(item.tarea_id);
			 console.log('item.id', item.tarea_id);
				if ( item.tarea_id === id_tareau  ) {
					this.idTarea.push(item._id);
					this.tareaUnidadService.deleteTroquelado(this.token, item._id).subscribe(
						response => {


						  }
					  );
				}
			});
		}
	);

  }

  


// ================================================
// ACTUALIZA LA TAREA Y ACTUALIZA LAS UNIDADES EN TROQUELADO
// ================================================
  onSubmit(){
	  
	  this.deleteTareaUnidad();
  	var id = this.homework._id;
  	this._homeworkService.editHomework(this.token, id, this.homework).subscribe(
  		response => {
  			if(!response.homework){
  				this.status = 'error';
  			}else{
  				this.status = 'success';
				  this.homework = response.homework;
				  this.tareaUnidad.size = '';
				  
				
				
				  var treintaytres = 0;
				  var treintaycuatro = 0;
				  var treintaycinco = 0;
				  var treintayseis = 0;
				  var treintaysiete = 0;
				  var treintayocho = 0;
				  var treintaynueve = 0;
				  var cuarenta = 0;
				  var cuarentayuno = 0;
				  var cuarentaydos = 0;
				  var cuarentaytres = 0;
				  var cuarentaycuatro = 0;
				  var cuarentaycinco = 0;
				  var cuarentayseis = 0;
				  var cuarentaysiete = 0;
				
				
				  var tallas = [];

				  while (treintaytres < this.homework.treintaytres) {
					treintaytres ++;
					this.tareaUnidad.size  = '33';
					tallas.push(this.tareaUnidad.size);
				}

				  while (treintaycuatro < this.homework.treintaycuatro) {
					treintaycuatro ++;
					this.tareaUnidad.size  = '34';
					tallas.push(this.tareaUnidad.size);
				}

				  while (treintaycinco < this.homework.treintaycinco) {
					treintaycinco ++;
					this.tareaUnidad.size  = '35';
					tallas.push(this.tareaUnidad.size);
				}

				  while (treintayseis < this.homework.treintayseis) {
						treintayseis ++;
						this.tareaUnidad.size  = '36';
						tallas.push(this.tareaUnidad.size);
					}

				  while (treintaysiete < this.homework.treintaysiete) {
						treintaysiete ++;
						this.tareaUnidad.size  = '37';
						tallas.push(this.tareaUnidad.size);
				}

				  while (treintayocho < this.homework.treintayocho) {
					treintayocho ++;
					this.tareaUnidad.size  = '38';
					tallas.push(this.tareaUnidad.size);
				}

				  while (treintaynueve < this.homework.treintaynueve) {
					treintaynueve ++;
					this.tareaUnidad.size  = '39';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarenta < this.homework.cuarenta) {
					cuarenta ++;
					this.tareaUnidad.size  = '40';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentayuno < this.homework.cuarentayuno) {
					cuarentayuno ++;
					this.tareaUnidad.size  = '41';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentaydos < this.homework.cuarentaydos) {
					cuarentaydos ++;
					this.tareaUnidad.size  = '42';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentaytres < this.homework.cuarentaytres) {
					cuarentaytres ++;
					this.tareaUnidad.size  = '43';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentaycuatro < this.homework.cuarentaycuatro) {
					cuarentaycuatro ++;
					this.tareaUnidad.size  = '44';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentaycinco < this.homework.cuarentaycinco) {
					cuarentaycinco ++;
					this.tareaUnidad.size  = '45';
					tallas.push(this.tareaUnidad.size);
				}

				  while (cuarentayseis < this.homework.cuarentayseis) {
					cuarentayseis ++;
					this.tareaUnidad.size  = '46';
					tallas.push(this.tareaUnidad.size);
				}
				
				  while (cuarentaysiete < this.homework.cuarentaysiete) {
					cuarentaysiete ++;
					this.tareaUnidad.size  = '47';
					tallas.push(this.tareaUnidad.size);
				}
				
				
				  var cantidad = this.homework.treintaytres + this.homework.treintaycuatro
				+ this.homework.treintaycinco + this.homework.treintayseis + this.homework.treintaysiete
				+ this.homework.treintayocho +  this.homework.treintaynueve +  this.homework.cuarenta
				+ this.homework.cuarentayuno + this.homework.cuarentaydos + this.homework.cuarentaytres
				+ this.homework.cuarentaycuatro + this.homework.cuarentaycinco + this.homework.cuarentayseis
				+ this.homework.cuarentaysiete;
				// this.tareaUnidad.size = '38';
				var troquelado = [];
				  console.log('cantidad', cantidad);
				  for (let i = 1; i <= cantidad; i++) {
					  
					  

					this.tareaUnidad = response.homework;
					this.tareaUnidad.name = this.homework.name;
					this.tareaUnidad.tarea_id = this.homework._id;
					this.tareaUnidad.operator = this.homework.operator;
					this.tareaUnidad.reference = this.homework.reference;
					this.tareaUnidad.size = tallas[i - 1];
					this.tareaUnidad.code = this.homework._id + [i];
					  
					 
					  
					  
					  
					this.tareaUnidadService.addTareaUnidad(this.token,  this.tareaUnidad).subscribe(
						  response => {
							

						},
						error => {
							console.log(error as any);
						}
					);
  }
					  
  				this._router.navigate(['/admin-panel/listado-tareas']);
  			}
  		},
  		error => {
  			var errorMessage = <any> error;
  			if(errorMessage != null){
  				this.status = 'error';
  			}
  		}
  	);
  }

}
