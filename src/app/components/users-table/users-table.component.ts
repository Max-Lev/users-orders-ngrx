import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/app-store/user-entity/user.model';
import { map, Observable } from 'rxjs';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { displayedColumns } from './users-table-datasource';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
  providers: [
    
  ],
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule, MatSortModule, NgForOf, AsyncPipe, NgIf,
    MatIconModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])],

})
export class UsersTableComponent implements AfterViewInit, OnInit, AfterContentInit {

  displayedColumns = displayedColumns;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User[]>;
  @Input({ required: true }) users$!: Observable<User[]>;

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any;

  @Output() editUserEmitter = new EventEmitter<User>();

  ngOnInit(): void {

    this.users$.pipe(map((data) => this.dataSource.data = data)).subscribe()

  }

  ngAfterContentInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  editUser(user:User){
console.log(user)
this.editUserEmitter.emit(user);
  }

}
