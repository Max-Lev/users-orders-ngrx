import { AsyncPipe, NgForOf } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { getUserActionType, selectedUser, selectUserOrders } from 'src/app/app-store';
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
    MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule,
    UserOrdersComponent],

})
export class UsersContainerComponent implements OnInit, AfterViewInit {

  store = inject(Store);

  formBuilder = inject(FormBuilder);

  userForm: FormGroup = this.formBuilder.group({ userName: new FormControl('', [Validators.required, Validators.nullValidator]) });

  selectedUserSignal$: Signal<User | null | undefined> = signal<User | null | undefined>(null);
  // selectedUserSignal$$: Signal<string | null | undefined> = signal<string | null | undefined>(null);

  actionType$: Signal<string | undefined> = signal<string | undefined>('');

  constructor() {

    this.selectedUserSignal$ = toSignal(this.store.select(selectedUser));
    this.setUserNameCntrl();
    this.actionType$ = toSignal(this.store.select(getUserActionType));

    // this.selectedUserSignal$$ = toSignal(this.store.select(updatedUser));
    // effect(() => {
    //   console.log(this.selectedUserSignal$$());
    // })

  }

  ngOnInit(): void {
    this.store.select(selectUserOrders).subscribe(s => console.log(s))
  }

  ngAfterViewInit(): void {

  }

  setUserNameCntrl() {
    effect(() => this.userForm.get('userName')?.setValue(this.selectedUserSignal$()?.name));
  }

  save() {
    debugger;
    // this.actionType$() === '[User/API] Selected User' &&
    // UserActions.selectedUser.type
    if (this.actionType$() === UserActions.updateUser.type && this.userForm.valid && this.selectedUserSignal$() !== null) {

      debugger;
      const user = this.selectedUserSignal$()!;

      const name = this.userForm.get('userName')?.value;

      const selectedUser: Update<User> = { id: user.id, changes: { ...user, name: name } };

      this.store.dispatch(UserActions.updateUser({ user: selectedUser }));

      // this.clearForm();


    } 
    else if (this.userForm.valid) {

      debugger;
      const name = this.userForm.get('userName')?.value;

      this.store.dispatch(UserActions.addUser({ user: { id: -1, name: name } }));

      // this.clearForm();

    }

  }

  clearForm() {
    this.store.dispatch(UserActions.selectedUser({ user: null }));
    this.userForm.get('userName')?.setValue(null);
    this.userForm.updateValueAndValidity();
    this.userForm.reset();

  }



}


