import { Component, OnInit, Input } from '@angular/core';
import { Homework } from '../../../models/homework';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';



@Component({
  selector: 'app-add-tarea-unidad',
  templateUrl: './add-tarea-unidad.component.html',
  styleUrls: ['./add-tarea-unidad.component.css']
})
export class AddTareaUnidadComponent implements OnInit {

  @Input() unidades: any;

  public homework: Homework;
  public tareaUnidad: TareaUnidad;
  public userService: UserService;
  public token;

  constructor(
    private userServie: UserService,
    private tareaUnidadService: TareaUnidadService
  ) 
  { 
    this.homework = new Homework('', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '', '');
    this.token = this.userService.token();
  }

  ngOnInit() {
  }



  onSubmit() {
    
      // this.tareaUnidad.operator = this.homework.operator;
      // this.tareaUnidad.name = this.homework.name;
      // this.tareaUnidad.reference = this.homework.reference;
      // this.tareaUnidad.size = this.homework.size;
      // this.tareaUnidad.code = this.homework._id + [i];


      // this.tareaUnidadService.addTareaUnidad(this.token, this.tareaUnidad ).subscribe(
      //   response => {
      //     if (!response.tareaUnidad) {
      //       // console.log('no entra', this.marcas);
      //       // this.tareaUnidad = response.marcas;
      //     } else {

      //       this.tareaUnidad = response.tareaUnidad;
      //       // this._router.navigate(['/admin-panel/listado-tareas']);
      //     }
      //   },
      //   error => {
      //     const errorMessage = error as any;
      //   }
      // );
    
  }

}
