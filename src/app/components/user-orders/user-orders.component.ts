import { NgIf, NgFor } from '@angular/common';
import { Component, inject, Signal, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectUserOrders } from 'src/app/app-store';
import { OrdersActions } from 'src/app/app-store/orders-entity/orders.actions';
import { OrdersTotalSumComponent } from '../orders-total-sum/orders-total-sum.component';
import { DISPLAYED_COLUMNS, ORDERS_DATA, OrdersData } from './orders-table-datasource';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  standalone:true,
  imports: [MatTableModule, NgIf, NgFor,OrdersTotalSumComponent,MatButtonModule],
})
export class UserOrdersComponent {

  displayedColumns: string[] = DISPLAYED_COLUMNS;
  dataSource = ORDERS_DATA;
  clickedRows = new Set<OrdersData>();

  store = inject(Store);
  
  selectedUserOrdersSignal$:Signal<OrdersData[] | undefined> = signal([]);
  
  constructor(){
    this.selectedUserOrdersSignal$ = toSignal(this.store.select(selectUserOrders));
    effect(()=>this.dataSource = this.selectedUserOrdersSignal$() as OrdersData[]);
  }

  deleteOrder(order:OrdersData){
    this.store.dispatch(OrdersActions.deleteOrder({id:order.order}));
  }

}
