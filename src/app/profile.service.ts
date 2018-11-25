import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: any;
  constructor() { }

  getProfile() {

  	return this.profile;

  }

  setProfile(profile: any) {
  	this.profile = profile;
  }

}
