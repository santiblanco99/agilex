import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocuSignData } from '../models/DocusignData';
import { PdfData } from '../models/PdfData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DocusignService {

  constructor(private http: HttpClient) { }

  getSignature(data: DocuSignData):Observable<Object>{
   
    return this.http.post<Object>('http://localhost:5000/docusign',data, httpOptions);
  }


  createpdf(data: PdfData):Observable<Object>{
    console.log(data)
    return this.http.post<Object>('http://localhost:5000/toPdf/print',data, httpOptions);
  }
}
