import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserAuthModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  formSubmitted = false;
  formInvalid = false;

  user: UserAuthModel = {
    username: '',
    password: ''
  };

  modalRef?: BsModalRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onLogins(template: TemplateRef<any>): void {
    this.formSubmitted = true;

    if (this.username.invalid || this.password.invalid) {
      this.formInvalid = true;
      this.modalRef = this.modalService.show(template);
      return;
    }

    const usernameValue = this.username.value;
    const passwordValue = this.password.value;
    if (usernameValue && passwordValue) {
      this.user.username = usernameValue;
      this.user.password = passwordValue;

      this.authService.logInPassword(this.user.username, this.user.password);
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
