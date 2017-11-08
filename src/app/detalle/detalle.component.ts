import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})

export class DetalleComponent {
  lugares:any = null;
  id = null;
  lugar: any = {};
  
  constructor( private route: ActivatedRoute, private _lugaresService: LugaresService ){
    this.lugares = this._lugaresService.getLugares();
    console.log( this.route.snapshot.params['id'] );
    console.log( this.route.snapshot.queryParams['action']);
    console.log( this.route.snapshot.queryParams['refered']);
    this.id = this.route.snapshot.params['id'];
    this.lugar = this._lugaresService.buscarLugar(this.id);
  }

}