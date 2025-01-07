import { AfterContentInit, AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/app-store/user-entity/user.model';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { displayedColumns } from './users-table-datasource';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/app-store/user-entity/user-entity.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllEntities as getAllUserEntities } from 'src/app/app-store';
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
export class UsersTableComponent implements AfterViewInit, OnInit, AfterContentInit {

  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<User[]>;

  store = inject(Store);

  constructor() {

    const _users = toSignal(this.store.select(getAllUserEntities))
    effect(() => {
      this.dataSource.data = _users() as User[];
    });

  }

  ngOnInit(): void {
   
  }

  ngAfterContentInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  editUser(user: User) {
    this.store.dispatch(UserActions.selectedUser({ user }));
  }

}


