
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Guarnecida } from '../../../models/guarnecida';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { GuarnecidaService } from '../../../services/guarnecida.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// tslint:disable-next-line:label-position



@Component({
  selector: 'app-add-guarnecida',
  templateUrl: './add-guarnecida.component.html',
  styles: []
})
export class AddGuarnecidaComponent implements OnInit {
  @ViewChild('code') code: ElementRef;
  @ViewChild('reference') reference: ElementRef;
  @ViewChild('size') size: ElementRef;



  public guarnecida: Guarnecida;
  public tareaUnidad: TareaUnidad; 
  public token;
  public busqueda;
  public codigo: string[];
  public referencia: string[];
  public talla: string[];
  public status;



  formData: FormGroup;

  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private tareaUnidadService: TareaUnidadService,
    private guarnecidaService: GuarnecidaService,
    private _userService: UserService,
    private http: HttpClient,

    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.guarnecida = new Guarnecida('', '', []);
    this.tareaUnidad = new TareaUnidad('', '', '', '', '', '');
    this.codigo = new Array();
    this.referencia = new Array();
    this.talla = new Array();
    this.status = true;


    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }


  ngOnInit() {
     this.HomeworkUnit();
     
  }

  get addressListArray() {

      return this.formData.get('registros') as FormArray;
  }


  addAddress() {

    var code = document.getElementById('code');

    if ( code === null) {
      this.status = false;
    }
    
    
    if ( this.code.nativeElement) {
      
      this.addressListArray.push(this.getaddress());
      const control = this.formData.controls.registros;
      const control2 = this.addressListArray.controls;
      this.codigo.push(this.code.nativeElement.value);
      this.referencia.push(this.reference.nativeElement.value);
      this.talla.push(this.size.nativeElement.value);
      this.busqueda = '';
      this.status = true;
      
    }
  }

  getaddress() {

    return this.fb.group({
      code: [''],
      reference: [''],
      size: [''],
    });
  }


  HomeworkUnit() {
    this.tareaUnidadService.getHomeworkUnit().subscribe(
      response => {
        if (!response.tareaUnidad) {
            this.status = false;
            console.log('status', this.status);
        } else {
          this.tareaUnidad = response.tareaUnidad;
          console.log('tareaUnidad', this.tareaUnidad);
        }
      }
    );
  }


  onSubmit(data) {

        this.guarnecidaService.addGuarnecida(this.token, this.formData.value).subscribe(
                response => {
                  console.log('registros', data);
                },
                error  => {
                    console.log(error as any);
                }
              );
    }

  removeAddress(index) {
    const control = this.addressListArray.controls;
    control.splice(index, 1);
    this.codigo.splice(index, 1);
    this.referencia.splice(index, 1);
    this.talla.splice(index, 1);


  }


}
