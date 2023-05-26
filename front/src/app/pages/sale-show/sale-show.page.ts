import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ResponseGet } from 'src/app/interfaces/general.interfaces';
import { SalesService } from 'src/app/services/sales.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sale-show',
  templateUrl: './sale-show.page.html',
  styleUrls: ['./sale-show.page.scss'],
})
export class SaleShowPage implements OnInit {

  idSale: number = 0;

  sale: any = {
    idSale: 0,
    createDate: "",
    idClient: 0,
    clientName: "",
    totalSale: 0,
    saleDetail: []
  };

  constructor(
    private navCtrl: NavController
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private uiService: UiService
    , private alertController: AlertController
    , private saleServ: SalesService
  ) { }

  async ngOnInit() {
    await this.activatedRoute.queryParams.subscribe
    ({
      next: async( resp: any ) => {
        if(resp.idSale > 0){
          this.idSale = resp.idSale;
          await this.getSaleById();
        }
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      }
    });
  }

  public async getSaleById(){
    this.saleServ.getSaleById( this.idSale )
      .subscribe({
        next: async (resp: ResponseGet) => {
          console.log( resp )
          this.sale = resp.data;
          console.log( this.sale )
          //this.client = resp.data[0];
        },
        error: async (ex: any) => {
          this.uiService.showToast('Error al conectarse al servidor');
        },
        complete: async () => {
        }
      });


  }

  public backSaleList(){
    this.navCtrl.navigateRoot('/sale-list',{animated: true});
  }

}
