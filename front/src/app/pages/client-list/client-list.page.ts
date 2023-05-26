import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { OGetClientsListWithPage } from 'src/app/interfaces/clients.interface';
import { Pagination, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

  oClientsList: OGetClientsListWithPage[] = [];

  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 10
  }

  constructor(
    private clientsServ: ClientsService
    , private navCtrl: NavController
    , private uiService: UiService
    , private authServ: AuthService
  ) { 
    this.authServ.validaToken();
  }

  async ngOnInit() {
    await this.authServ.validaSesion();
    this.sGetClientsListWithPage(this.pagination, null);
  }

  public addClient( idClient: number ){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        idClient: idClient
      }
    };
    this.navCtrl.navigateRoot(['/client'], 
    navigationExtras);

  }

  public async sGetClientsListWithPage( pag: Pagination, ev: any ){

    const loading = this.uiService.showLoading('Cargando...');

    this.clientsServ.sGetClientsListWithPage(pag)
    .subscribe({
      next: async( resp: ResponseGet ) => {
        for(var i = 0; i < resp.data.rows.length; i++){
          this.oClientsList.push(resp.data.rows[i]);
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
    this.oClientsList = [];
    const ESearch = event.target.value.toLowerCase();
    
    this.pagination = {
      search: ESearch,
      iRows: 0,
      start: 0,
      limiter: 10
    }

    this.sGetClientsListWithPage( this.pagination, null );
  }

  onIonInfinite(ev: any) {
    if((this.pagination.iRows - this.pagination.start) > 0){
      this.sGetClientsListWithPage(this.pagination, ev);
    }else{
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }

}
