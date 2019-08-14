import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


import { GLOBAL } from '../../../services/global';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { UserService } from '../../../services/user.service';
import { Warehouse1 } from '../../../models/warehouse1';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-warehouse1',
  templateUrl: './add-warehouse1.component.html',
  styleUrls: ['./add-warehouse1.component.css'],
  providers: [UserService, Warehouse1Service]
})
export class AddWarehouse1Component implements OnInit {
	public title: string;
	public warehouse1: Warehouse1[];
	public token;
  public url: string;
  public busqueda;
  public status;
 

  formData: FormGroup;


  constructor(
   private _route: ActivatedRoute,
   private _router: Router,
   private _userService: UserService,
   private _warehouse1Service: Warehouse1Service,

   private fb: FormBuilder
  ) {
   this.title = 'Ingresar registros';
   // this.warehouse1 = new Warehouse1('', '',  []);
   this.token = this._userService.getToken();
   this.url = GLOBAL.url;
   this.status = true;



   this.formData = this.fb.group({
      operator: [],
      name: [],
      registros:  this.fb.array([this.getaddress()]),
    });

   }



  ngOnInit() {
    this.getWarehouse();
  }

  getWarehouse() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          this.warehouse1 = response.warehouse1;
          console.log('tarea almacen', this.warehouse1);
        }
      }
    );
  }


  

  get addressListArray() {
    return this.formData.get('registros') as FormArray;


  }


  addAddress() {
    this.addressListArray.push(this.getaddress());
  }

  getaddress() {

    return this.fb.group({
      reference: [],
      size: [],
    });
  }



  onSubmit(data) {

     
    // for (const i in data.registros) {
      
    //   console.log(data.registros[i].reference);

    //   if (data.registros[i].reference != null) {
    //     this.warehouse1 = this.formData.value;
    //     console.log('muy bien');
    //   }

    // }

    this._warehouse1Service.addWarehouse1(this.token, data).subscribe(
      response => {
       console.log('data', data);
      },
      error  => {
         console.log(error as any);
      }
    );
  }



  removeAddress(index) {
    this.addressListArray.removeAt(index);
  }

}
