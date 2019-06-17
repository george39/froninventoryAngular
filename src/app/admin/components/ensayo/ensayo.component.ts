import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.component.html',
  styleUrls: ['./ensayo.component.css']
})
export class EnsayoComponent implements OnInit {
  @Input() registro: any;
  warehouse1 = new Warehouse1('', '', '', '', '', []);
  
  dataarray = [];
  public zapatillas: Array<Warehouse1>;
  public marcas: any[];
  public mimarca;
  public token;
  public status;
  public miFormulario: FormGroup;



  constructor(
    private _warehouse1Service : Warehouse1Service,
    private _userService: UserService,
    private route: Router
  ) {
     this.warehouse1 = new Warehouse1('', '', '', '', '', []);
     this.token = this._userService.getToken();
     this.marcas = new Array();
     this.mimarca = 4;

     console.log(this.registro);
  }



  ngOnInit() {
    
      // this.dataarray.push(this.warehouse1);
  }


  addMarca() {
    this.warehouse1 = new Warehouse1('', '', '', '', '', []);
    this.marcas.push(this.warehouse1);
    console.log(this.marcas.length);
  }

  borrarMarca(index) {
    this.marcas.splice(index, 1);
  }




  addForm() {
      this.warehouse1 = new Warehouse1('', '', '', '', '', []);
      this.dataarray.push(this.warehouse1);
      console.log('agregar', this.dataarray.length);
  }


  removeForm(index) {


      this.dataarray.splice(index, 1);
      console.log('eliminar', this.dataarray.length);


  }

  // onsubmit() {
  //   console.log(this.marcas);
  // }


  onsubmit() {


    for (let i = 0; i <= this.marcas.length; i++) {

      this._warehouse1Service.addWarehouse1(this.token, this.marcas[i]).subscribe(
        response => {
          console.log(this.marcas[i]);



          // form.reset();

        },
        error => {
          const errorMessage = error as any;

          if (errorMessage != null) {
            this.status = 'error';
          }
        }
      );
    }

     }







  // formData: FormGroup;
  // public warehouse1: Warehouse1;
  // public token;
  // public status;

  // constructor(
  //   private fb: FormBuilder,
  //   private _warehouse1Service: Warehouse1Service,
  //   ) {
  //   this.warehouse1 = new Warehouse1('','','','', 0,'', []);
  //   this.formData = this.fb.group({
  //     operator: [],
  //     name: [],
  //     address: this.fb.array([this.getaddress()])
  //   });
  // }

  // ngOnInit() {
  //   this.formData = this.fb.group({
  //     operator: [''],
  //     name: [''],
  //     registros: this.fb.array([this.fb.group({registro: ['']})])
  //   });
  // }

  // get addressListArray(){
  //   return <FormArray>this.formData.get('registros');
  // }

  // addAddress(){
  //   this.addressListArray.push(this.getaddress());
  // }

  // addRegistro() {
  //   const control = <FormArray>this.formData.controls['registros'];
  //   control.push(this.fb.group({registro: []}));
  // }

  // saveFormData(data) {
  //   const warehouse1 = new Warehouse1();
  //   // this.warehouse1 = new Warehouse1('', '', '', '', 0, '', []);
  //   // this.warehouse1 = data.operator;

  //   this.warehouse1 = data;

  //   this._warehouse1Service.addWarehouse1(this.token, this.warehouse1);
  //   console.log('datos del formulario', this.warehouse1);
  // }

  // getaddress(){

  //   return this.fb.group({
  //     name: [],
  //     reference: [],
  //     size: []
  //   })
  // }

  // removeAddress(index){
  //   this.addressListArray.removeAt(index);
  // }

  // onSubmit(data){
  // 	this._warehouse1Service.addWarehouse1(this.token, this.warehouse1).subscribe(
  // 		response => {
  // 			if(!response.warehouse1){
  // 				this.status = 'error';
  // 			}else{
  //         this.status = 'success';

  //         // this.formData = new FormGroup({
  //         //   warehouse1: new FormControl('')
  //         // });
  //         // this.warehouse1 = formData();
  //         // warehouse1.size =  new FormControl('')


  //         //this.warehouse1 = response.warehouse1.address.size;

  //         //this.formData.get('size').setValue(this.warehouse1.size);
  //         //formData.reset();
  //         //warehouse1 = formData.get('name').setValue('some value');


  // 				//this._router.navigate(['/admin-panel/detalles-tarea/', this.warehouse1._id]);
  // 			}
  //       //form.reset();
  //       console.log(this.warehouse1);
  // 		},
  // 		error => {
  // 			var errorMessage = <any>error;

  // 			if(errorMessage != null){
  // 				this.status = 'error';
  // 			}
  // 		}
  // 	);
  // }



}
