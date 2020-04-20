import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

import { User } from '../user';

import { ToastrService } from 'ngx-toastr';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

   
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    usuario: User;

   
    login(form: NgForm): void {
        this.authService.login(this.usuario)
        .subscribe( resp =>{
            console.log(resp);
            this.router.navigate(['']);
        }, (err) =>{
            console.log(err);
            alert('Credenciales invalidas');

            console.log(err.error.error.message);
        })
    }

    
    ngOnInit() {
        this.usuario = new User();
    }

   
    onSubmit()
    {
        
    }

}
