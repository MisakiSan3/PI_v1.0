import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserModel, UserModel } from 'src/app/models/user-model.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router,private userService:UserService) {}
  ngOnInit(): void {
  }
  passwordVerify: string = '';
  user: CreateUserModel ={
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    contrasenia: '',
    nickname: ''
  }
  navigateToLogin() {
    this.router.navigateByUrl("/login");
  }

   createUser(){
    console.log(this.user);
    try {
      if (this.user.contrasenia === this.passwordVerify) {
         this.userService.store(this.user).subscribe(
          response =>{
            console.log(response);
          }
        )
      } else {
        throw new Error("Las contraseñas no son iguales");

      }
    } catch (error) {
      console.log(error)
    }
   
  }
}
