import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Doc} from 'src/app/models/document';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments():Observable<Doc[]>{
    return this.http.get<Doc[]>('http://localhost:5000/documents');
  }

  postDocument(doc:Doc):Observable<Doc> {
    console.log('saving doc');
    return this.http.post<Doc>('http://localhost:5000/documents',doc,httpOptions);
  }

  getDocumentById(val:string):Observable<Doc>{
    const url = `http://localhost:5000/documents/${val}`;
    console.log('fetching info');
    console.log(url);
    var ans = this.http.get<Doc>(url);
    console.log(ans);
    return ans;
  }

  putDocument(doc:Doc):Observable<Doc> {
    console.log('updating doc');
    let id = doc.id;
    return this.http.put<Doc>(`http://localhost:5000/documents/${id}`,doc,httpOptions);
  }

  getMyDocuments(author:String):Observable<Doc[]>{
    return this.http.get<Doc[]>(`http://localhost:5000/documents/userDocuments/${author}`);
  }
}

