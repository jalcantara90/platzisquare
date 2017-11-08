import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AutorizacionService {

  email: string = '';
  constructor( private angularFireAuth: AngularFireAuth , private router: Router) {
    this.isLogged();
   }

  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( response => {
      alert('Usuario Logeado con éxito');
      console.log(response);
    })
    .catch( error => {
      alert('Un Error ha ocurrido');
      console.log(error);
    })
  }

  public registro = (email, password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
          alert('Usuario Registrado con éxito');
          console.log(response);
          this.router.navigate(['lugares']);
        })
        .catch( error => {
          alert('Un Error ha ocurrido');
          console.log(error);
        })
  }

  public facebookLogin() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then( result => {
          console.log(result);
          alert('Usuario loggeado con Facebook');
          this.email = result.user.email;
          this.router.navigate(['lugares']);
        })
        .catch( error => {
          console.log(error);
        })
  }

  public logOut() {
    this.angularFireAuth.auth.signOut();
  }

  public isLogged() {
    return this.angularFireAuth.authState;
  }

  public getUser() {
    return this.angularFireAuth.auth;
  }

}
