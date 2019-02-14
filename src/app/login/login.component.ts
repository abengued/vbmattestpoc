import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as dids from 'did-io';

declare function require(name: string);
import * as jsonld from 'jsonld';
import * as jsig from 'jsonld-signatures';
import { ProfileService } from '../services/profile.service';


var polyfill = require('credential-handler-polyfill');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  credential: any;
  showCredential: boolean;
  done: boolean;
  schema: any;
  v1: any;

  constructor(public router: Router, 
  				public profileService : ProfileService) {
    
  }

  ngOnInit() { 
    this.login();

  }


async login() {

    let navigatorV = (window.navigator as any);
    let credential;


    const MEDIATOR_ORIGIN = 'https://beta.authn.io'

	  let loadPolyfillPromise = polyfill.loadOnce(
  	  MEDIATOR_ORIGIN + '/mediator?origin=' +
  	                       encodeURIComponent(window.location.origin));

      this.loading = true;
      try {
        credential = await navigatorV.credentials.get({
          web: {
            VerifiablePresentation: {
              query: {
                type: 'queryByExample',
                value: {
                  id: '',
                  type: 'voteByMailCredential'
                }
              }
            }
          }
        });
        console.log(credential);

        if(credential) {

         	this.credential = credential.data.credential[0];
         	this.done = true;
          this.profileService.setProfile(this.credential);

         }
      } finally {
        this.router.navigate(['/vbm']);
      }

      this.router.navigate(['/vbm']);

  }

}
