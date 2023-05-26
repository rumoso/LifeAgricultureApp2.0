import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SqliteService } from './sqlite.service';
import { NavController } from '@ionic/angular';
import { ResponseGet } from '../interfaces/general.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/auth';

  public token: string = '';

  constructor(
    private http: HttpClient
    , private sqliteServ: SqliteService
    , private navCtrl: NavController
    ) { }

  public login( userName: string, pwd: string): Observable<ResponseGet>{
    const data = {
      username: userName
      ,pwd: pwd
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/login` ,data);
  }

  public async saveToken( token: string ) {
    await this.sqliteServ.set('token', token);
    await this.validaToken();
  }

  public async cargarToken() {
    this.token = await this.sqliteServ.get('token') || null;
  }

  public async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      await this.sqliteServ.set('token', '');
      await this.sqliteServ.set('user', null);
      this.navCtrl.navigateRoot( '/login' );
      return Promise.resolve(false);
    } else {
      // AQUI DEBERIA VALIDAR EL UUID EN LA BASE DE DATOS
      return Promise.resolve(true);
    }
  }

  public async validaSesion() {
    await this.validaToken();
  }

  public async getIdSession(): Promise<number> {
    let user = await this.sqliteServ.get('user');

    if(user != null || user != undefined)
      return Promise.resolve(user.idUser);
    else
      return Promise.resolve(0);
  }

  public async cerrarSesion() {
    this.token = '';
    await this.sqliteServ.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
