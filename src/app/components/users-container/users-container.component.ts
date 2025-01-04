import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { selectAllUsers } from 'src/app/app-store';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone:true
})
export class UsersContainerComponent {
  // constructor(){
  //   console.log('UsersContainerComponent')
  // }
  // users$: Observable<any[]> = this.store.select(selectAllUsers);

  constructor(private store: Store) {}
}
