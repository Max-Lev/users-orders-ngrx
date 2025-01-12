import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Orders } from '../app-store/orders-entity/orders.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  readonly http = inject(HttpClient);

  getOrders$() :Observable<Orders[]>{
    return this.http.get<Orders[]>(environment.getOrdersApi);
  }
}
