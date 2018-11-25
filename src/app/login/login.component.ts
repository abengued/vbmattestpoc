import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function require(name: string);
// var jsonld = require('jsonld');
import * as jsonld from 'jsonld';
import * as jsonldSig from 'jsonld-signatures';
import { ProfileService } from '../profile.service';
// var jsonldSig = require('jsonld-signatures');
// var dids = require('did-io');


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


  constructor(public router: Router, 
  				public profileService : ProfileService) {
  	jsonldSig.use('jsonld', jsonld);

  }

  ngOnInit() { 
  	jsonldSig.use('jsonld', jsonld);

  	console.log('jsonld', jsonld);
  	console.log('jsonldSig', jsonldSig); 
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
                  type: 'ex:FdaInspection'
                }
              }
            }
          }
        });
        console.log(credential);

        if(credential) {
        	console.log("wE MADE IT  to this part");
         	this.credential = credential.data.credential[0];
         	this.done = true;

         	// this.verifySig()
         }
      } finally {
        this.loading = false;

      }

      this.profileService.setProfile(this.credential);
      this.router.navigate(['/vbm']);


  }

 verifySig(signedDocument: any, publicKey: string, publicKeyOwner: string) {

	jsonldSig.verify(signedDocument, {
	    publicKey: publicKey,
	    publicKeyOwner: publicKeyOwner,
	  }, function(err, verified) {
	    if(err) {
	      return console.log('Signature verification error:', err);
	    }
	    console.log('Signature is valid:', verified);
	  });

}
 

  reset() {
      this.done = false;
      this.loading = false;
      this.credential = null;
      this.showCredential = false;
  }
  

}
