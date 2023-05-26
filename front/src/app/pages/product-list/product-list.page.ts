import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { Pagination, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { getProductsListWithPage } from 'src/app/interfaces/products.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  OProductsList: getProductsListWithPage[] = [];
  
  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 10
  }

  constructor(
    private productsService: ProductsService
    , private navCtrl: NavController
    , private uiService: UiService
    , private authServ: AuthService
  ) { 
    this.authServ.validaToken();
  }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.getProductsListWithPage(this.pagination, null);
  }

  public addProduct( idProduct: number ){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: idProduct
      }
    };
    this.navCtrl.navigateRoot(['/product'], 
    navigationExtras);

  }

  public async getProductsListWithPage( pag: Pagination, ev: any ){

    const loading = this.uiService.showLoading('Cargando...');

    this.productsService.getProductsListWithPage(pag)
    .subscribe({
      next: async( resp: ResponseGet ) => {
        for(var i = 0; i < resp.data.rows.length; i++){
          this.OProductsList.push(resp.data.rows[i]);
          this.pagination.iRows = resp.data.count;
          this.pagination.start ++;
        }
        if(ev!=null)
          (ev as InfiniteScrollCustomEvent).target.complete();
        
          console.log(this.pagination)
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
        this.uiService.hideLoading( await loading );
      },
      complete: async() => {
        this.uiService.hideLoading( await loading );
      }
    });


  }

  EventInput(event:any) {
    this.OProductsList = [];
    const ESearch = event.target.value.toLowerCase();
    
    this.pagination = {
      search: ESearch,
      iRows: 0,
      start: 0,
      limiter: 10
    }

    this.getProductsListWithPage( this.pagination, null );
  }

  onIonInfinite(ev: any) {
    if((this.pagination.iRows - this.pagination.start) > 0){
      this.getProductsListWithPage(this.pagination, ev);
    }else{
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }

}
