import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { isUndefined } from 'util';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/auth/user';
import { DocusignService } from 'src/app/services/docusign.service';
import { DocuSignData } from 'src/app/models/DocusignData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loggedIn = false;

  public loggedUser: User;

  constructor(private authService: AuthService, private userService: UserService, private dousign: DocusignService) { }

  ngOnInit(): void {

    var email = this.authService.getUserEmail();
    if(email != null && email != undefined){
      this.userService.getDocumentById(email).subscribe(user=>{
        console.log(user.email);
        this.loggedUser = user;
        this.loggedIn = true;
        // let data = new DocuSignData('Prueba',user.email,'Prueba');
        // this.dousign.getSignature(data).subscribe(result=>{
        //   console.log('docusign: '+result);
        // });

      });
    }
  }

}
