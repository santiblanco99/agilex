import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'Agilex';

  constructor(
    private authService: AuthService,
    private router: Router
) { }

estaAutenticado(){
  return this.authService.estaAutenticado()
}

salir(){
  this.authService.logout();
  this.router.navigateByUrl('auth/login')
}


 

}
