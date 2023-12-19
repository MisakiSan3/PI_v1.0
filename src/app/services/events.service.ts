import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  EventModel,
  CreateEventModel,
  UpdateEventModel
} from '../models/event-model.entity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  readonly API_URL: string = "http://localhost:8093/api/events/";

  constructor(private httpClient: HttpClient,private tokenService: TokenService) { }
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
  store(event: CreateEventModel):Observable<EventModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}save`;
    return this.httpClient.post<EventModel>(url, event,this.httpOptions)
  }

  update(id: EventModel['id'], event: UpdateEventModel):Observable<EventModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.patch<EventModel>(url, event);//devuelve un observable de tipo EventModel
  }
  destroy(id: EventModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
  getEventsByUserId(userId: string): Observable<EventModel[]> {
    const url = `${this.API_URL}/event/${userId}`;
    return this.httpClient.get<EventModel[]>(url);
  }
}
