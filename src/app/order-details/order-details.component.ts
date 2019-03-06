import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {


  constructor(private router: Router) { }

  onSelectionChanged(orders: Order[]) {
    if (orders.length > 0) {
      this.router.navigate(['orderdetails', orders[0].id]);
    } else {
      this.router.navigate(['orderdetails']);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
