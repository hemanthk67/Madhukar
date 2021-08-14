import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private userPathBase = "users";
  private newUserPathBase = "newuser";
  public userData: any;
  public userOriginalData = [];
  public newUserData;
  public newUserOriginalData = [];
  constructor(private afs: AngularFirestore) {
    this.getUserMarkers().then((data) => {
      this.userData = data.sort((a, b) =>
        a.number > b.number ? 1 : b.number > a.number ? -1 : 0
      );
      this.userOriginalData = this.userOriginalData.sort((a, b) =>
        a.number > b.number ? 1 : b.number > a.number ? -1 : 0
      );
    });
    this.getNewUserMarkers().then((data) => {
      this.newUserData = data.sort((a, b) =>
        a.number > b.number ? 1 : b.number > a.number ? -1 : 0
      );
      this.newUserOriginalData = this.newUserOriginalData.sort((a, b) =>
        a.number > b.number ? 1 : b.number > a.number ? -1 : 0
      );
    });
  }
  async getUserMarkers() {
    var markers = [];
    if (!this.userData) {
      await firebase
        .firestore()
        .collection(this.userPathBase)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            this.userOriginalData.push(doc.data());
            markers.push(doc.data());
            markers[markers.length - 1].flag = true;
          });
        });
    } else {
      markers = this.userData;
    }
    return markers;
  }
  async getNewUserMarkers() {
    var markers = [];
    if (!this.newUserData) {
      await firebase
        .firestore()
        .collection(this.newUserPathBase)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            this.newUserOriginalData.push(doc.data());
            markers.push(doc.data());
            markers[markers.length - 1].flag = true;
          });
        });
    } else {
      markers = this.newUserData;
    }
    return markers;
  }

  approveUser(data) {
    const UserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${data.uid}`
    );
    UserRef.set(data, { merge: true });
    this.deleteFromNewUser(data.uid);
  }
  deleteFromNewUser(id) {
    const newUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `newuser/${id}`
    );
    newUserRef.delete();
  }
  updateUser(data) {
    const UserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${data.uid}`
    );
    UserRef.set(data, { merge: true });
    for (let i = 0; i < this.userData.length; i++) {
      if (data.uid == this.userData[i].uid) {
        this.userData[i] = data;
        break;
      }
    }
  }
}
