import { Injectable,inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  private cookieService = inject(CookieService)
  private router = inject(Router)
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const Jsonusuario =  this.cookieService.get('User')
      if (Jsonusuario) {
        return true
      }else {
        this.router.navigateByUrl("login")
        return false
      }
  }
  
  
}
