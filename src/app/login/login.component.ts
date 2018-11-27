import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function require(name: string);
// var jsonld = require('jsonld');
import * as jsonld from 'jsonld';
import * as jsig from 'jsonld-signatures';
import { ProfileService } from '../profile.service';
// var jsig = require('jsonld-signatures');
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
  	jsig.use('jsonld', jsonld);

  }

  ngOnInit() { 
  	// jsig.use('jsonld', jsonld);

  	console.log('jsonld', jsonld);
  	console.log('jsig', jsig); 
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
        	console.log("wE MADE IT  to this part");
         	this.credential = credential.data.credential[0];
         	this.done = true;

         	// this.verifySig()
         }
      } finally {
        this.loading = false;

      }
      // need to use a different public key
      let pubkey = "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxRnOWv7MXkWqycjYoRAn\r\nJEpY2T2Mim8FzLV4yWPoNDGwuJv61d8LvRJ9IfNc7/L1S4fw4InyDOBHKFt6fEFH\r\nKp2fSVDJGpVQrAQT+WADQ1qGYOk6iQraVbMPGOklrQAAIhtfWtVCi4BfmLZwV6rO\r\nHvREhqlu/Q+WOpPDXHJo1pGCw4oOMXbmqnH2L4P6duGvlkmJ+Vgg44O3WhRZWEH5\r\nFsQWz5qNmt6hrm479i31hugjQ8iq4dlzWtGv+mGflpmXZvvlpgjghykMsxEyV7GC\r\nLytdKY1BsoP7ZD6+4182WShutuDGKUn4/ypgkUK9EGo6LIwR6xs01jOhdBR/g8jh\r\nxQIDAQAB\r\n-----END PUBLIC KEY-----\r\n";
      // this.credential = this.credentialObj(null);
      console.log('test credential', JSON.stringify(this.credential));
      console.log('VERIFY:', this.verifySig(this.credential.proof.jws, pubkey, this.credential.proof.creator));
      this.profileService.setProfile(this.credential);
      this.router.navigate(['/vbm']);

  }

 verifySig(signedDocument: any, publicKey: string, publicKeyOwner: string) {

	jsig.verify(signedDocument, {
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
  
  credentialObj(cred: any) {
 	// need to add verifiable presentation rather than verifiable credential 	
  	return JSON.parse('{\"@context":[{"@version":1.1},"https://w3id.org/credentials/v1",{"credentialName":"cr:credentialName","credentialDescription":"cr:credentialDescription","stateAuthority":"vbm:stateAuthority","localAuthority":"vbm:localAuthority","precinct":"vbm:precinct","voterRegistrationNumber":"vbm:voterRegistrationNumber","name":"vbm:name","voteByMailRegistration":"vbm:voteByMailRegistration"},"https://w3id.org/security/v2"],"id":"urn:uuid:1111048f-0ecf-4b5b-872c-aaad5222d0ad","type":["VerifiableCredential","voteByMailCredential"],"issuer":"did:v1:test:nym:eJPSftfsFUGUxPGnVecOXhXobK23nBbJ2jhuj75ok-U","issued":"2018-10-01T19:73:24Z","credentialName":"Vote By Mail Access Credential","credentialDescription":"Log in to the USPS Vote by Mail App with this Credential","claim":{"id":"did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok","stateAuthority":"Colorado Secretary of State","localAuthority":"Denver County","precinct":"028","voterRegistrationNumber":"124P5579","name":"Cab Morris","voteByMailRegistration":true},"proof":{"type":"RsaSignature2018","created":"2018-11-20T23:36:28Z","creator":"did:v1:test:nym:eJPSftfsFUGUxPGnVecOXhXobK23nBbJ2jhuj75ok-U#authn-key-1","domain":"http://www.sos.state.co.us/pubs/elections/UOCAVA.html","jws":"eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..objjT3S9qk8fJNiDUNTCGfi1YibK6VdEc_Fl1x4NvFg9YGTevF2ae7msgmDNMzj6vevUxr_mkxE4a5jdIBruDeKkWMper6oVvETX0Htih2qAO8FnYbYEfjO9w7UY8mvNobJVC-q2D_kmgT-f-FGV1RHvwol6X_lNr5zAKWBHeHFF-sVpSaBI2L1KGl0dRKNyZZmVmu0XIou5LMw1UhaWEVqOnWeooFOtRITEQIEAYjuPHKYD9_l4Z5H0kYcYwMzpTa0GoGl1w3NKBGXbDdS5oxOLeDvbfeD21d19XPaXt9mNyQHH-UWm9xOJoYVvt0QiqPPBgBZIuJVTg2Mi12d4Ug","nonce":"9dc7fd85"}}');
  }



}
