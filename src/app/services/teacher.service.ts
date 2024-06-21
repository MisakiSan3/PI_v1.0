import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  TeacherModel,
  CreateTeacherModel,
  UpdateTeacherModel
} from '../models/teacher-model.entity';
import { TokenService } from './token.service';
import { Firestore,addDoc,collection,deleteDoc,doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  readonly API_URL: string = "http://localhost:8093/api/teacher/";

  constructor(private httpClient: HttpClient,private tokenService: TokenService, private firestore: Firestore) { }
  httpOptions={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    }),
  }


  getAll():Observable<TeacherModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<TeacherModel[]>(url,this.httpOptions);
    //obejeto.metodo
  }
  getTeachersByUserId(userId: string): Observable<TeacherModel[]> {
    const url = `${this.API_URL}/teacher/${userId}`;
    return this.httpClient.get<TeacherModel[]>(url);
  }
  getOne(id: TeacherModel['id']):Observable<TeacherModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<TeacherModel>(url,this.httpOptions);
  }
  store(teacher: CreateTeacherModel):Observable<TeacherModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}save`;
    console.log(teacher);

    return this.httpClient.post<TeacherModel>(url, teacher,this.httpOptions)
  }

  update(id: TeacherModel['id'], teacher: UpdateTeacherModel):Observable<TeacherModel> {
    const url = `${this.API_URL}save`;
    return this.httpClient.post<TeacherModel>(url, teacher,this.httpOptions);//devuelve un observable de tipo TeacherModel
  }
  destroy(id: TeacherModel['id']):Observable<any> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.delete<any>(url,this.httpOptions).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }


  //firebase
  readonly collectionUrl: string = "teacher"

  getteacherList(): Observable<TeacherModel[]> {
    const ref = collection(this.firestore, this.collectionUrl)
    const docs = collectionData(ref,{"idField":"id"}) as Observable<TeacherModel[]>;
    return docs;
  }

  deleteteacher(teacher: TeacherModel): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionUrl}/${teacher.id}`);
    return deleteDoc(docRef);
  }

  saveteacher(teacher: CreateTeacherModel): Promise<any> {
    const teacherData = JSON.parse(JSON.stringify(teacher));
    delete teacherData.id
    const docRef = collection(this.firestore, this.collectionUrl);
    return addDoc(docRef, teacherData);
  }


  async updateteacher(teacher: TeacherModel): Promise<void>{
    const ocAux = JSON.parse(JSON.stringify(teacher));
    const ref =  collection(this.firestore, this.collectionUrl)
    const docRef = doc(ref,teacher.id);
    delete ocAux.id;
    const data =  await updateDoc(docRef,ocAux);
    return data;
 }

 async getTeacherListByUser():Promise<any> {
  const userId = localStorage.getItem("currentUser");
  const collectionRef = collection(this.firestore, this.collectionUrl);
  const q = query(collectionRef, where('subject.user.id', '==', userId));
  const docs = await getDocs(q)
  const teacherList: TeacherModel[] = []
  docs.docs.forEach(element => {
    const aux = element.data() as TeacherModel
    aux.id = element.id
    teacherList.push(aux)
  });
   return teacherList;
 }
}
