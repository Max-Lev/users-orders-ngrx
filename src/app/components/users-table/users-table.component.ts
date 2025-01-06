import { AfterContentInit, AfterViewInit, Component, computed, effect, EventEmitter, inject, Input, OnChanges, OnInit, Output, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/app-store/user-entity/user.model';
import { map, Observable } from 'rxjs';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { displayedColumns } from './users-table-datasource';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0' })),
  //     state('expanded', style({ height: '*' })),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ])],

})
export class UsersTableComponent implements AfterViewInit, OnInit, AfterContentInit, OnChanges {

  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<User[]>;

  // @Input({ required: true }) users$!: Observable<User[]>;

  store = inject(Store);

  constructor() {

    const _users = toSignal(this.store.select(getAllUserEntities))

    console.log(_users())
    this.dataSource.data = _users() as User[];
  }

  ngOnInit(): void {

    // this.users$.pipe(map((data) => this.dataSource.data = data)).subscribe()

  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.label = computed(() => toSignal(this.users$)); 
  }


  ngAfterContentInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  editUser(user: User) {
    this.store.dispatch(UserActions.selectedUser({ user }));
    // this.editUserEmitter.emit(user);
  }

}


