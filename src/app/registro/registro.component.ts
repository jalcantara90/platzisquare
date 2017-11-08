import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {
  registro: any = {};

  constructor(
    private _autorizacionService: AutorizacionService
  ) { 
   
  }

  ngOnInit() {
  }

  registrar() {
    this._autorizacionService.registro(this.registro.email, this.registro.password);
  }

}
