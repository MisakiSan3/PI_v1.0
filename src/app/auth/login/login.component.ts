import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/models/auth-model.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
    
  }
  user: UserAuthModel ={
    email: '',
    password: ''
  }
  ngOnInit(): void {

  }
  
  navigateToRegister() {
    this.router.navigateByUrl("/register");
  }
  logIn(){
    console.log(this.user);
    
  }
}
