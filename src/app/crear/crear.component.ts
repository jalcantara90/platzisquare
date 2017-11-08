import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  lugar : any = {};
  private searchField: FormControl;
  results$: Observable<any>;
  constructor(
    private _lugaresService: LugaresService,
    private route: ActivatedRoute,
    private http: Http
  ) {
    if (this.route.snapshot.params['id']) {
      console.log(this.route.snapshot.params['id']);
      this._lugaresService.getLugar(this.route.snapshot.params['id'])
          .subscribe( lugar => {
            this.lugar = lugar;
          })
    }

    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
        .debounceTime(500)
        .switchMap(query => this.http.get(`${URL}?address=${query}`))
        .map(response => response.json() )
        .map( response =>  response.results );
  }

  ngOnInit() {
  }

  guardarLugar() {
      let direccion = `${this.lugar.calle}+,${this.lugar.ciudad}+,${this.lugar.pais}`;
      this._lugaresService.obtenerGeoData(direccion)
        .subscribe( result => {
          this.lugar.lat = result.json().results[0].geometry.location.lat;
          this.lugar.lng = result.json().results[0].geometry.location.lng;
          if (this.route.snapshot.params['id']) {
            this._lugaresService.updateLugar(this.lugar);
            alert('Negocio Actualizado');
          }else {
            this.lugar.id = Date.now();
            this._lugaresService.guardarLugar(this.lugar);
            alert('Negocio guardado con éxito');
            this.lugar = {};
          }
        });   
  }

  recogerDireccion(result) {
    this.lugar.calle = result.address_components[1].long_name + ' ' + result.address_components[0].long_name;
    this.lugar.ciudad = result.address_components[3].long_name;
    this.lugar.pais = result.address_components[4].long_name;
  }
}
