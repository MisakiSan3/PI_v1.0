import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserModel, UserModel } from 'src/app/models/user-model.entity';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^\d+$/;

  passwordVerify: string = '';
  user: CreateUserModel = {
    username: '',
    email: '',
    password: ''
  };

  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  email = new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]);
  telf = new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]);

  showValidationError: boolean = false;
  validationErrorMessage: string = '';

  constructor(private router: Router,private tokenService: TokenService,private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  saveUser(){
    try {
      this.user.email = "misakisan380@gmail.com";
      this.user.password = "12345678"
      this.authService.saveUser(this.user.email,this.user.password)
      
    } catch (error) { 
      console.log(error);
      
    }
  }

  createUser() {
    try {
      if (
        this.user.email === '' ||
        this.user.password === '' ||
        this.user.username === ''
      ) {
        throw new Error('Por favor, complete todos los campos');
      }
      

      if (this.user.password === this.passwordVerify) {
        if (this.user.email.match(this.emailRegex)) {
          this.router.navigateByUrl('/login');
          this.authService.register(this.user).subscribe(
            (response) => {
              console.log(response);
              this.tokenService.setToken(response);
              this.snackBar.open('Te has registrado con éxito', 'Cerrar', {
                duration: 3000
              });
            },
            (error) => {
              console.log(error);
              this.showValidationError = true;
              this.validationErrorMessage = 'Hubo un error al registrar el usuario';
              this.snackBar.open('', '', {
              });
            }
          );
        } else {
          throw new Error('El correo electrónico no es válido');
        }
      } else {
        throw new Error('Las contraseñas no coinciden');
      }
    } catch (error:any) {
      console.log(error);
      this.showValidationError = true;
      this.validationErrorMessage = error.message;
      this.snackBar.open(error.message, 'Cerrar', {
        duration: 3000
      }); 
    }
  }
}
