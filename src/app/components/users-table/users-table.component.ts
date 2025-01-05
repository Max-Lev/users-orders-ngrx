import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UsersTableDataSource, EXAMPLE_DATA, UsersTableItem } from './users-table-datasource';
import { User } from 'src/app/app-store/user-entity/user.model';
import { lastValueFrom, map, Observable } from 'rxjs';
import { NgForOf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgForOf, AsyncPipe]
})
export class UsersTableComponent implements AfterViewInit, OnInit, AfterContentInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsersTableItem>;
  // dataSource: User[] = [];
  dataSource = new MatTableDataSource<User>();
  // new UsersTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  // @Input({required:true}) users: Observable<(User | undefined)[]> = new Observable();
  @Input({ required: true }) users: User[] = [];

  ngOnInit(): void {

    this.dataSource.data = this.users;

  }

  ngAfterContentInit() {
    
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}
