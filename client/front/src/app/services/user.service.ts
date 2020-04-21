import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getDocumentById(val:string):Observable<User>{
    const url = `http://localhost:5000/users/${val}`;
    console.log('fetching info');
    var ans = this.http.get<User>(url);
    console.log(ans);
    return ans;
  }
}
