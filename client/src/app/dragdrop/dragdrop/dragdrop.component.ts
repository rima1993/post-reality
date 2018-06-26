import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { AssetControllerService } from '../../@editor-engine/asset-controller.service';
import { EditorAppService } from '../../@editor-engine/editor-app.service';
import { HttpClient } from '@angular/common/http';
import { APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Test } from './Test';

import { Key } from 'protractor';
import { Upload } from '../../uploads/shared/upload';
import { METHODS } from 'http';

@Component({
  selector: 'dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.scss']
})
export class FiledragdropComponent {

  basePath = 'tests';
  //uploadsRef: AngularFireList<Test>;
  tests: Observable<Test[]>;
  userId: string;
  showSpinner = true;
  selectedFiles: FileList | null;
  localUrl: any;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  constructor(private storage: AngularFireStorage,private dbs: AngularFireDatabase, private db: AngularFirestore, private afauth:AngularFireAuth, private gameService: EditorAppService) { 

  this.afauth.authState.subscribe(user => {
    if(user) this.userId = user.uid
  })
}
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

 //trying to implement database in firebase for upload markers
  getAllUploads(): Observable<Test[]> {
    if(!this.userId) return;
    //this.tests = this.db.collection
    this.tests = this.dbs.list(`${this.basePath}`).snapshotChanges().switchMap((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.tests;
  }
  
//upload file and save in firebase storage
  startUpload(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') { 
      console.error('File not supported')
      return;
    }

    const path = `test/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);
    
    
    const customMetadata = { app: 'File-upload' };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    //send marker to vuforia
    const xhttp = new XMLHttpRequest();
    const form = new FormData();
    const filename = "markerTester";
    form.append("marker", file, filename);
    xhttp.responseType = 'json';
    console.log("something to print");

    xhttp.open("POST","http://localhost:3003/api/vuforia/upload_marker",true);
    xhttp.onload = (ev) => {

        console.log("to vuforia");
  
    }
    xhttp.send(form);

      // show the processing image
        // once done
          // make api call to vuforia to get rating of the marker (use the target_id)
            // once done: show the marker page with the new rating (marker selection page)

    //}

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
        tap(snap => {
            if (snap.bytesTransferred === snap.totalBytes) {
              // Update firestore on completion
              this.dbs.list(`photos`).push( { path, size: snap.totalBytes })
              //this.db.collection().add()
            }
          })
    )
    
    // The file's download URL
    //this.downloadURL = this.task.downloadURL(); 
    this.downloadURL = ref.getDownloadURL();
  }
  
  saveFileaData(test: Test) {
    if(!this.userId) return;
    this.dbs.list(`${this.basePath}/${this.userId}`).push(test);
  }

//detect files to display list of markers to user
  detectFile($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
      this.localUrl = [];
      let files = event.target.addEventListener.arguments;
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.localUrl.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
}
  

  // Determines if the upload task is active
  isActive(snapshot) {
    this.tests = this.getAllUploads();
    this.tests.subscribe(() => this.showSpinner= false);
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  
}