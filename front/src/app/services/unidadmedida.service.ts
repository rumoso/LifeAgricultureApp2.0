import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGet } from '../interfaces/general.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/unidadmedida';

  constructor( private http: HttpClient ) { }

  public getUnidadesMedida(): Observable<ResponseGet>{

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getUnidadesMedida`,{});
  }
}
