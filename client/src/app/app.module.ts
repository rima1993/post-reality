// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// PrimeNG Modules
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { GrowlModule } from 'primeng/growl';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
// Components
import { AppComponent } from './app.component';
import { PostRealityComponent } from './pages/post_reality_editor/post-reality.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

// Services
import { EditorAppService } from './@editor-engine/editor-app.service';
import { EditorSceneService } from './@editor-engine/editor-scene.service';
import { AssetControllerService } from './@editor-engine/asset-controller.service';
// AngularFire Modules
import { AngularFireModule, FirebaseOptionsToken, FirebaseAppNameToken, FirebaseAppConfigToken } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
//import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module';


// File Modules
//import { ItemModule } from './items/shared/item.module';
import { UploadModule } from './uploads/shared/upload.module';
import { UiModule } from './ui/shared/ui.module';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { Profile } from 'selenium-webdriver/firefox';
//import { UploadDragComponent } from './pages/dragdrop/dragdrop.component';
import { FileDropModule } from 'ngx-file-drop';
//import { DragdropFormComponent } from './pages/dragdrop/dragdrop.component';
//import { DragdropService } from './pages/dragdrop/dragdrop.service';
//import { FiledragdropComponent } from './pages/dragdrop/dragdrop.component';
//import { DropZoneDirective } from './drop-zone.directive';
//import { FiledragdropComponent } from './dragdrop/dragdrop.component';
//import { FileSizePipe } from './file-size.pipe';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { FiledragdropComponent } from './dragdrop/dragdrop/dragdrop.component';
import { FileSizePipe } from './dragdrop/filesize.directive';
import { DropZoneDirective } from './dragdrop/dropzone.directive';
import { config } from 'rxjs';


const firebaseConfig = {
  //apiKey: 'AIzaSyDLYN_CedekfGUg2vIg6EOgYRrHkZn9DYk',
  //authDomain: 'postreality-3c88a.firebaseapp.com',
  //databaseURL: 'https://postreality-3c88a.firebaseio.com',
  //projectId: 'postreality-3c88a',
  //storageBucket: 'postreality-3c88a.appspot.com',
  //messagingSenderId: '437489177193'
  apiKey: "AIzaSyC_ReiJtu2d8ZdOwndR1HUfeyQu3S4k9vY",
  authDomain: "angularfire-1b816.firebaseapp.com",
  databaseURL: "https://angularfire-1b816.firebaseio.com",
  projectId: "angularfire-1b816",
  storageBucket: "angularfire-1b816.appspot.com",
  messagingSenderId: "691087537248"
};

@NgModule({
  declarations: [
    AppComponent,
    PostRealityComponent,
    FileUploadComponent,
    PageNotFoundComponent,
    FiledragdropComponent,
    DropZoneDirective,
    FileSizePipe,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    FileUploadModule,
    GrowlModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    //ItemModule,
    UiModule,
    FileDropModule,
    AngularFireStorageModule,
    

    
  ],
  providers: [
    EditorAppService,
    EditorSceneService,
    AssetControllerService,
    AngularFirestore,
    AngularFireAuth,
    AngularFireStorage,
    { provide: FirebaseOptionsToken, useValue: firebaseConfig },
    { provide: FirebaseAppNameToken, useValue: 'stalldata' },
    { provide: FirebaseAppConfigToken, useValue: undefined }
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
