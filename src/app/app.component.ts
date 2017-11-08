import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquare';
  loggedIn = false;
  loggedUser: any = null;
  constructor (
    private _autorizacionService: AutorizacionService
  ) {
    this._autorizacionService.isLogged()
        .subscribe( result => {
          if ( result  && result.uid ) {
            this.loggedIn = true;
            setTimeout ( ()=> {
              this.loggedUser = this._autorizacionService.getUser().currentUser.email;
            }, 500)
            console.log(this.loggedUser);
          }else {
            this.loggedIn = false;
          }
        }, error => {
          this.loggedIn = false;
        })
  }

  logout() {
    this._autorizacionService.logOut();
  }

}
