import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import {Doc} from 'src/app/models/document';
import { Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'Agilex';
  currentUrl;
  email;
  constructor(
    private authService: AuthService,
    private router: Router,
    private documentService:DocumentService
) { 
  this.router.events
  .subscribe((event) => {
    if (event instanceof NavigationEnd) {
      console.log('NavigationEnd:', event);
      if (this.currentUrl != undefined)
      {
        var n= this.currentUrl.indexOf("newDocument/");
        var yo= this.currentUrl.indexOf("?");
        console.log(this.currentUrl+" "+n+" otris "+yo);
        if (n!= -1 && yo==-1)
        {
          
          this.currentUrl=  this.currentUrl.substring(n+12,this.currentUrl.length);
          this.currentUrl= this.currentUrl.replace("/newDocument/","");
       //   console.log("ELIMIR "+this.currentUrl);
          documentService.removeOnlineDocument(this.currentUrl,this.authService.getUserEmail());
        }
        if (n!= -1 && yo!=-1)
        {
          
          this.currentUrl=  this.currentUrl.substring(n+12,yo);
          this.currentUrl= this.currentUrl.replace("/newDocument/","");
        //  console.log("ELIMIR "+this.currentUrl);
          documentService.removeOnlineDocument(this.currentUrl,this.authService.getUserEmail());
        }
        yo=  this.currentUrl.indexOf("guest/");
        var ke = yo;
       // console.log("GUES"+yo);
        if (ke !=  -1)
        {
        // console.log("ENTRE");
          this.currentUrl=  this.currentUrl.substring(yo+6,this.currentUrl.length);
         
          n= this.currentUrl.indexOf("/");
          
          this.currentUrl=  this.currentUrl.substring(0,n);
          documentService.removeOnlineDocument(this.currentUrl,this.email);
        }
      }
      
      this.currentUrl = event.url;
      yo=  this.currentUrl.indexOf("guest/");
        var ke = yo;
      //  console.log("mail GUES"+yo);
        if (ke !=  -1)
        {
          var no =  this.currentUrl.substring(yo+6,this.currentUrl.length);
         
          n= no.indexOf("?");
         
          if (n!= -1)
          {
            no = no.substring(0,n);
            n= no.indexOf("/");
            var id =  no.substring(0,n);
            var ind =  no.substring(n+1);
    //        console.log("ID "+id+" invd "+ind);
          this.documentService.getDocumentById(id).subscribe(doc => {
  //          console.log("ID "+id+" invd "+ind);
            this.email= doc.guest[ind];
          });

          }
          
        }
      
      
    }
  })
 
}


ya = false;

estaAutenticado(){
 // console.log("AJA");
  if (!this.ya || this.documentsId == undefined )
  {
   //console.log("HOkS");
    this.ya=true;
    var email = this.authService.getUserEmail();
    if(email != null && email != undefined){
      this.documentService.getMyDocuments(email).subscribe(docs=>{
        this.documentsId = docs;
       // console.log(docs);
      });
  }
  }
  return this.authService.estaAutenticado()
}
documentsId: Doc[]; 
salir(){
  console.log("SALIR");
  var email = this.authService.getUserEmail();
  //console.log(email+" "+this.documentsId);
  for(let i = 0; i < this.documentsId.length; i++)
  {
    console.log(this.documentsId[i]);
    
    this.documentService.removeOnlineDocument (this.documentsId[i].id,email );
  }
  this.authService.logout();
  
  this.router.navigateByUrl('auth/login');
}


 

}
