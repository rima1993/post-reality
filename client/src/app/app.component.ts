import { Component} from '@angular/core';
// import {AngularFirestore} from 'angularfire2/angularfire2';
// import { AuthGuard } from './auth.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AngularFirestore]
})
export class AppComponent {
  title = 'Post-Reality';
  email: string;
  password: string;
  description = 'Angular-Firebase Demo';
  itemValue = '';
  items: Observable<any[]>;
}

