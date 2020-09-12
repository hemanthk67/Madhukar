import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { RoutingService } from 'src/app/services/routing.service';

export interface Organization {
  fullname: string;
  name: string;
}

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  role?: any;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<User>;
 public userData: any;
  OrganizationCollectionRef: AngularFirestoreDocument<Organization>;
  Organization: Observable<Organization>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private zone: NgZone,
    private routingService: RoutingService
  ) {
    
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.login(credential.user, true);
    });
  }

  login(user: any, flag) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(
      `users/${user.uid}`
    );
    userRef.ref
      .get()
      .then(
        function(doc) {
                    this.userData = doc.data();
          if (doc.exists) {
            this.zone.run(() => {
            this.routingService.Login(this.userData, flag);
            });
          } else {
            this.updateUserData(user);
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
        alert("Error: Please Login Again");
      });
  }

  private updateUserData(user) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `newuser/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: { admin: false, finance: false, purchase: false, production: false, tender: false , marketing:false, operation:false,
      Admin:{ role:false, technical:false},
      Tender:{ role:false, technical:false},
      Purchase:{ role:false, technical:false},
      Production:{ role:false, technical:false},
      Finance:{ role:false, technical:false},
      Operation:{ role:false, technical:false},
      Marketing:{ role:false, technical:false}},
    };
    newUserRef.set(data, { merge: true });
    alert("Not a Authorized User - Please contact the administration");
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate([{ outlets: { primary: "Auth", approved: null } }]);
      // this.router.navigate(["/Auth"]);
    });
  }

  // helping functions

}
