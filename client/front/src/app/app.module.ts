import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { AuthSignUpComponent } from './auth/auth-signup/auth-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
