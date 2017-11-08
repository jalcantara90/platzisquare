import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//librería google maps
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearComponent } from './crear/crear.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

//Directivas Personalizadas
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';

//servicios
import { LugaresService } from './services/lugares.service';
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuardService } from './services/my-guard.service';

//Pipes
import { LinkifystrPipe } from './pipes/linkifystr.pipe';

//firebase Config and imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyB262BwNtvdn3QjHZ2dyNGmnmrit0ZDYNU",
  authDomain: "platzisquare-7ac98.firebaseapp.com",
  databaseURL: "https://platzisquare-7ac98.firebaseio.com",
  projectId: "platzisquare-7ac98",
  storageBucket: "",
  messagingSenderId: "916018826501"
};

const appRoutes: Routes = [
  {path: '', component: LugaresComponent},
  {path:'lugares', component: LugaresComponent},
  {path:'detalle/:id', component: DetalleComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'crear', component: CrearComponent, canActivate:[MyGuardService]},
  {path:'modificar/:id', component: CrearComponent, canActivate:[MyGuardService]},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhcZXx0gh_GpurSQ7dj10R2coWsVLHno4'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [LugaresService, AutorizacionService, MyGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
