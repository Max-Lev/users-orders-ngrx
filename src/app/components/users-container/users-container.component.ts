import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable, of, toArray } from 'rxjs';
import { selectAll, selectAllEntities } from 'src/app/app-store';
import { User } from 'src/app/app-store/user-entity/user.model';
import { UsersTableComponent } from '../users-table/users-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone: true,
  imports: [NgForOf, AsyncPipe, UsersTableComponent,
    ReactiveFormsModule,
    MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatIconModule],

})
export class UsersContainerComponent implements OnInit {

  store = inject(Store);
  formBuilder = inject(FormBuilder);
  userForm:FormGroup = this.formBuilder.group({
    userName:new FormControl('',[Validators.required])
  });

  users$: Observable<(User)[]> = new Observable();
  // users: User[] = [];
  // s = this.store.select(selectAll).pipe(map((userEntity) => Object.values(userEntity).flat()))
  // .subscribe(v => this.users = v);

  constructor(){

  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectAll).pipe(map((userEntity) => Object.values(userEntity).flat()));
  }


  editUserHandler(user: User) {
    console.log(user)
    this.userForm.get('userName')?.setValue(user.name);
  }



}
