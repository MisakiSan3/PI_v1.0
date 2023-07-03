import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }


  setToken(accessToke: string): void {
    localStorage.setItem('accessToke', accessToke);
    console.log('accessToke', accessToke);
  }


  getToken(): string {
    return localStorage.getItem('accessToke')!;
  }

  /*getUserIdFromToken(): string | null {
    const accessToke = this.getToken();
    if (accessToke) {
      const decodedToken: any = jwt_decode(accessToke);
      return decodedToken.sub;
    }
    return null;
  }*/

  getUserNameFromToken(): string | null{
    const nombreToke = this.getToken();
   
    if(!this.isLogged()){
     return null
    }

    const payload = nombreToke.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const name =  valuesJson.name;
    return name;
  }

  getUserIdFromToken(): string | null{
    const idToke = this.getToken();
   
    if(!this.isLogged()){
     return null
    }

    const payload = idToke.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const userId =  valuesJson.sub;
    console.log('id:', userId);
    return userId;
  }

  logOuts(): void {
    localStorage.clear();
  }

}
function jwt_decode(accessToke: string): any {
  throw new Error('Function not implemented.');

  
}

