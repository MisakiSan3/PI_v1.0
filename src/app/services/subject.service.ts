import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SubjectModel,
  CreateSubjectModel,
  UpdateSubjectModel
} from '../models/subject-model.entity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  readonly API_URL: string = "http://localhost:8093/api/subject/";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService


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
      subject.user.id = 252;
      return this.httpClient.post<SubjectModel>(url, subject, this.httpOptions)
    }

    return this.httpClient.post<SubjectModel>(url, subject)
    throw new Error('No se pudo obtener el ID de usuario del token.');
  }

  update(id: SubjectModel['id'], subject: UpdateSubjectModel):Observable<SubjectModel> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.put<SubjectModel>(url, subject,this.httpOptions);//devuelve un observable de tipo SubjectModel
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
}
