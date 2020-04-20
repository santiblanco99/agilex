import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { AuthSignUpComponent } from './auth/auth-signup/auth-signup.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    DocumentsComponent,
    EditorComponent,
    HomeComponent,
    AuthSignUpComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
