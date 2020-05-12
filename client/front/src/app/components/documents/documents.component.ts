import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import {Doc} from 'src/app/models/document';
import { User } from '../../auth/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  /* Propiedades para verificar el usuario*/
	public loggedIn = false;
	public loggedUser: User;

  constructor(private documentService:DocumentService, private authService: AuthService) { }

  documents: Doc[];

  ngOnInit(): void {
    this.documents = [];

    var email = this.authService.getUserEmail();
    if(email != null && email != undefined){
      this.documentService.getMyDocuments(email).subscribe(docs=>{
        docs.forEach(element=>{
          this.documents.push(element);
        })
      });
      this.documentService.getSharedDocuments(email).subscribe(result =>{
        result.forEach(element=>{
          this.documents.push(element);
        })
      });
  }
  }

  

}
