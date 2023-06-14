import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { Pagination, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { SalesService } from 'src/app/services/sales.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 10
  }

  OSalesList: any = [];

  constructor(
    private sqliteServ: SqliteService
    , private authServ: AuthService
    , private navCtrl: NavController
    , private salesServ: SalesService
    , private uiServ: UiService
  ) {
    
  }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.getSalesHeaderListWithPage(this.pagination, null);
    
  }

  public async getSalesHeaderListWithPage( pag: Pagination, ev: any ){

    this.salesServ.getSalesHeaderListWithPage( pag )
    .subscribe({
      next: async( resp: ResponseGet ) => {

        console.log( resp.data.rows )

        for(var i = 0; i < resp.data.rows.length; i++){
          this.OSalesList.push(resp.data.rows[i]);
          this.pagination.iRows = resp.data.count;
          this.pagination.start ++;
        }
        if(ev!=null)
          (ev as InfiniteScrollCustomEvent).target.complete();
        
          console.log(this.pagination)
      },
      error: async( ex: any ) => {
        this.uiServ.showToast('Error al conectarse al servidor');
      },
      complete: async() => {
      }
    });
  }

  onIonInfinite(ev: any) {
    if((this.pagination.iRows - this.pagination.start) > 0){
      this.getSalesHeaderListWithPage(this.pagination, ev);
    }else{
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }

  public showSaleDetail( idSale: number ){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        idSale: idSale
      }
    };
    this.navCtrl.navigateRoot(['/sale-show'], 
    navigationExtras);

  } 

}
