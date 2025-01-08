import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { selectedUserId, totalOrderSumSelector } from 'src/app/app-store';

@Component({
  selector: 'app-orders-total-sum',
  templateUrl: './orders-total-sum.component.html',
  styleUrls: ['./orders-total-sum.component.scss'],
  standalone:true,
  imports:[MatListModule, MatDividerModule,NgIf]
})
export class OrdersTotalSumComponent {

  store = inject(Store);

  totalOrderSumSelectorSignal$ = toSignal(this.store.select(totalOrderSumSelector));

  selectedUserIdSignal$ = toSignal(this.store.select(selectedUserId));

}
