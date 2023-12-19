import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CategoryModel,
  CreateCategoryModel,
  UpdateCategoryModel
} from '../models/category-model.entity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  readonly API_URL: string = "http://localhost:8093/api/eventscategory/";

  constructor(private httpClient: HttpClient,private tokenService: TokenService) { }
  httpOptions={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    }),
  }

  getAll():Observable<CategoryModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<CategoryModel[]>(url,this.httpOptions);
    //obejeto.metodo
  }
  getOne(id: CategoryModel['id']):Observable<CategoryModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<CategoryModel>(url);
  }
  store(category: CreateCategoryModel):Observable<CategoryModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}/save`;
    return this.httpClient.post<CategoryModel>(url, category, this.httpOptions)
  }

  update(id: CategoryModel['id'], category: UpdateCategoryModel):Observable<CategoryModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<CategoryModel>(url, category);//devuelve un observable de tipo CategoryModel
  }
  destroy(id: CategoryModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
}
