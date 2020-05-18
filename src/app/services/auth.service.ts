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
  rightTabs: any;
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
    this.RightTabs();
    
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
      role: { admin: false, finance: false, technical: false ,
      Admin:{ role:false, tecnical:false},
      Tender:{ role:false, tecnical:false},
      Purchase:{ role:false, tecnical:false},
      Production:{ role:false, tecnical:false},
      Accounts:{ role:false, tecnical:false}}
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
  RightTabs() {
    this.rightTabs = [{name:'Upload',
    message: 'Upload and Attatch all documents required for the Tender' },
    {name:'Create Documents',
     sub:[
       {name:'Covering Letter', smallName:'CL'},
     {name:'No-Ban Declaration', smallName:'NBD'},
     {name:'No Deviation', smallName:'ND'} ],
     Flag: false,
     message: 'Create documents in given formates' 
    },
     {name:'Complete Tender',
     message: 'Upload and Attatch all documents required for the Tender' }];
  }
}
