import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-secure-landing',
  templateUrl: './secure-landing.component.html',
  styleUrls: ['./secure-landing.component.css']
})
export class SecureLandingComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  userProfile: any;

  ngOnInit() {
  	this.userProfile = this.profileService.getProfile();
  	console.log('landing page profile. DONE', this.userProfile);
  }

}
