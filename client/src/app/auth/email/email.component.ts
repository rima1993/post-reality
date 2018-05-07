import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

    state = '';
    error: any;
    email: string;
    password: string;

    constructor(/* public af: AngularFire, */public authService: AuthService, private router: Router) {
      /* this.af.auth.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      }); */
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/memebers');
      }
  }


  onSubmit(formData) {
    this.authService.signInWithEmail(formData.value.email, formData.value.password)
      .then((success) => {
        console.log(success);
        this.router.navigate(['/members']);
        // this.router.navigate(['/editor']);
      }).catch((err) => {
        console.log(err);
        this.error = err;
      });



    /* if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    } */
  }

  ngOnInit() {
  }

}
