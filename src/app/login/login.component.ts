import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function require(name: string);

import { ProfileService } from '../services/profile.service';
import { MocdocService } from '../services/mocdoc.service';

var jsonld = require('jsonld');
import * as jsonld from 'jsonld';
import * as jsig from 'jsonld-signatures';

  var jsig = require('jsonld-signatures');



var polyfill = require('credential-handler-polyfill');


var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

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
  mockDocuments: any;




  constructor(public router: Router,
  				public profileService : ProfileService, public mocdocService : MocdocService) {

          var mockDocuments = mocdocService.getMocDoc();

          console.log("MOCK DID DOCUMENT", mockDocuments);

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

          this.profileService.setProfile(this.credential);

         }
      } finally {




        console.log('test credential', JSON.stringify(this.credential));
        console.log('BASE58', this.credential.proof.creator.split(":")[4].split("#")[0]);
        console.log('DOCUMENT', this.credential.proof.jws);
        console.log('CREATOR', this.credential.proof.creator);
        let verificationResult = this.verifySig(this.credential, this.credential.proof.creator.split(":")[4].split("#")[0], this.credential.proof.creator);

        console.log('VERIFY:', verificationResult);

        this.credential.verified = verificationResult;
        this.profileService.setProfile(this.credential);
        this.router.navigate(['/vbm']);

      }

      this.router.navigate(['/vbm']);

  }

   verifySig(signedDocument: any, publicKey: string, publicKeyOwner: string) {

    jsig.verify(signedDocument, function(err, verified) {
        console.log(JSON.stringify(signedDocument, null, 2));
        if(err) {
          return err;
          console.log('JSONLD ERROR: ', err);
        }
        if(verified == true) {
          console.log('VALIDATION SUCCEEDED', verified);

        } else {
          console.log('VALIDATION FAILED', verified);
        }
      });
  }

  reset() {
      this.done = false;
      this.loading = false;
      this.credential = null;
      this.showCredential = false;
  }


}
