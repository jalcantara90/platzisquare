import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        // backgroundColor: 'green',
        // transform: 'rotate3d(0, 0, 0, 0deg)'
      })),
      state('final', style({
        opacity: 1,
        // backgroundColor: 'yellow',
        // transform: 'rotate3d(5, 10, 20, 30deg)'
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000))
    ])
  ]
})

export class LugaresComponent {
  lugares:any = null;
  state = 'inicial';

  // animar() {
  //   this.state = (this.state === 'final') ? 'inicial' : 'final';
  // }

  animacionInicial(e) {
    console.log('Iniciado');
    console.log(e);
  }
  animacionTermina(e) {
    console.log('Terminado');
    console.log(e);
  }
  constructor( private _lugaresService: LugaresService) {
    this._lugaresService.getLugares()
      .subscribe( lugares => {
        this.lugares = lugares;
        this.state = "final";
      });
  }

  lat: number = 41.45016252;
  lng: number = 2.192603;

}