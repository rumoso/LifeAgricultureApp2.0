import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OGetClientsListWithPage } from 'src/app/interfaces/clients.interface';
import { Pagination, ResponseDB_CRUD, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { getProductsListWithPage } from 'src/app/interfaces/products.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ProductsService } from 'src/app/services/products.service';
import { SalesService } from 'src/app/services/sales.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {

  productsList: any[] = [];
  clientsList: OGetClientsListWithPage[] = [];

  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 1000
  }

  sale: any = {
    idUser: 0,
    idSale: 0,
    idClient: 0,
    total: 0,
    productsSelect: []
  }

  productSelect: any = {
    idProduct: 0,
    name: '',
    cantidad: 0,
    cantidadSale: 0,
    precio: 0,
    UMDesc: '',
    observaciones: ''
  }

  constructor(
    private navCtrl: NavController
    , private sqliteServ: SqliteService
    , private authServ: AuthService
    , private uiService: UiService
    , private productsServ: ProductsService
    , private clientServ: ClientsService
    , private salesServ: SalesService
  ) { }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.sale.idUser = await this.authServ.getIdSession();

    this.getProductsToSale();
    this.getClientsToSale();
  }

  public async getProductsToSale(){

    const loading = this.uiService.showLoading('Cargando...');

    this.productsServ.getProductsToSale()
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

  public async getClientsToSale(){

    const loading = this.uiService.showLoading('Cargando...');

    this.clientServ.getClientsToSale()
    .subscribe({
      next: async( resp: ResponseGet ) => {
        console.log( resp.data.rows );

        this.clientsList = resp.data.rows;
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

  selectProductChange( e: any ) {
    console.log( 'ionChange fired with value: ' + e.detail.value );

    const id = e.detail.value;

    console.log( this.productsList )

    console.log( this.productsList.filter(function (x) { return x.idProduct == id; })[0] )

    const PSelect = this.productsList.filter(function (x) { return x.idProduct == id; })[0];

    this.productSelect.name = PSelect.name;
    this.productSelect.cantidad = PSelect.cantidad;
    this.productSelect.precio = PSelect.precio;
    this.productSelect.UMDesc = PSelect.UMDesc;

    console.log( this.productSelect )

  }

  public addProduct(){
    if( this.productSelect.idProduct > 0 ){

      this.sale.total += this.productSelect.cantidadSale * this.productSelect.precio;

      this.sale.productsSelect.push( this.productSelect );

      console.log( this.sale );

      this.productSelect = {
        idProduct: 0,
        name: '',
        cantidad: 0,
        cantidadSale: 0,
        precio: 0,
        UMDesc: '',
        observaciones: ''
      }
    }
  }

  public backSaleList(){
    this.navCtrl.navigateRoot('/sale-list',{animated: true});
  }

  public async saveSale(){

    if(this.productSelect.idProduct == 0 && this.sale.total > 0){
      
      const loading = this.uiService.showLoading('Cargando...');

      this.salesServ.insertSale( this.sale )
      .subscribe({
        next: async( resp: ResponseDB_CRUD ) => {
  
          if(resp.status == 0){
            this.uiService.showToast(resp.message);
            this.backSaleList();
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

    


  }

}
