import { AuthService } from './../auth-service.service';
import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(/* public af: AngularFire, */public authService: AuthService, private router: Router ) {

    /*   this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    }); */
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/memebers');
      // this.router.navigateByUrl('/editor');
    }

  }

  loginFb() {
    /* this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      }) */
    this.authService.signInWithFacebook();
  }

  loginGoogle() {
    /* this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      }) */
    this.authService.signInWithGoogle();
  }


  ngOnInit() {
  }

}
