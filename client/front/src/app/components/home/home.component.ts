import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { isUndefined } from 'util';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/auth/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loggedIn = false;

  public loggedUser: User;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    var email = this.authService.getUserEmail();
    if(email != null && email != undefined){
      this.userService.getDocumentById(email).subscribe(user=>{
        this.loggedUser = user;
        this.loggedIn = true;
      });
    }

    console.log(this.loggedUser);
  }

}
