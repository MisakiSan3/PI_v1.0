import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate  {
    constructor(
      private tokenService: TokenService,
      private router: Router
    ) {}


    canActivate(): boolean {
        if (this.tokenService.getIsAuthenticated()) {
            this.router.navigateByUrl('/pages');
          return false;
        }else {
          
          return true;
        }
      }
  }