import { Injectable } from '@angular/core';
import { Mail } from '../models/mail';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }
  sendMail( correo:String , docTitle:String, id:String , random:String , yo :String):Observable<Mail> {
    console.log('send mail');
    console.log("KA "+'http://localhost:5000/mail/'+correo+'/'+docTitle+'/'+id+'/'+random+'/'+yo)
    return this.http.get<Mail>('http://localhost:5000/mail/'+correo+'/'+docTitle+'/'+id+'/'+random+'/'+yo);
  }
}
