import { Component, effect, inject, signal, Signal, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/app-store/users-entity/user.model';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { displayedColumns } from './users-table-datasource';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/app-store/users-entity/users-entity.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { Update } from '@ngrx/entity';
import { selectAllUsersEntities, selectUserOrders } from 'src/app/app-store';
import { OrdersActions } from 'src/app/app-store/orders-entity/orders.actions';
import { OrdersData } from '../user-orders/orders-table-datasource';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
  providers: [

  ],
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, NgForOf, AsyncPipe, NgIf,
    MatIconModule
  ],
})
export class UsersTableComponent {

  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<User[]>;

  store = inject(Store);

  selectedUserOrders$ = toSignal(this.store.select(selectUserOrders));

  constructor() {
    const _users$ = toSignal(this.store.select(selectAllUsersEntities))
    effect(() => this.dataSource.data = _users$() as User[]);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(user: User) {
    const selectedUser: Update<User> = { id: user.id, changes: { ...user, name: user.name } };
    this.store.dispatch(UserActions.updateUser({ user: selectedUser }));
  }

  deleteUser(user: User) {

    this.store.dispatch(UserActions.deleteUser({ id: user.id }));

    const list: string[] = this.selectedUserOrders$()?.map(((order: OrdersData) => `${order.order}`))!;

    this.store.dispatch(OrdersActions.deleteOrders({ ids: list }));

  }

  selectedUser(user: User) {
    this.store.dispatch(UserActions.selectedUser({ user }));
  }


}


