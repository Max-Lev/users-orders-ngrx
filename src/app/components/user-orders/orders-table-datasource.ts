import { Orders } from 'src/app/app-store/orders-entity/orders.model';

export interface OrdersData{
  id:number;
  name:string;
  order:number;
  price:number
}

export const DISPLAYED_COLUMNS: string[] = ['id', 'name', 'order', 'price','delete'];
export const ORDERS_DATA:OrdersData[] = [];