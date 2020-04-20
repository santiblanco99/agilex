import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth-sign-up',
    templateUrl: './auth-signup.component.html',
    styleUrls: ['./auth-signup.component.css']
})
export class AuthSignUpComponent implements OnInit {

    usuario:User;

    constructor(
        private authService: AuthService
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
