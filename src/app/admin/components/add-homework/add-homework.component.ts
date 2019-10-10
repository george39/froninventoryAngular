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
import { parse } from 'path';



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
	public sizes: any;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
  	private _homeworkService: HomeworkService,
	private _tareaUnidadService: TareaUnidadService,
	private troqueladoService: TroqueladoService
  ) {
	this.sizes = '';
  	this.title = 'Crear tarea';
	this.homework = new Homework('', '', '', '', this.sizes, this.sizes, this.sizes, this.sizes, this.sizes, this.sizes,
	  this.sizes, this.sizes, this.sizes, this.sizes, this.sizes, this.sizes, this.sizes, this.sizes, this.sizes);
  	this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
  	this.identityd = this._userService.getIdentity();
  	this.token = this._userService.getToken();
	this.url = GLOBAL.url;
	  
   }

  ngOnInit() {
	  
  }


//   treintaYocho() {
//     for (let i = 1; i <= this.homework.tresocho; i++) {
//       this.tareaUnidad.operator = this.homework.operator;
//       this.tareaUnidad.name = this.homework.name;
//       this.tareaUnidad.operator = this.homework.operator;
//       this.tareaUnidad.reference = this.homework.reference;
//       this.tareaUnidad.treintayocho = this.homework.tresocho;
//       this.tareaUnidad.code = this.homework._id + [i];

//       this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
//         response => {
//           if (!response.tareaUnidad) {
//             // console.log('no entra', this.marcas);
//             // this.tareaUnidad = response.marcas;
//           } else {

//             this.tareaUnidad = response.tareaUnidad;
//             // this._router.navigate(['/admin-panel/listado-tareas']);
//           }
//         },
//         error => {
//           const errorMessage = error as any;
//         }
//       );
//     }
//   }
 
  

  onSubmit() {
	  
	  this._homeworkService.addHomework(this.token, this.homework).subscribe(
		  response => {
			  if(!response.homework) {
				  this.status = 'error';
			} else {
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
				console.log('cantidad', cantidad);
				for (let i = 1; i <= cantidad; i++) {
										
					this.tareaUnidad.name = this.homework.name;
					this.tareaUnidad.operator = this.homework.operator;
					this.tareaUnidad.reference = this.homework.reference;
					this.tareaUnidad.size = tallas[i - 1];
					this.tareaUnidad.code = this.homework._id + [i];
					
					
					
					
					
					this._tareaUnidadService.addTareaUnidad(this.token,  this.tareaUnidad).subscribe(
						response => {
							
							
							this.tareaUnidad = response.TareaUnidad;
							

						},
						error => {
							console.log(error as any);
						}
					);
					
				}
				// for (let i = 1; i <= cantidad; i++) {
					// this.tareaUnidad.operator = this.homework.operator;
					// this.tareaUnidad.name = this.homework.name;
					// this.tareaUnidad.operator = this.homework.operator;
					// this.tareaUnidad.reference = this.homework.reference;
					// this.tareaUnidad.code = this.homework._id + [i];
					// this.treintaYocho();
					
					
						
					// if (this.homework.tresocho) {
					// 	// var s  = JSON.parse(this.homework.tresnueve);
					// 	this.tareaUnidad.size = '38';
					// }
						

					// if (this.homework.tresnueve !== 0) {
					// 	// var s  = JSON.parse(this.homework.tresnueve);
					// 	this.tareaUnidad.size = '39';
					// }

					// if (this.homework.cuarenta !== 0) {
					// 	// var s  = JSON.parse(this.homework.tresnueve);
					// 	this.tareaUnidad.treintaynueve = this.homework.tresnueve / 2;
					// }
				// 	this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
				// 		response => {
				// 			if (!response.tareaUnidad) {
				// 			// console.log('no entra', this.marcas);
				// 			// this.tareaUnidad = response.marcas;
				// 			} else {
				
				// 			this.tareaUnidad = response.tareaUnidad;
				// 			// this._router.navigate(['/admin-panel/listado-tareas']);
				// 			}
				// 		},
				// 		error => {
				// 			const errorMessage = error as any;
				// 		}
				// 		);
				// }

				// if (this.homework.tresnueve) {
				// 	this.treintaYnueve();
				// }

				// Guardar registros por unidad
				// var cantidad = this.homework.tresocho + this.homework.tresnueve;
				// for ( let i = 1; i <= cantidad; i++) {
				// 	this.treintaYocho();
				// 	// this.tareaUnidad.operator = this.homework.operator;
				// 	// this.tareaUnidad.name = this.homework.name;
				// 	// this.tareaUnidad.reference = this.homework.reference;
				// 	// this.tareaUnidad.size = this.homework.size;
				// 	// this.tareaUnidad.code = this.homework._id + [i];
						
				
				// 	// this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
				// 	//     response => {
				// 	// 	  if (!response.tareaUnidad) {
							
							
				// 	// 		  // this.tareaUnidad = response.tareaUnidad;
				// 	// 	  } else {
				
							
				// 	// 	  }
				// 	// 	},
				// 	// 	error => {
				// 	// 	  const errorMessage = error as any;
				// 	// 	}
				// 	//   );
				// 	}


				
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

 


//   guardar() {
	  

// 	for ( let i = 1; i <= this.homework.quantity; i++) {
// 	this.tareaUnidad.operator = this.homework.operator;
// 	this.tareaUnidad.name = this.homework.name;
// 	this.tareaUnidad.reference = this.homework.reference;
// 	this.tareaUnidad.size = this.homework.size;
// 	this.tareaUnidad.code = this.homework._id + [i];
		

//       this._tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
//         response => {
//           if (!response.tareaUnidad) {
            
            
// 			  // this.tareaUnidad = response.tareaUnidad;
//           } else {

            
//           }
//         },
//         error => {
//           const errorMessage = error as any;
//         }
//       );
//     }
//   }

  

}
