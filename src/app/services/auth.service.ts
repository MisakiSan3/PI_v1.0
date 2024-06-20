import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CreateUserModel, UserModel } from '../models/user-model.entity';
import { UserAuthModel } from '../models/auth-model.entity';
import {Auth,signInWithEmailAndPassword,onAuthStateChanged, signOut, createUserWithEmailAndPassword, UserCredential, updateEmail,updatePassword, user} from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  readonly API_URL: string = "http://localhost:8093/auth/";
  constructor(private  httpclient:HttpClient, private auth: Auth, private router: Router) { 
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        localStorage.setItem("currentUser", user.uid);
      } else {
        localStorage.clear();
      }
    });
  }

  

  login(dto: UserAuthModel):Observable<any>{
    return this.httpclient.post<any>(this.API_URL + 'login',dto);
  }

  register(dto: CreateUserModel):Observable<any>{
    return this.httpclient.post<any>(this.API_URL + 'register', dto);
  }
  
  // Firebase

  async saveUser(email: string, password: string): Promise<UserCredential>{
    const aux =await createUserWithEmailAndPassword(this.auth,email,password) as UserCredential;
    return aux;
  }

  logInPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        location.href = "pages";
      })
      .catch((error: Error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
  logOut() {
    signOut(this.auth)
      .then(() => (this.router.navigate(["../../"+"login"])))
      .catch((error: Error) => alert(error));
  }
  async updateUser(email:string,password:string){
    const user = this.auth.currentUser;
    if (user) {
      await updateEmail(user,email)
      await updatePassword(user,password)
    }
  }

    
  
}
