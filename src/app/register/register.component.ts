import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {	

  constructor() {}
  
  ngOnInit() {
  }
  // TBD iframe or browser - how to close
  register() {
  	window.location.href = 'https://wallet.attest.network/vbm-registration';
  }

}