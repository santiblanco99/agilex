import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

import { User } from '../user';

import { ToastrService } from 'ngx-toastr';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

    /**
    * Constructor for the component
    * @param authService Auth service provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
    ) { }

    user: User;

    roles: String[];

    /**
    * Logs the user in with the selected role
    */
    login(): void {
        this.authService.login(this.user.role);
        this.toastrService.success('Logged in')
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.user = new User();
        this.roles = ['Administrator', 'Client'];
    }

    /**
     * Method for testing purposes only
     */
    onSubmit(form:NgForm)
    {
        if( form.invalid)
        {
            return;
        }
        console.log('Formulario enviado');
        console.log(this.user);
    }

}