import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertCtrl: AlertController
    , private toastCtrl: ToastController
    , private loadingController: LoadingController
  ) { }

  public async alertaInfo( message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public async showToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  public async showLoading<HTMLIonLoadingElement>( message: string ) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
    });
    await loading.present();
    return loading;
  }

  public async hideLoading(loading: HTMLIonLoadingElement) {
    loading.dismiss();
  }
}
