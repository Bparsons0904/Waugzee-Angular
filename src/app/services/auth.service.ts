import { of as observableOf, Observable } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// User Profile Addin
import { Router } from '@angular/router';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
// import { firebase } from '@firebase/app';
import * as firebaseaf from 'firebase/app';
import { firebase } from '@firebase/app';
import '@firebase/auth';

// import { FlashMessagesService } from 'angular2-flash-messages';
// import { NotifyService } from './notify.service';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  uid: string;
  test: string;
  authState; any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    // private flashMessage: FlashMessagesService,
    // private notify: NotifyService,
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return observableOf(null);
        }
      }));

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
   }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getAuthID() {
    return this.authState.uid;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  setId(uid: string) {
    this.uid = uid;
  }

  getId() {
    return this.uid;
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    this.setId(user.uid);

    if (user.displayName != null) {
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName,
        workshops: [null, null, null],
      };
      return userRef.set(data, { merge: true });
    } else {
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        workshops: [null, null, null],
      };
      return userRef.set(data, { merge: true });
    }
  }
}
