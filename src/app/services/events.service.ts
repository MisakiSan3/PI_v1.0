import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  EventModel,
  CreateEventModel,
  UpdateEventModel
} from '../models/event-model.entity';
import { TokenService } from './token.service';
import { Firestore,addDoc,collection,deleteDoc,doc, updateDoc } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  readonly API_URL: string = "http://localhost:8093/api/events/";

  constructor(private httpClient: HttpClient,private tokenService: TokenService, private firestore: Firestore) { }
  httpOptions={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    }),
  }

  getAll():Observable<EventModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<EventModel[]>(url, this.httpOptions);
    //obejeto.metodo
  }
  getOne(id: EventModel['id']):Observable<EventModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<EventModel>(url);
  }
  store(event: CreateEventModel):Observable<EventModel> {//no se usaran todos o campos(id, event)
    const url = `${this.API_URL}save`;
    return this.httpClient.post<EventModel>(url, event,this.httpOptions)
  }

  update(id: EventModel['id'], event: UpdateEventModel):Observable<EventModel> {
    const url = `${this.API_URL}save`;
    return this.httpClient.post<EventModel>(url, event, this.httpOptions);//devuelve un observable de tipo EventModel
  }
  destroy(id: EventModel['id']):Observable<any> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.delete<any>(url,this.httpOptions).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
  getEventsByUserId(userId: string): Observable<EventModel[]> {
    const url = `${this.API_URL}/event/${userId}`;
    return this.httpClient.get<EventModel[]>(url);
  }

   //firebase
   readonly collectionUrl: string = "events"

   geteventList(): Observable<EventModel[]> {
     const ref = collection(this.firestore, this.collectionUrl)
     const docs = collectionData(ref,{"idField":"id"}) as Observable<EventModel[]>;
     return docs;
   }
 
   deleteevent(docId: string): Promise<void> {
     const docRef = doc(this.firestore, `${this.collectionUrl}/${docId}`);
     return deleteDoc(docRef);
   }
 
   saveevent(event: CreateEventModel): Promise<any> {
     const eventData = JSON.parse(JSON.stringify(event));
     console.log(eventData);
     
     delete eventData.id
     const docRef = collection(this.firestore, this.collectionUrl);
     return addDoc(docRef, eventData);
   }
 
 
   async updateevent(event: EventModel): Promise<void>{
     const ocAux = JSON.parse(JSON.stringify(event));
     const ref =  collection(this.firestore, this.collectionUrl)
     const docRef = doc(ref,event.id);
     delete ocAux.id;
     const data =  await updateDoc(docRef,ocAux);
     return data;
  }
}
