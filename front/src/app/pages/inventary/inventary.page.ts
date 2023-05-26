import { Component, OnInit } from '@angular/core';
import { Pagination, ResponseDB_CRUD, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { InventaryCat } from 'src/app/interfaces/inventarioCat.interfaces';
import { getProductsListWithPage } from 'src/app/interfaces/products.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { InventaryService } from 'src/app/services/inventary.service';
import { ProductsService } from 'src/app/services/products.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.page.html',
  styleUrls: ['./inventary.page.scss'],
})
export class InventaryPage implements OnInit {

  inventaryCat: InventaryCat = {
    idUser:           0,
    idMovimiento:     "1",
    idProduct:        0,
    cantidad:         0,
    description:      ''
  }

  productsList: getProductsListWithPage[] = [];

  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 1000
  }

  constructor(
    private productsServ: ProductsService
    , private inventaryServ: InventaryService
    , private uiService: UiService
    , private authServ: AuthService
  ) {
   }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.inventaryCat.idUser = await this.authServ.getIdSession();

    this.getProductsListWithPage('');
  }

  public async getProductsListWithPage( search: string ){

    const loading = this.uiService.showLoading('Cargando...');

    this.productsServ.getProductsListWithPage(this.pagination)
    .subscribe({
      next: async( resp: ResponseGet ) => {
        this.productsList = resp.data.rows;
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

  public async insertInventary(){
    console.log(this.inventaryCat);

    const loading = this.uiService.showLoading('Cargando...');

    this.inventaryServ.insertInventary( this.inventaryCat )
    .subscribe({
      next: async( resp: ResponseDB_CRUD ) => {

        if(resp.status == 0){
          this.uiService.showToast(resp.message);
          this.clearCat();
        }
        else{
          this.uiService.showToast(resp.message);
        }
        this.uiService.hideLoading( await loading );
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
        this.uiService.hideLoading( await loading );
      },
      complete: async() => {
      }
    });

  }

  public clearCat(){
    this.inventaryCat = {
      idUser:     1,
      idMovimiento:     "1",
      idProduct:        0,
      cantidad:         0,
      description:      ''
    }
  }

}
