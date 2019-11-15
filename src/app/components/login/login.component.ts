import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public title: string;
  public user: User;
  public token;
  public identity;
  public status;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
    private _userService: UserService
  ) {
  		this.title = 'Iniciar sesión';
    this.user = new User('','','','','','ROLE_USER','');
   }

  ngOnInit() {
    console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
  }

  onSubmit(){
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        if(!this.identity || !this.identity._id){
          alert('El usuario no se ha logueado correctamente')
        }else{
          this.identity.password = '';
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir el token
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;

              if(this.token <= 0){
                alert('El token no se ha generado');
              }else{
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this._router.navigate(['/admin-panel']);
              }
            },
            error => {
              console.log(<any>error);
            }
          );

          
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
