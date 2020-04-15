import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Doc} from 'src/app/models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments():Observable<Doc[]>{
    return this.http.get<Doc[]>('http://localhost:5000/documents');
  }
}

