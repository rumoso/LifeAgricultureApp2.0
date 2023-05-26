import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages:any = [];
  constructor(
    private authServ: AuthService
    , private sqliteServ: SqliteService
  ) {
    this.appPages = [
      { title: 'Inicio', url: 'start', icon: 'home' },
      { title: 'Clientes', url: 'client-list', icon: 'people-circle' },
      { title: 'Ventas', url: 'sale-list', icon: 'cash' },
      { title: 'Productos', url: 'product-list', icon: 'bag-handle' },
      { title: 'Inventario', url: 'inventary', icon: 'cube' },
    ];
  }
}
