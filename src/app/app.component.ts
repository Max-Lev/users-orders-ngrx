import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllEntities } from './app-store';
import { Dictionary } from '@ngrx/entity';
import { User } from './app-store/users-entity/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'users-state';

  store = inject(Store);

  ngOnInit(): void {
    
    this.store.subscribe(s=>{
      // console.log(s);
    });

    // this.store.select(selectAllEntities).subscribe((s:Dictionary<User>)=>{
    //   // console.log(s)
    // })

   }

}
