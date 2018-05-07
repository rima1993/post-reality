// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { LoginComponent } from './auth/login/login.component';
import { EmailComponent } from './auth/email/email.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './auth/profile/profile.component';
// Services
import { AuthService } from './auth/auth-service.service';
import { AuthGuard } from './auth/auth-guard.service';
import { EditorAppService } from './@editor-engine/editor-app.service';
import { EditorSceneService } from './@editor-engine/editor-scene.service';
import { AssetControllerService } from './@editor-engine/asset-controller.service';
// AngularFire Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyDLYN_CedekfGUg2vIg6EOgYRrHkZn9DYk',
  authDomain: 'postreality-3c88a.firebaseapp.com',
  databaseURL: 'https://postreality-3c88a.firebaseio.com',
  projectId: 'postreality-3c88a',
  storageBucket: 'postreality-3c88a.appspot.com',
  messagingSenderId: '437489177193'
  // apiKey: 'AIzaSyC_ReiJtu2d8ZdOwndR1HUfeyQu3S4k9vY',
  // authDomain: 'angularfire-1b816.firebaseapp.com',
  // databaseURL: 'https://angularfire-1b816.firebaseio.com',
  // projectId: 'angularfire-1b816',
  // storageBucket: '',
  // messagingSenderId: '691087537248'
};

@NgModule({
  declarations: [
    AppComponent,
    PostRealityComponent,
    FileUploadComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    AppRoutingModule
  ],
  providers: [
    EditorAppService,
    EditorSceneService,
    AssetControllerService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
