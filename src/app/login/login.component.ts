import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginParams:any = {};

  constructor(
    private _autorizacionService: AutorizacionService
  ) { 
    
  }

  ngOnInit() {
  }

  login() {
    this._autorizacionService.login( this.loginParams.email, this.loginParams.password);
  }

  facebookLogin () {
    this._autorizacionService.facebookLogin();
  }
}
