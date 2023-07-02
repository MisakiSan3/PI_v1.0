import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  constructor(
    private router: Router,
    private authSevice:AuthService,
    private tokenService:TokenService,
    //private toastrService:ToastrService
    
    ) { 
    }
    

    user: UserAuthModel ={
      email: '',
      contrasenia: ''
    }
    ngOnInit(): void {
      
    }

    onLogin(): void {
      this.user = new UserAuthModel(this.user.email, this.user.contrasenia);
      this.authSevice.login(this.user).subscribe(
        data =>{
          console.log(data.token);
          //this.tokenService.setToken(data.token);
        }
      )
    }
  
  navigateToRegister() {
    this.router.navigateByUrl("/register");
  }
  logIn(){
    console.log(this.user);
    
  }
}
