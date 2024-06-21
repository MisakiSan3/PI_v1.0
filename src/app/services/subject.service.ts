import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SubjectModel,
  CreateSubjectModel,
  UpdateSubjectModel
} from '../models/subject-model.entity';
import { TokenService } from './token.service';
import { Firestore,addDoc,collection,deleteDoc,doc, updateDoc } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  readonly API_URL: string = "http://localhost:8093/api/subject/";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private firestore: Firestore,
    private userService: UserService

    ) { }
    httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
    }

  getAll():Observable<SubjectModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<SubjectModel[]>(url,this.httpOptions);
    //obejeto.metodo
  }


  getOne(id: SubjectModel['id']):Observable<SubjectModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<SubjectModel>(url);
  }

  //-------------------------------------------------

  store(subject: CreateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}save`;
    const userId = this.tokenService.getUserIdFromToken();
    if (userId) {
      //subject.user.id = 252;
      return this.httpClient.post<SubjectModel>(url, subject, this.httpOptions)
    }

    return this.httpClient.post<SubjectModel>(url, subject)
    throw new Error('No se pudo obtener el ID de usuario del token.');
  }

  update(id: SubjectModel['id'], subject: UpdateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}save`;

    return this.httpClient.post<SubjectModel>(url, subject,this.httpOptions);//devuelve un observable de tipo SubjectModel
  }
  destroy(id: SubjectModel['id']):Observable<any> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.delete<any>(url,this.httpOptions).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }

  //Traer materias segun el ID de Usuario
  getSubjectsByUserId(userId: string): Observable<SubjectModel[]> {
    const url = `${this.API_URL}/user/${userId}`;
    return this.httpClient.get<SubjectModel[]>(url,this.httpOptions);
  }

   //firebase
   readonly collectionUrl: string = "subject"

   getsubjectList(): Observable<SubjectModel[]> {
     const ref = collection(this.firestore, this.collectionUrl)
     const docs = collectionData(ref,{"idField":"id"}) as Observable<SubjectModel[]>;
     return docs;
   }
 
   deletesubject(docId: string): Promise<void> {
     const docRef = doc(this.firestore, `${this.collectionUrl}/${docId}`);
     return deleteDoc(docRef);
   }
 
   async savesubject(subject: CreateSubjectModel): Promise<any> {
     const userId = localStorage.getItem("currentUser");
     
     const currentUser = await this.userService.getUser(userId!.toString())
     const data = currentUser._document.data.value.mapValue.fields;
     subject.user.email = data.email.stringValue;
     subject.user.username = data.username.stringValue;
     subject.user.id = currentUser._document.key.path.segments[6];
     
     //subject.user = currentUser
     const subjectData = JSON.parse(JSON.stringify(subject));
     delete subjectData.id
     delete subjectData.user.password
     const docRef = collection(this.firestore, this.collectionUrl);
     return addDoc(docRef, subjectData);
   }
 
 
   async updatesubject(subject: SubjectModel): Promise<void>{
     const ocAux = JSON.parse(JSON.stringify(subject));
     const ref =  collection(this.firestore, this.collectionUrl)
     const docRef = doc(ref,subject.id);
     delete ocAux.id;
     const data =  await updateDoc(docRef,ocAux);
     return data;
  }
}
