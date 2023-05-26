import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InventaryCat } from '../interfaces/inventarioCat.interfaces';
import { Observable } from 'rxjs';
import { ResponseDB_CRUD, ResponseGet } from '../interfaces/general.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/inventary';

  constructor( private http: HttpClient ) { }

  public insertInventary(data: InventaryCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/insertInventary`,data);
  }

  public getInventaryByIDProductListWithPage(idProduct: number): Observable<ResponseGet>{
    const data = {
      idProduct
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getInventaryByIdProductListWithPage`,data);
  }
}
