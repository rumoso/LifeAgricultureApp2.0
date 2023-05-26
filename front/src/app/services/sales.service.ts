import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination, ResponseDB_CRUD, ResponseGet } from '../interfaces/general.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/sales';

  constructor(
    private http: HttpClient
  ) { }

  public insertSale(data: any): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/insertSale`,data);
  }

  public getSalesHeaderListWithPage(pagination: Pagination): Observable<ResponseGet>{
    const data = {
      search: pagination.search
      ,start: pagination.start
      ,limiter: pagination.limiter
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getSalesHeaderListWithPage`,data);
  }

  public getSaleById(idSale: number): Observable<ResponseGet>{
    const data = {
      idSale: idSale
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getSaleById`,data);
  }
}