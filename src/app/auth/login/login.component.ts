import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  user: UserAuthModel = {
    email: '',
    contrasenia: ''
  };

  ngOnInit(): void {}

  onLogin(): void {
    try {
      if (this.email.invalid || this.password.invalid) {
        throw new Error('Los campos ingresados no son válidos');
      }

      this.user = new UserAuthModel(this.user.email, this.user.contrasenia);
      this.authService.login(this.user).subscribe(
        data => {
          if (data['accessToke']) {
            const dataJson = JSON.stringify(data['accessToke']);
            this.cookieService.set('User', dataJson);
            this.router.navigateByUrl("/pages");
          } else {
            throw new Error('No existe el usuario');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl("/register");
  }

  isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }
}
