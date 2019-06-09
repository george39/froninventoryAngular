import { Component, OnInit } from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-ensayo2',
  templateUrl: './ensayo2.component.html',
  styleUrls: ['./ensayo2.component.css']
})
export class Ensayo2Component implements OnInit {
  public warehouse1 = new Warehouse1('', '', '', '', '', []);
  public token;
  public miFormulario: FormGroup;
  warehouse1s: any[] = [];

  constructor(
    private _route: ActivatedRoute,
  	 private _router: Router,
    private _warehouse1Service: Warehouse1Service,
    private fb: FormBuilder
  ) {
     this.warehouse1 = new Warehouse1('', '', '', '', '', []);
  }

  ngOnInit() {
    this.miFormulario = this.fb.group({
      operator: [''],
      name: [''],
      registros: this.fb.array([this.fb.group({registro: ['']})]),

    });
  }

  onSubmit() {
    this.warehouse1 = this.miFormulario.value;
    this._warehouse1Service.addWarehouse1(this.token, this.warehouse1).subscribe(
      response => {


      },
      
      error => {
  			console.log (error as any);
  			console.log (this.warehouse1);


      }
    );
      }

//   onSubmit(formValue: any) {
//     const warehouse1 = new Warehouse1('', '', '', '', '', ['']);
//     warehouse1.operator = formValue.operator;
//     warehouse1.name = formValue.name;
//     warehouse1.registros = formValue.registros;
//     console.log(warehouse1);

//     this._warehouse1Service.addWarehouse1(this.token, warehouse1);
// }

  get getRegistros() {
    return this.miFormulario.get('registros') as FormArray;
  }

  addRegistro() {

    const control = this.miFormulario.controls.registros as FormArray;
    control.push(this.fb.group({registro: []}));




  }

  removeRegistro(index: number) {

    const control = this.miFormulario.controls.registros as FormArray;
    control.removeAt(index);
  }

}
