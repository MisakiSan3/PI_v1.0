import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserAuthModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  formSubmitted = false; // Track if the form has been submitted
  formInvalid = false; // Track if the form is invalid

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  user: UserAuthModel = {
    email: '',
    contrasenia: ''
  };

  ngOnInit(): void {}

  onLogins(): void {
    this.formSubmitted = true; // lo transforma en true si es valido el form

    if (this.email.invalid && this.password.invalid) {
      // valida si el formulario es invalido
      this.formInvalid = true; // Setea en formInvalid en true si el form es invalido
      return;
    }

    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (emailValue && passwordValue) {
      this.user.email = emailValue;
      this.user.contrasenia = passwordValue;

      this.authService.login(this.user).subscribe(
        (data) => {
          if (!data.accessToken) {
            throw new Error('No existe el usuario');
          } else {
            this.tokenService.setToken(data.accessToken);
            const isAuthenticated = this.tokenService.getIsAuthenticated();
            this.router.navigate(['/pages']);
            console.log(isAuthenticated);
          }
          console.log(data.accessToken);
          this.tokenService.setToken(data.accessToken);
        },
        (error) => {
          this.snackBar.open('Error en el inicio de sesión', 'Cerrar', {
            duration: 5000
          });
        }
      );
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
