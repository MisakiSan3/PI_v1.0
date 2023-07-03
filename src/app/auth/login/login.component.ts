import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(
    private router: Router,
    private authSevice: AuthService,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {
  }


  user: UserAuthModel = {
    email: '',
    contrasenia: ''
  }
  ngOnInit(): void {
  }
  onLogins(): void {

    this.user = new UserAuthModel(this.user.email, this.user.contrasenia);
    this.authSevice.login(this.user).subscribe(
      data => {
        
         if (!data.accessToke) {
          throw new Error('No existe el usuario')
         }else {
          this.tokenService.setToken(data.accessToke);
          this.router.navigate(['/pages']);
         }
        console.log(data.accessToke);
        this.tokenService.setToken(data.accessToke);
      }
    )


  }

  /* onLogin(): void {
     try {
       this.user = new UserAuthModel(this.user.email, this.user.contrasenia);
       this.authSevice.login(this.user).subscribe(
       data =>{
           if (data['accessToke']) {
             const dataJson = JSON.stringify(data['accessToke'])
             this.cookieService.set('User',dataJson);      
             this.router.navigateByUrl("/pages")  
           }else {
             throw new Error('No existe el usuario')
           }
         //this.tokenService.setToken(data.token);
       }
     )
     } catch (error) {
       console.log(error);
     }
     
   }*/

  navigateToRegister() {
    this.router.navigateByUrl("/register");
  }
  logIn() {
    console.log(this.user);

  }
}
