import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-secure-landing',
  templateUrl: './secure-landing.component.html',
  styleUrls: ['./secure-landing.component.css']
})
export class SecureLandingComponent implements OnInit {
	user: any;
	userProperties: any;
  
  constructor(public profileService: ProfileService, public router: Router) { }



  ngOnInit() {
  	try {
	  	this.user = this.profileService.getProfile().claim;
  	} finally {
		if(!this.user) {
			alert('User Not Authenticated. Please login!');
	        this.router.navigate(['/login']);
	        return;
	  	} else {
	  		  	console.log('USER' , this.user);
	  	}
  	}

	this.userProperties = [];
	let i = 0;
	let k;
  	for (k in this.user) {

  		console.log('iterate', k);
  		this.userProperties.push(
  			{
  				"name"  : k,
  				"value" : this.user[k]
  			});
  		i++;

	}
	console.log('landing page profile. DONE', this.userProperties);
  }

}
