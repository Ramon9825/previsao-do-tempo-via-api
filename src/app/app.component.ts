import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import * as fromHomeActions from './pages/home/state/home.actions'
import * as moment from 'moment';

@Component({
  selector: 'jv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store) {
    moment.locale('pt-br')
  };

  doClear() {
    this.store.dispatch(fromHomeActions.clearHomeState());
  }
}
