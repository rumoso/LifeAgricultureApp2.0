import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ClientCat } from 'src/app/interfaces/clients.interface';
import { ResponseDB_CRUD, ResponseGet } from 'src/app/interfaces/general.interfaces';
import { ClientsService } from 'src/app/services/clients.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  client: ClientCat = {
    idClient: 0,
    name: '',
    address: "",
    tel: "",
    cel: '',
    cultivo: '',
    superficie: ''
  };

  constructor(
    private navCtrl: NavController
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private uiService: UiService
    , private clientServ: ClientsService
    , private alertController: AlertController
  ) { }

  async ngOnInit() {

    await this.activatedRoute.queryParams.subscribe
    ({
      next: async( resp: any ) => {
        if(resp.idClient > 0){
          this.client.idClient = resp.idClient;
          console.log(this.client.idClient)
          await this.getClientByID();
        }
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      }
    });

  }

  public async getClientByID(){
    this.clientServ.getClientByID(this.client.idClient)
      .subscribe({
        next: async (resp: ResponseGet) => {
          this.client = resp.data[0];
        },
        error: async (ex: any) => {
          this.uiService.showToast('Error al conectarse al servidor');
        },
        complete: async () => {
          console.log('complete: getProductByID');
        }
      });


  }

  public cerrar(){
    this.navCtrl.navigateRoot('/client-list',{animated: true});
  }

  public async saveClient(){
    console.log(this.client);

    if(this.client.idClient == 0){

      const loading = this.uiService.showLoading('Cargando...');
      
      this.clientServ.insertClient( this.client )
      .subscribe({
        next: async( resp: ResponseDB_CRUD ) => {
  
          if(resp.status == 0){
            this.uiService.showToast(resp.message);
            this.cerrar();
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

    }else{

      const loading = this.uiService.showLoading('Cargando...');

      this.clientServ.updateClient( this.client )
      .subscribe({
        next: async( resp: ResponseDB_CRUD ) => {
  
          if(resp.status == 0){
            this.uiService.showToast(resp.message);
            this.cerrar();
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

  public async DeleteClient(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma!',
      message: '¿Quieres eliminar el cliente?',
      buttons: [
         {
          text: 'Si',
          handler: async () => {
            
            const loading = this.uiService.showLoading('Cargando...');

            this.clientServ.deleteClient( this.client.idClient )
            .subscribe({
              next: async( resp: ResponseDB_CRUD ) => {
        
                if(resp.status == 0){
                  this.uiService.showToast(resp.message);
                  this.cerrar();
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
                this.uiService.hideLoading( await loading );
              }
            });

          },
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();

  }

}
