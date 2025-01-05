import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/app-store/user-entity/user.model';
import { map, Observable } from 'rxjs';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { displayedColumns } from './users-table-datasource';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgForOf, AsyncPipe, NgIf]
})
export class UsersTableComponent implements AfterViewInit, OnInit, AfterContentInit {

  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User[]>;
  @Input({ required: true }) users$!: Observable<User[]>;
  
  
  ngOnInit(): void {

    this.users$.pipe(map((data) => this.dataSource.data = data)).subscribe()

  }

  ngAfterContentInit() {

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}
