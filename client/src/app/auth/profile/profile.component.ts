import { Component, OnInit } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@moveIn]': ''}
})
export class ProfileComponent implements OnInit {
  name: string;
  state = '';

  constructor(/* public af: AngularFire, */public authService: AuthService,  private router: Router) {

    /* this.authService.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    }); */
    if (this.authService.isLoggedIn()) {
      this.name = this.authService.getName();
    }

  }

  logout() {
    this.authService.logout();
    // this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }
}
