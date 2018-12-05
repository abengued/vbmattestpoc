import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare function require(name: string);

import { ProfileService } from '../profile.service';

var jsonld = require('jsonld');
import * as jsonld from 'jsonld';
import * as jsig from 'jsonld-signatures';

var jsig = require('jsonld-signatures');
                // setup mock document loader
        var mockDocuments = {
          'did:v1:test:...': {/*the DID document*/},
          'did:v1:test:...#some-key': {/* the key document */}
        };

        var oldLoader = jsonld.documentLoader;
        jsonld.documentLoader = async url => {
          if(url in mockDocuments) {
            return {
              contextUrl: null,
              document: mockDocuments[url],
              documentUrl: url
            };
          }
          return oldLoader(url);
        };



// var dids = require('did-io');
// var VeresOne = require('did-io/lib/methods/veres-one/veres-one');

// var v1 = dids.methods.veres({ mode: 'test' });

var Injector = require('did-io/lib/Injector');
var injector = new Injector();

// var jsonld = injector.use('jsonld');
// var documentLoader = jsonld.documentLoader;

var polyfill = require('credential-handler-polyfill');

// jsonld.documentLoader = async url => {
//   if(url in VeresOne.contexts) {
//     return {
//       contextUrl: null,
//       documentUrl: url,
//       document: VeresOne.contexts[url]
//     };
//   }
//   return documentLoader(url);
// };

injector.use('jsonld', jsonld);
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);
// var eproofs = require('equihash-signature');
// eproofs.install(jsigs);
injector.use('jsonld-signatures', jsig);
injector.env = {nodejs: false};
// v1.injector = injector;

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

  }

  ngOnInit() { 
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

                // this.credential = this.credentialObj(null);

          this.profileService.setProfile(this.credential);

         	// this.verifySig()
         }
      } finally {
        



        console.log('test credential', JSON.stringify(this.credential));
        console.log('BASE58', this.credential.proof.creator.split(":")[4].split("#")[0]);
        console.log('DOCUMENT', this.credential.proof.jws);
        console.log('CREATOR', this.credential.proof.creator);

        console.log('VERIFY:', this.verifySig(this.credential.proof.jws, this.credential.proof.creator.split(":")[4].split("#")[0], this.credential.proof.creator));
        this.profileService.setProfile(this.credential);
        this.router.navigate(['/vbm']);
      }

      this.router.navigate(['/vbm']);

  }

   verifySig(signedDocument: any, publicKey: string, publicKeyOwner: string) {
   
    jsig.verify(signedDocument, {
        publicKey: publicKey,
        publicKeyOwner: publicKeyOwner
      }, function(err, verified) {
        if(err) {
          console.log('VALIDATION FAILED', err);

        }
        console.log('VALIDATION SUCCEEDED', verified);

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
