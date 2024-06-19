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

  ngOnInit(): void {
  }
 
  onLogins(): void {
    this.formSubmitted = true; // Set formSubmitted to true when the form is submitted

    if (this.username.invalid || this.password.invalid) {
      // Check if the form is invalid
      this.formInvalid = true; // Set formInvalid to true if the form is invalid
      return;
    }

    const usernameValue = this.username.value;
    const passwordValue = this.password.value;
    if (usernameValue && passwordValue) {
      this.user.username = usernameValue;
      this.user.password = passwordValue;

      this.authService.logInPassword(this.user.username,this.user.password);
      
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
