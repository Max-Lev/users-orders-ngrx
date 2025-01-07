import { AsyncPipe, NgForOf } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Dictionary, Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { getUserActionType, selectAll, selectAllEntities, selectedUser, selectedUserId } from 'src/app/app-store';
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

  userForm: FormGroup = this.formBuilder.group({ userName: new FormControl('', [Validators.required, Validators.nullValidator]) });

  selectedUserSignal$: Signal<User | null | undefined> = signal<User | null | undefined>(null);

  actionType$: Signal<string | undefined> = signal<string | undefined>('');

  constructor() {

    this.selectedUserSignal$ = toSignal(this.store.select(selectedUser))
    this.setUserNameCntrl();
    this.actionType$ = toSignal(this.store.select(getUserActionType));

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  setUserNameCntrl() {

    effect(() => this.userForm.get('userName')?.setValue(this.selectedUserSignal$()?.name));
  }

  editUserHandler(user: User) {

  }

  save() {
    // this.actionType$() === '[User/API] Selected User' &&
    if (this.userForm.valid && this.selectedUserSignal$() !== null) {

      const user = this.selectedUserSignal$()!;

      const name = this.userForm.get('userName')?.value;

      const selectedUser: Update<User> = { id: user.id, changes: { ...user, name: name } };

      this.store.dispatch(UserActions.updateUser({ user: selectedUser }));

      this.clearForm();
      

    } else if (this.userForm.valid) {

      const name = this.userForm.get('userName')?.value;

      this.store.dispatch(UserActions.addUser({ user: { id: -1, name: name } }));

      this.clearForm();

    }

  }

  clearForm() {
    this.store.dispatch(UserActions.selectedUser({ user: null }));
    this.userForm.get('userName')?.setValue(null);
    this.userForm.updateValueAndValidity();
    this.userForm.reset();

  }



}


