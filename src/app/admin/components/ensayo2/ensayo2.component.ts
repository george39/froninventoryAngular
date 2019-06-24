import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';

// tslint:disable-next-line:label-position



@Component({
  selector: 'app-ensayo2',
  templateUrl: './ensayo2.component.html',
  styleUrls: ['./ensayo2.component.css'],
  providers: [UserService, Warehouse1Service]
})
export class Ensayo2Component implements OnInit, OnChanges {
  @ViewChild('fondovalor') fondovalor: ElementRef;
  @ViewChild('size') size: ElementRef;
  public warehouse1: Warehouse1;
  public warehouse: Warehouse1[];
  public token;
  public busqueda;
  public nom: string;
  public regis: string[];
  public regis2: string[];
  public a: string[];

  formData: FormGroup;

  constructor(
    private _route: ActivatedRoute,
  	private _router: Router,
    private _warehouse1Service: Warehouse1Service,
    private _userService: UserService,
    
    private fb: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.warehouse1 = new Warehouse1('', '', '', '', '', []);
    this.regis = new Array();
    this.regis2 = new Array();
    this.a = new Array();
     // document.getElementsByName('reg').value;

    this.formData = this.fb.group({
      operator: [''],
      name: [''],
      registros: this.fb.array([this.getaddress()]),

    });
  }

  ngOnChanges() {
    // this.regis.push(this.fondovalor.nativeElement.value);
    // this.addReg();
  }

  ngOnInit() {
     this.getWarehouse();
    
    //this.addReg();
    
  }

  get addressListArray() {
    return this.formData.get('registros') as FormArray;


  }


  addAddress() {    
    this.addressListArray.push(this.getaddress());
    const control = this.formData.controls.registros;
    const control2 = this.addressListArray.controls;
    console.log('addadres', control2);
    
  }

  getaddress() {

    return this.fb.group({
      reference: [''],
      size: [''],
    });
  }


  getWarehouse() {
    this._warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          this.warehouse1 = response.warehouse1;
        }
      }
    );
  }

  deleteRegis() {
    this.regis.splice(0);
  }
  
  
  addReg() {
    this.regis.push(this.fondovalor.nativeElement.value);
    this.regis2.push(this.size.nativeElement.value);
    
    // this.regis.push(this.fondovalor.nativeElement.value);
    
    // for (let i = 0; i <= this.regis.length; i++) {
    //   if ( this.regis.length > 2) {
    //      // this.regis.splice(i);
    //     // this.regis.push(this.fondovalor.nativeElement.value);
    //     // this.regis.push(this.size.nativeElement.value);
    //   }
    //   console.log(this.regis.length);
   // }
    }



  onSubmit(data) {
      console.log(data);
      // const control = this.formData.controls.registros;

      this._warehouse1Service.addWarehouse1(this.token, data).subscribe(
          response => {
            console.log(data.registros[0].reference);
          },
          error  => {
              console.log(error as any);
          }
        );
      




    // console.log(data);
    // tslint:disable-next-line:forin
    // for (let i in data) {
    //   console.log('mierda', data);
    //   // tslint:disable-next-line:forin
    //   for ( let s in data[i]){
    //     console.log('culo', data[i][s]);
    //     if ( data[i][s].reference === null ) {
          
    //       console.log('sin el null', data);
    //     } else {
    //     }
    //   }
      
    // }


    // for (const i in data.registros) {

    //   console.log(data.registros[i].reference);

    //   if (data.registros[i].reference != null) {
    //     this.warehouse1 = this.formData.value;
    //     console.log('muy bien');
    //   }

    // }

  //   this._warehouse1Service.addWarehouse1(this.token, data).subscribe(
  //     response => {
  //      console.log(data);
  //     },
  //     error  => {
  //        console.log(error as any);
  //     }
  //   );
  // }
  }



  removeAddress(index: number) {
    const control = this.addressListArray.controls;
    control.splice(index, 1);
    this.regis.splice(index, 1);
    this.regis2.splice(index, 1);

  }




//   onSubmit() {
//     this.warehouse1 = this.miFormulario.value;
//     this._warehouse1Service.addWarehouse1(this.token, this.warehouse1).subscribe(
//       response => {


//       },

//       error => {
//   			console.log (error as any);
//   			console.log (this.warehouse1);


//       }
//     );
//       }

// //   onSubmit(formValue: any) {
// //     const warehouse1 = new Warehouse1('', '', '', '', '', ['']);
// //     warehouse1.operator = formValue.operator;
// //     warehouse1.name = formValue.name;
// //     warehouse1.registros = formValue.registros;
// //     console.log(warehouse1);

// //     this._warehouse1Service.addWarehouse1(this.token, warehouse1);
// // }

//   get getRegistros() {
//     return this.miFormulario.get('registros') as FormArray;
//   }

//   addRegistro() {

//     const control = this.miFormulario.controls.registros as FormArray;
//     control.push(this.fb.group({registro: []}));




//   }

//   removeRegistro(index: number) {

//     const control = this.miFormulario.controls.registros as FormArray;
//     control.removeAt(index);
//   }

}
