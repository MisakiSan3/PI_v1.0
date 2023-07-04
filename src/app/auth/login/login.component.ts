import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserAuthModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


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
    private authSevice: AuthService,
    private tokenService: TokenService,
  
    
  ) {}

 
  user: UserAuthModel = {
    email: '',
    contrasenia: ''
  }
  ngOnInit(): void {}


  onLogins(): void {

    this.user = new UserAuthModel(this.user.email, this.user.contrasenia);
    this.authSevice.login(this.user).subscribe(
      data => {
        
         if (!data.accessToke) {
          throw new Error('No existe el usuario')  
         }else {
          
           this.tokenService.setToken(data.accessToke);
           const aut = this.tokenService.getIsAuthenticated();
           
           this.router.navigate(['/pages']);
          console.log(aut)
         }
        console.log(data.accessToke);
        this.tokenService.setToken(data.accessToke);
      }
    )


  }


  navigateToRegister() {
    this.router.navigateByUrl("/register");
  }

}
