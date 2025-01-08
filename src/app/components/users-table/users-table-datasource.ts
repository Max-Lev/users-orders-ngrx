import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from 'src/app/app-store/users-entity/user.model';

/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
export const displayedColumns = ['id', 'name','edit','delete'];

export const EXAMPLE_DATA: User[] = [];


