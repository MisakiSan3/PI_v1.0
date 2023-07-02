import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserModel, UserModel } from 'src/app/models/user-model.entity';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^\d+$/; // Expresión regular para permitir solo números
  constructor(private router: Router,private userService:UserService, private snackBar:MatSnackBar) {}
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

  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  email = new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]);
  telf = new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]);

  navigateToLogin() {
    this.router.navigateByUrl("/login");
  }

  createUser() {
    try {
      if (this.user.contrasenia === this.passwordVerify) {
        if (this.user.email.match(this.emailRegex)) {
          this.userService.store(this.user).subscribe(
            response => {
              console.log(response);
              this.router.navigateByUrl('/pages');

              this.snackBar.open('Te has registrado con éxito', 'Cerrar', {
                duration: 3000
              });
            }
          );
        } else {
          this.snackBar.open('El correo electrónico no es válido', 'Cerrar', {
            duration: 3000
          });
        }
      } else {
        this.snackBar.open('Las contraseñas no son iguales', 'Cerrar', {
          duration: 3000
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

}
