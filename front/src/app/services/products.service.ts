import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination, ResponseDB_CRUD, ResponseGet } from '../interfaces/general.interfaces';
import { Observable } from 'rxjs';
import { ProductCat } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/products';

  constructor( private http: HttpClient ) { }

  public getProductsListWithPage(pagination: Pagination): Observable<ResponseGet>{
    const data = {
      search: pagination.search
      ,start: pagination.start
      ,limiter: pagination.limiter
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getProductsListWithPage`,data);
  }

  public getProductByID(id: number): Observable<ResponseGet>{
    const data = {
      id
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getProductByID`,data);
  }

  public insertProduct(data: ProductCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/insertProduct`,data);
  }

  public updateProduct(data: ProductCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/updateProduct`,data);
  }

  public deleteProduct(idProduct: number): Observable<ResponseDB_CRUD>{
    const data = {
      idProduct
    };
    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/deleteProduct`,data);
  }

  public getProductsToSale(): Observable<ResponseGet>{

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/getProductsToSale`,null);
  }
}
