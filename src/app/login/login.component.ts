import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {  }

  
async login() {

    let navigatorV = (window.navigator as any);
    let dataV = (window as any);
    let credential;
    console.log(dataV);
      this.loading = true;
      try {
        credential = await navigatorV.credentials.get({
          web: {
            VerifiablePresentation: {
              query: {
                type: 'queryByExample',
                value: {
                  id: '',
                  type: 'ex:FdaInspectioncd'
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
         }
      } finally {
        this.loading = false;

      }
    
 //    const MEDIATOR_ORIGIN = dataV['authorization-io'].baseUri;

	// let loadPolyfillPromise = polyfill.loadOnce(
	//   MEDIATOR_ORIGIN + '/mediator?origin=' +
	//   encodeURIComponent(window.location.origin));

  }



  reset() {
      this.done = false;
      this.loading = false;
      this.credential = null;
      this.showCredential = false;
  }
  

}
