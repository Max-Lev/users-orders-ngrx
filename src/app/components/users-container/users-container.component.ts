import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, effect, inject, signal, Signal } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { getUserActionType, selectAllUsersEntities, selectedUser } from 'src/app/app-store';
import { User } from 'src/app/app-store/users-entity/user.model';
import { UsersTableComponent } from '../users-table/users-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserActions } from 'src/app/app-store/users-entity/users-entity.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserOrdersComponent } from '../user-orders/user-orders.component';


@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  standalone: true,
  imports: [NgForOf, AsyncPipe, UsersTableComponent, ReactiveFormsModule,
    NgIf, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule,
    UserOrdersComponent],

})
export class UsersContainerComponent {

  store = inject(Store);

  formBuilder = inject(FormBuilder);

  userForm: FormGroup = this.formBuilder.group({ userName: new FormControl('', [Validators.required, Validators.nullValidator]) });

  selectedUser$: Signal<User | null | undefined> = signal<User | null | undefined>(null);

  actionType$: Signal<string | undefined> = signal<string | undefined>('');

  isUserExists$ = toSignal(this.store.select(selectAllUsersEntities));

  getUserName = ()=>this.userForm.get('userName')?.value;

  constructor() {
    this.selectedUser$ = toSignal(this.store.select(selectedUser));
    this.setUserNameCntrl();
    this.actionType$ = toSignal(this.store.select(getUserActionType));
  }

  setUserNameCntrl() {
    effect(() => this.userForm.get('userName')?.setValue(this.selectedUser$()?.name));
  }

  save() {
    if ( this.userForm.valid && this.selectedUser$() !== null) {

      const user = this.selectedUser$()!;
      const name = this.getUserName();

      const selectedUser: Update<User> = { id: user && user.id, changes: { ...user, name: name } };
      this.store.dispatch(UserActions.updateUser({ user: selectedUser }));
    }
  }

  addUser() {
    if (this.userForm.valid) {
      const name = this.getUserName();
      const _isUserExists = this.isUserExists$()?.some((user) => user && user.name.toLowerCase() === name.toLowerCase());

      if (!_isUserExists) {
        this.store.dispatch(UserActions.addUser({ user: { id: -1, name: name } }));
        this.clearForm();
      }
    }
  }

  clearForm() {
    this.store.dispatch(UserActions.selectedUser({ user: null }));
    this.userForm.get('userName')?.setValue(null);
    this.userForm.updateValueAndValidity();
    this.userForm.reset();
  }


}


