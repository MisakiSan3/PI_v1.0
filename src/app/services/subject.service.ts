import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SubjectModel,
  CreateSubjectModel,
  UpdateSubjectModel
} from '../models/subject-model.entity';
import { TokenService } from './token.service';
import { DocumentReference, Firestore,addDoc,collection,deleteDoc,doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { UserService } from './user.service';
import { CreateRecordModel, RecordModel } from '../models/record-model.entity';
import { UserModel } from '../models/user-model.entity';
import { RecordService } from './record.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  readonly API_URL: string = "http://localhost:8093/api/subject/";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private firestore: Firestore,
    private userService: UserService,
    private recordService: RecordService

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
 
   async deletesubject(subject: SubjectModel): Promise<void> {
     const docRef = doc(this.firestore, `${this.collectionUrl}/${subject.id}`);
     const getRecord = await getDocs(query(collection(this.firestore,"record"),where("subject.id","==",subject.id))) ;
     console.log(getRecord.docs[0].id);
     
     const docRefRecord = doc(this.firestore,`record/${getRecord.docs[0].id}` )
     deleteDoc(docRefRecord)
     return deleteDoc(docRef);
   }
 
   async savesubject(subject: CreateSubjectModel): Promise<any> {
     const userId = localStorage.getItem("currentUser");
     const collectionRef = collection(this.firestore, this.collectionUrl);
     
     const currentUser = await this.userService.getUser(userId!.toString())
     const data = currentUser._document.data.value.mapValue.fields;
     subject.user.email = data.email.stringValue;
     subject.user.username = data.username.stringValue;
     subject.user.id = currentUser._document.key.path.segments[6];
     
     //subject.user = currentUser
     const subjectData = JSON.parse(JSON.stringify(subject));
     delete subjectData.id
     delete subjectData.user.password
     const tempdDoc= await addDoc(collectionRef, subjectData)
     const document = await getDoc(doc(this.firestore,this.collectionUrl,tempdDoc.id))
     const newRecord: CreateRecordModel = {
      finalGrade: 0,
      sections: [],
      subject: {
        id: document.id,
        subjectName: document.get("subjectName") as string,
        user: document.get("user") as UserModel
      }
     }
    const record = await this.recordService.saverecord(newRecord)
     
     return document
    }

 
 
   async updatesubject(subject: UpdateSubjectModel): Promise<void>{
     const ocAux = JSON.parse(JSON.stringify(subject));
     const ref =  collection(this.firestore, this.collectionUrl)
     const docRef = doc(ref,subject.id);
     delete ocAux.id;
     const data =  await updateDoc(docRef,ocAux);
     return data;
  }
  async getSubjectListByUser():Promise<any> {
    const userId = localStorage.getItem("currentUser");
    const collectionRef = collection(this.firestore, this.collectionUrl);
    const q = query(collectionRef, where('user.id', '==', userId));
    const docs = await getDocs(q)
    const subjectList: SubjectModel[] = []
    docs.docs.forEach(element => {
      const aux = element.data() as SubjectModel
      aux.id = element.id
      subjectList.push(aux)
    });
     return subjectList;
   }
}
