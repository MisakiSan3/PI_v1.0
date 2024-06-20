import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private tokenService:TokenService,
    private authService: AuthService
    ){}
    
  //Cierra sesion limpiando el token almacenado en el localStorage del navegador
  logOut(): void {
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
