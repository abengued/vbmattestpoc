import { NgModule } from '@angular/core';




import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SecureLandingComponent} from './secure-landing/secure-landing.component';

const routes: Routes = [
    {
        path: '', component: LoginComponent,
    },

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'vbm', component: SecureLandingComponent}
        
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
