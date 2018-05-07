import { EditorAppService } from './../@editor-engine/editor-app.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { AssetControllerService } from '../@editor-engine/asset-controller.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  msgs: Message[];
  uploadedFiles: any[] = [];

  constructor(private assetCtrlService: AssetControllerService, private gameService: EditorAppService) {}

  ngOnInit() {}

  onBeforeSend(event) {
    event.xhr.responseType = 'json';
    event.xhr.onload = (ev) => {
      if (event.xhr.response) {
        console.log(event.xhr.response);
        const markerTexUrlList = event.xhr.response;
        console.log(markerTexUrlList.length);
        this.assetCtrlService.AssetController.loadMarkerTextures(markerTexUrlList, this.gameService.App.marker);
      }
    };
  }

  onUpload(event) {
    // for (const file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
    this.uploadedFiles = [];
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
