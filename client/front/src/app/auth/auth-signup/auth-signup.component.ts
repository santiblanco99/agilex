import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-sign-up',
    templateUrl: './auth-signup.component.html',
    styleUrls: ['./auth-signup.component.css']
})
export class AuthSignUpComponent implements OnInit {

    usuario:User;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }




    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.usuario = new User();
    }

    onSubmit(form: NgForm){
        
        if(form.invalid){return;}

        this.authService.registrar(this.usuario)
        .subscribe( resp =>{
            console.log(resp);
            this.router.navigate(['']);
        }, (err) =>{
            console.log(err);

            console.log(err.error.error.message);
        })

        
        this.authService.postNuevoUsuario(this.usuario)
        .subscribe( resp =>{
            console.log(resp);
        })
        
        
    }

}
