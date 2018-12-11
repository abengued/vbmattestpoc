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
  verfied: any;

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

        if(credential) {
         	this.credential = credential.data.credential[0];
          this.credential = JSON.parse(JSON.stringify(this.credential).replace(/https/gi, "http"));

          console.log(credential);

          this.profileService.setProfile(this.credential);
         } else {
          alert('Unable to login. Please sign up!');
          this.router.navigate(['/register']);
         }

      } finally {

        // console.log('test credential', JSON.stringify(this.credential));
        // console.log('BASE58', this.credential.proof.creator.split(":")[4].split("#")[0]);
        // console.log('DOCUMENT', this.credential.proof.jws);
        // console.log('CREATOR', this.credential.proof.creator);
        this.verifySig(this.credential, this.credential.proof.creator.split(":")[4].split("#")[0], this.credential.proof.creator);

        this.profileService.setProfile(this.credential);

        this.router.navigate(['/vbm']);

      }

  }

   verifySig(signedDocument: any, publicKey: string, publicKeyOwner: string) {
    jsig.verify(signedDocument, function(err, verified) {
        if(err) {
          return err;
          console.log('JSONLD ERROR: ', err);
        }
        this.credential.signatureVerify = verified;
        console.log('credential accessed', this.credential);
      });
  }

  reset() {
      this.done = false;
      this.loading = false;
      this.credential = null;
      this.showCredential = false;
  }


}
