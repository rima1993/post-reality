import { Component } from '@angular/core';

import { UploadService } from '../shared/upload.service';

import { Upload } from '../shared/upload';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})

export class UploadFormComponent {

  selectedFiles: FileList | null;
  
  currentUpload: Upload;
  localUrl: any;

  constructor(private upSvc: UploadService) { }

  detectFiles($event: Event) {
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



  /*showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }*/
  
  uploadImage(event: any) {
    const files = this.selectedFiles;
    if (!files || files.length === 0 ) {
      console.error('No Files found!');
      return;
    }
    
    Array.from(files).forEach((file) => {
  
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload);
      
    });
  }
  /*uploadImage() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }*/
}
