import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  UserModel,
  CreateUserModel,
  UpdateUserModel
} from '../models/user-model.entity';

import { Firestore,addDoc,collection,deleteDoc,doc, getDoc, setDoc, updateDoc, query, where, QuerySnapshot, getDocs } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  readonly API_URL: string = "http://localhost:8093/api/user";

  constructor(private httpClient: HttpClient, private firestore: Firestore, private authService: AuthService) { }

  getAll():Observable<UserModel[]> {
    const url = `${this.API_URL}`; 
    return this.httpClient.get<UserModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: UserModel['id']):Observable<UserModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<UserModel>(url);
  }
  store(user: CreateUserModel):Observable<UserModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}/save`; 
    return this.httpClient.post<UserModel>(url, user)
  }

  update(id: UserModel['id'], user: UpdateUserModel):Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<UserModel>(url, user);//devuelve un observable de tipo UserModel
  }
  destroy(id: UserModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)   
      return response.rta;
      })
      );
  }


  //firebase
  readonly collectionUrl: string = "user"

  getuserList(): Observable<UserModel[]> {
    const ref = collection(this.firestore, this.collectionUrl)
    const docs = collectionData(ref,{"idField":"id"}) as Observable<UserModel[]>;
    return docs;
  }

  deleteuser(docId: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionUrl}/${docId}`);
    return deleteDoc(docRef);
  }

  getUser(docId: string): Promise<any>  {
    const docRef = doc(this.firestore, `${this.collectionUrl}/${docId}`);
    return getDoc(docRef);

   
  }

  async saveuser(user: UserModel): Promise<any> {
    const userAux = JSON.parse(JSON.stringify(user));
    const cred = await this.authService.saveUser(user.email, user.password);
    user.id = cred.user.uid;
    const ref = collection(this.firestore, this.collectionUrl);
    const docRef = doc(ref, user.id);
    delete userAux.password
    delete userAux.id;
    const data = await setDoc(docRef, userAux);
    return data;
  }


  async updateuser(user: UserModel): Promise<void>{
    const ocAux = JSON.parse(JSON.stringify(user));
    const ref =  collection(this.firestore, this.collectionUrl)
    const docRef = doc(ref,user.id.toString());
    delete ocAux.id;
    const data =  await updateDoc(docRef,ocAux);
    return data;
 }
}