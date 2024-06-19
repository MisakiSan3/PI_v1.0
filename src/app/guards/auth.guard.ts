import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
  ) {}

   
  canActivate(): boolean {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
