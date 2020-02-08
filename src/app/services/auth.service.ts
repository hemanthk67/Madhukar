import { Injectable } from "@angular/core";
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
  OrganizationCollectionRef: AngularFirestoreDocument<Organization>;
  Organization: Observable<Organization>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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
  getOrganizations() {
    console.log("test");
    this.OrganizationCollectionRef = this.afs.doc<Organization>(
      "organizations/All"
    );
    console.log("test");
    this.Organization = this.OrganizationCollectionRef.valueChanges();
    return this.Organization;
  }
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `newuser/${user.uid}`
    );
    console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: { admin: false, finance: false, technical: false }
    };
    userRef.ref
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          newUserRef.set(data, { merge: true });
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }

  testing(flag: any) {
    if (flag) {
      this.router.navigate([{ outlets: { approved: "Tender/newtender" } }]);
    } else {
      this.router.navigate([{ outlets: { approved: "Tender" } }]);
    }
  }
}
