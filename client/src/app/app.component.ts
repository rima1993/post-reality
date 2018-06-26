import { Component} from '@angular/core';
// import {AngularFirestore} from 'angularfire2/angularfire2';
// import { AuthGuard } from './auth.service'
import { Observable } from 'rxjs/Observable';
import { AuthService } from './core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [AngularFirestore]
})
export class AppComponent {
  title = 'Post-Reality';
  email: string;
  password: string;
  description = 'Post-Reality';
  itemValue = '';
  items: Observable<any[]>;
}

