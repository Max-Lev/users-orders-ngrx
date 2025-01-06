import { AsyncPipe, NgForOf } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable, of, toArray } from 'rxjs';
import { selectAll, selectAllEntities, selectedUser, selectedUserId } from 'src/app/app-store';
import { User } from 'src/app/app-store/user-entity/user.model';
import { UsersTableComponent } from '../users-table/users-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserActions } from 'src/app/app-store/user-entity/user-entity.actions';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone: true,
  imports: [NgForOf, AsyncPipe, UsersTableComponent,
    ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule],

})
export class UsersContainerComponent implements OnInit, AfterViewInit {

  store = inject(Store);

  formBuilder = inject(FormBuilder);

  userForm: FormGroup = this.formBuilder.group({ userName: new FormControl('', [Validators.required]) });

  users$: Observable<(User)[]> = of([]);

  selectedUserSignal$: Signal<User | null | undefined> = signal<User | null | undefined>(undefined);

  constructor() {

    this.selectedUserSignal$ = toSignal(this.store.select(selectedUser))
    this.setUserNameCntrl();

  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectAll).pipe(map((userEntity) => Object.values(userEntity).flat()));
  }

  ngAfterViewInit(): void {

    // this.store.dispatch(UserActions.selectedUser({user}))
    // this.store.select(selectedUser).pipe(
    //   map((selectedUser) => {
    //     console.log('selectedUser ', selectedUser);
    //     return selectedUser;
    //   })
    // );

  }

  setUserNameCntrl() {
    effect(() => this.userForm.get('userName')?.setValue(this.selectedUserSignal$()?.name));
  }

  editUserHandler(user: User) {

  }



}


