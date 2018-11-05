import { Component, OnInit } from '@angular/core';
// import {FirebaseUIModule} from 'firebaseui-angular';
// import {AngularFireModule} from '@angular/fire';
// import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
// import * as firebaseui from 'firebaseui';

import {FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {FirebaseUISignInFailure} from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('Successful Login', signInSuccessData);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('Login failed');
  }

}
