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
  username= new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  formSubmitted = false; // Track if the form has been submitted
  formInvalid = false; // Track if the form is invalid

  user: UserAuthModel = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onLogins(): void {
    this.formSubmitted = true; // Set formSubmitted to true when the form is submitted

    if (this.username.invalid || this.password.invalid) {
      // Check if the form is invalid
      this.formInvalid = true; // Set formInvalid to true if the form is invalid
      return;
    }

    const usernameValue = this.username.value;
    const passwordValue = this.password.value;
    console.log()

    if (usernameValue && passwordValue) {
      this.user.username = usernameValue;
      this.user.password = passwordValue;

      this.authService.login(this.user).subscribe(
        (data) => {
          console.log(data);
          if (!data) {
            throw new Error('No existe el usuario');
          } else {
            this.tokenService.setToken(data.token);
            const isAuthenticated = this.tokenService.getIsAuthenticated();
            this.router.navigate(['/pages']);
            console.log(isAuthenticated);
          }
          console.log(data.accessToken);

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
