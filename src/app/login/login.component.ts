import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  credential: any;
  self: any;
  done: boolean;
  constructor() { }

  ngOnInit() {  }

  // this.login() = async () => {
  // 	self = this;
  //   this.loading = true;
  //   try {
  //     this.credential = await navigator.credentials.get({
  //       web: {
  //         VerifiableProfile: {
  //           '@context': {
  //             'br': 'urn:bedrock:',
  //             'cred': 'https://w3id.org/credentials#'
  //           },
  //           'br:test:passport': {'cred:isOptional': true}
  //         }
  //       }
  //     });
  //     console.log('credential received by verifier', this.credential);
  //     if(this.credential) {
  //       this.done = true;
  //     }
  //   } catch(e: any) {
  //     console.error(e);
  //   }
  //   this.loading = false;
  // };
  

}
