import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination, ResponseDB_CRUD, ResponseGet } from '../interfaces/general.interfaces';
import { Observable } from 'rxjs';
import { ClientCat } from '../interfaces/clients.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/clients';

  constructor( private http: HttpClient ) { }

  public sGetClientsListWithPage(pagination: Pagination): Observable<ResponseGet>{
    const data = {
      search: pagination.search
      ,start: pagination.start
      ,limiter: pagination.limiter
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getClientsListWithPage`,data);
  }

  public getClientByID(idClient: number): Observable<ResponseGet>{
    const data = {
      idClient
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getClientByID`,data);
  }

  public insertClient(data: ClientCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/insertClient`,data);
  }

  public updateClient(data: ClientCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/updateClient`,data);
  }

  public deleteClient(idClient: number): Observable<ResponseDB_CRUD>{
    const data = {
      idClient
    };
    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/deleteClient`,data);
  }

  public getClientsToSale(): Observable<ResponseGet>{

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getClientsToSale`,null);
  }
}
