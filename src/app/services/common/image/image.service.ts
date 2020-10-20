import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  
  getImageUrl(path: any): Promise<any> {
    const images = firebase.storage().ref();
  const image = images.child(path);
  // image.getDownloadURL().then((url) => { 
  //   return url;});
    
  // }
  return image.getDownloadURL(); 
  }
}
