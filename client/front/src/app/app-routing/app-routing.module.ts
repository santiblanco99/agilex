import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {DocumentsComponent} from '../components/documents/documents.component';
import {HomeComponent} from'../components/home/home.component';

import {EditorComponent} from '../components/editor/editor.component';
import { AuthLoginComponent } from '../auth/auth-login/auth-login.component';
import { AuthSignUpComponent } from '../auth/auth-signup/auth-signup.component';
import { Error404Component } from '../components/error404/error404.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes : Routes = [
    {
        path:'',
        component:HomeComponent,
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: AuthLoginComponent,
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            },
            {
                path: ':sign-up',
                component: AuthSignUpComponent,
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            }
        ]
    },
    {
        path:'newDocument',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: EditorComponent
            },
            {
                path: ':id',
                component: EditorComponent
            }
        ]
        
    },
    {
        path:'documents',
        canActivate: [AuthGuard],
        component: DocumentsComponent
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        component: Error404Component
    }

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
    
}
