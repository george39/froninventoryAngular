import { Component, OnInit } from '@angular/core';
import { Operator } from '../../../models/operator';
import { OperatorService } from '../../../services/operator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styles: []
})
export class OperatorComponent implements OnInit {

  public title: string;
  public operator: Operator;
  public token;
  public status: string;

  constructor(
    private operatorService: OperatorService,
    private rouete: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.title = 'Crear un operario';
    
    this.operator = new Operator('', '', '', '', 'ROLE_USER', '');
    this.token = this.token = this.userService.getToken();
  }

  ngOnInit() {
    
  }


  

  onSubmit(registerForm) {
    this.operatorService.addOperator(this.token, this.operator).subscribe(
      response => {
        if (!response.operator) {
          console.log('error al crear operario');
          this.status = 'error';
        } else {
          this.status = 'success';
          this.operator = response.operator;
          registerForm.reset();
        }
      },
      error => {

        console.log(error as any);
      }
    );
  }

}
