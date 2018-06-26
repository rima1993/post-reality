import { Injectable, Component } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class UploadService {

  basePath = 'uploads';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<Upload[]>;
  userId: string;
  

  constructor(private db: AngularFireDatabase, private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  

  
   }


  getUploads(): Observable<Upload[]> {
    if(!this.userId) return;
    this.uploads = this.db.list(`${this.basePath}/${this.userId}`).snapshotChanges().switchMap((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch((error) => console.log(error));
  }

  
  

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    if(!this.userId) return;

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${this.userId}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    if(!this.userId) return;
    this.db.list(`${this.basePath}/${this.userId}`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    if(!this.userId) return;
    return this.db.list(`${this.basePath}/${this.userId}`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}/${this.userId}`).delete()
  }
}

