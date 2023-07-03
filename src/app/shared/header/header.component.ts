import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    private tokenService:TokenService
    ){}
  /*logOut(){
    this.cookieService.delete('User');
    this.router.navigate(['/login'])
  }*/
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
