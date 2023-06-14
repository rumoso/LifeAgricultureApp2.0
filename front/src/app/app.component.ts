import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SqliteService } from './services/sqlite.service';
import { NumericValueAccessor } from '@ionic/angular';
import { ResponseGet } from './interfaces/general.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  idUser: number = 0;

  public appPages:any = [];
  
  constructor(
    private authServ: AuthService
    , private sqliteServ: SqliteService
  ) {
    
  }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.idUser = await this.authServ.getIdSession();

      this.appPages = [
          { title: 'Inicio', url: 'start', icon: 'home' },
          { title: 'Clientes', url: 'client-list', icon: 'people-circle' },
          { title: 'Ventas', url: 'sale-list', icon: 'cash' },
          { title: 'Productos', url: 'product-list', icon: 'bag-handle' },
          { title: 'Inventario', url: 'inventary', icon: 'cube' },
        ];
        
  }

  public async CGetMenu(){
    this.authServ.CGetMenu( this.idUser )
    .subscribe({
      next: async( resp: ResponseGet ) => {

        console.log( resp.data.rows )
        this.appPages = resp.data.rows;
      },
      error: async( ex: any ) => {
      },
      complete: async() => {
      }
    });


  }

}
