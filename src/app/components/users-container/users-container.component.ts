import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable, of, toArray } from 'rxjs';
import { selectAll, selectAllEntities } from 'src/app/app-store';
import { User } from 'src/app/app-store/user-entity/user.model';
import { UsersTableComponent } from '../users-table/users-table.component';
// import { selectAllUsers } from 'src/app/app-store';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone: true,
  imports: [NgForOf, AsyncPipe, UsersTableComponent],

})
export class UsersContainerComponent implements OnInit {

  store = inject(Store);

  users$: Observable<(User)[]> = new Observable();
  // users: User[] = [];
  // s = this.store.select(selectAll).pipe(map((userEntity) => Object.values(userEntity).flat()))
    // .subscribe(v => this.users = v);

  ngOnInit(): void {
    // this.getEntities().then(v => console.log(v))
    this.users$ = this.store.select(selectAll).pipe(map((userEntity) => Object.values(userEntity).flat()));
  }

  // async getEntities(): Promise<any> {
  //   const entities = await firstValueFrom(this.store.select(selectAllEntities));
  //   console.log(entities); // Logs the state.entities
  //   return entities;
  // }




}
