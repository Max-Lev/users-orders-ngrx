import { NgIf, NgFor } from '@angular/common';
import { Component, effect, inject, signal, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DISPLAYED_COLUMNS, ORDERS_DATA, OrdersData } from './orders-table-datasource';
import { Store } from '@ngrx/store';
import { selectUserOrders } from 'src/app/app-store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  standalone:true,
  imports: [MatTableModule, NgIf, NgFor],
})
export class UserOrdersComponent {

  displayedColumns: string[] = DISPLAYED_COLUMNS;
  dataSource = ORDERS_DATA;
  clickedRows = new Set<OrdersData>();

  store = inject(Store);
  selectedUserOrdersSignal$:Signal<OrdersData[] | undefined> = signal([]);

  constructor(){

    this.store.select(selectUserOrders).subscribe(v=>console.log(v));

    this.selectedUserOrdersSignal$ = toSignal(this.store.select(selectUserOrders));

    effect(()=>{
      this.dataSource = this.selectedUserOrdersSignal$() as OrdersData[];
    });
    
  }

}
