import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { ThrowStmt } from "@angular/compiler";
import { RoutingService } from './routing.service';

class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
@Injectable({
  providedIn: "root"
})
export class pdfFileService {
  constructor(af: AngularFirestore,
    private routingService: RoutingService) {}
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload, path: any) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef
      .child(path)
      .put(upload.file);
    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log(this.uploadTask.snapshot);
        
          this.routingService.loadingFlag = false;
      }
    );
  }
  downloadPdf( path) {
    const images = firebase.storage().ref();
  const image = images.child(path);
  image.getDownloadURL().then((url) => { 
    window.open(url);});
  }
  savePdf(file: File) {
    const filePath = Date.now().toString();
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef
      .child('test' + "/" + "test.pdf") // change to test to appropriate
      .put(file);
    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log(this.uploadTask.snapshot.metadata.fullPath);
      }
    );
  }
}
