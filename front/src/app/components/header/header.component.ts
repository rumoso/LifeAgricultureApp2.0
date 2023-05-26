import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = '';
  @Input() icon: string = '';
  

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit() {}

  public cerrarSesion(){
    this.authServ.cerrarSesion();
  }

}
