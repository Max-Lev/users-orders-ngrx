import { Component } from '@angular/core';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone:true
})
export class UsersContainerComponent {
  constructor(){
    console.log('UsersContainerComponent')
  }
}
