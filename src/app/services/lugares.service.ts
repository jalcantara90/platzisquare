import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { Http, Headers } from '@angular/http';
@Injectable()
export class LugaresService {
  API_ENDPOINT = 'platzisquare-7ac98.firebaseapp.com';

  lugares:any = [];
  //   {id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia', description: 'Descripción Cualquiera'},
  //   {id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'Descripción Cualquiera'},
  //   {id: 3, plan: 'pagado', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas felices', description: 'Descripción Cualquiera'},
  //   {id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Sushiroll', description: 'Descripción Cualquiera'},
  //   {id: 5, plan: 'gratuito', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'Descripción Cualquiera'},
  //   {id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo', description: 'Descripción Cualquiera'}
  // ];

  constructor( private afDB: AngularFireDatabase , private http: Http) { }

  public getLugares () {
    return this.afDB.list('lugares');
  }

  public getLugar(id) {
    return this.afDB.object(`lugares/${id}`)
    // return this.afDB.database.ref(`lugares/${id}`)
              // .once("value")
              // .then(snapshot => {
              //   return snapshot.val()
              // });
  }
  public buscarLugar (id) {
    return this.lugares.filter(lugar =>{ return lugar.id == id })[0] || null;
  }

  public guardarLugar(lugar) {
    this.afDB.database.ref('lugares/'+ lugar.id).set(lugar);
    // const headers = new Headers({'Content-type':'application/json'});
    // return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, { headers });
  }

  public obtenerGeoData(direccion) {

    return this.http.get(`http://maps.google.com/maps/api/geocode/json?address=${direccion}`);
  }

  public updateLugar(lugar) {
    this.afDB.database.ref('lugares/'+ lugar.id).set(lugar);
    // this.afDB.database.ref(`lugares/${lugar.id}`).update(
    //   { 
    //     nombre: lugar.nombre, 
    //     cercania: lugar.cercania, 
    //     ciudad: lugar.ciudad, 
    //     pais: lugar.pais,
    //     descripcion: lugar.descripcion,
    //     plan: lugar.plan,
    //     distancia: lugar.distancia,
    //     calle: lugar.calle,
    //     lat: lugar.lat,
    //     lng: lugar.lng
    //   });
  }
}
