import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {DataTableModule} from "angular-6-datatable";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecureLandingComponent } from './secure-landing/secure-landing.component';
import * as polyfill from 'credential-handler-polyfill';
import { AutoGeneratedComponent } from './auto-generated/auto-generated.component';
// import * as didIO  from 'did-io';
// import * as jsonLD  from 'jsonld';
// import * as jsonLDSignatures  from 'jsonld-signatures';
// import * as bedrock from 'bedrock-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SecureLandingComponent,
    AutoGeneratedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule
    
  ],
  providers: [
    // polyfill,
    // didIO
    // jsonLD,
    // jsonLDSignatures,
    // bedrock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  ngOnInit() {
    
  }

}
