import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxRolesService, NgxPermissionsService} from 'ngx-permissions'
import {catchError, map} from'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


@Injectable({
    providedIn:'root'
})
export class AuthService {


    private url = 'https://identitytoolkit.googleapis.com/v1';
    private apiKey = 'AIzaSyCABIcza604wAWi0s-yR2tBYlG7YMsOO04';

    userToken: string;
    userEmail: string;
    expires: string;

    constructor( private http: HttpClient ){}

    logout(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('expires')
    }

    login(usuario: User):Observable<User>{
        const authData={
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
        };

        return this.http.post<User>(
            `${ this.url }/accounts:signInWithPassword?key=${this.apiKey} `,
        authData
        ).pipe(
            map(resp =>{
                this.guardarToken(resp['idToken'], resp['expiresIn']);
                this.saveEmail(resp.email);
                return resp
            })
        );
    }

    registrar(usuario: User):Observable<User>{
        const authData={
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
        };

        return this.http.post<User>(
            `${ this.url }/accounts:signUp?key=${this.apiKey} `,
        authData
        ).pipe(
            map(resp =>{
                this.guardarToken(resp['idToken'],  resp['expiresIn']);
                this.saveEmail(resp.email);
                return resp
            })
        );
    }

    postNuevoUsuario(usuario: User):Observable<User>{
        console.log('Guardando usuario nuevo en bd');
        console.log(usuario);
        return this.http.post<User>('http://localhost:5000/users',usuario,httpOptions)

    }

    private guardarToken(idToken: string, expiresIn: string){
        this.userToken = idToken;
        sessionStorage.setItem('token', idToken);

        let hoy = new Date();
        hoy.setSeconds(Number(expiresIn))

        sessionStorage.setItem('expires', hoy.getTime().toString())
    }

    leerToken(){
        if(sessionStorage.getItem('token')){
            this.userToken = sessionStorage.getItem('token');
        }
        else{
            this.userToken='';
        }
        return this.userToken;
    }

    getUserEmail():string{
        return sessionStorage.getItem('email');
    }
    saveEmail(email:string){
        sessionStorage.setItem('email',email);
    }


    estaAutenticado(): boolean{
        if(this.leerToken().length<2){
            return false
        }

        const expira = Number(sessionStorage.getItem('expires'));
        const expiraDate = new Date();
        expiraDate.setTime(expira);

        if(expiraDate> new Date()){
            return true
        }
        else{
            this.logout()
            return false
        }
    }


}
