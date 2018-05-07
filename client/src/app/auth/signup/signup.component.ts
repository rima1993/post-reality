import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from './../auth-service.service';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state = '';
  error: any;
  name: string;
  email: string;
  password: string;

  constructor(/* public af: AngularFire, */ private router: Router, public authService: AuthService ) {

  }

  onSubmit(formData) {
    /* if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.router.navigate(['/members'])
      }).catch(
        (err) => {
        this.error = err;
      });
    } */
    if (formData.valid) {
      console.log(formData.value);
      this.authService.register(formData.value.email, formData.value.password, formData.value.name)
      .then((success) => {
        // this.submitted = false;
        // this.messages = [];
        this.router.navigate(['/members']);
      })
      .catch((err) => {
        // this.submitted = false;
        this.error = [err];
      });
    }
  }

  ngOnInit() {
  }

}
