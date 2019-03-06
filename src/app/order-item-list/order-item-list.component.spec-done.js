import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderItemListComponent } from "./order-item-list.component";
import { NO_ERRORS_SCHEMA, Component, ViewChild } from "@angular/core";
import { OrderItem } from "../models/order-item.interface";
import { OrderQuantity } from "../models/order-quantity.enum";

@Component({
  selector: "app-test",
  template: `
    <app-order-item-list
      (selectionChange)="onSelectionChange($event)"
    ></app-order-item-list>
  `
})
class TestComponent {
  // We have to use the TestComponent's instance of the OrderItemListComponent!
  @ViewChild(OrderItemListComponent) list: OrderItemListComponent;

  selected: OrderItem[];

  onSelectionChange(orderItems: OrderItem[]) {
    this.selected = orderItems;
  }
}

describe("OrderItemListComponent", () => {
  let testComponent: TestComponent;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemListComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
  });

  it("should create", () => {
    expect(testComponent).toBeTruthy();
  });

  // emits selection change (without TestComponent)
  // it('emits selection change', () => {
  //   const orderItems: OrderItem[] = [{
  //     id: 1,
  //     type: {
  //       id: 0,
  //       name: 'Jelly Donut'
  //     },
  //     quantity: OrderQuantity.Single
  //   }];
  //   component.selectionChange.subscribe((items: OrderItem[]) => {
  //     expect(items).toBe(orderItems);
  //   });
  //   component.selectionChanged(orderItems);
  // });

  // This way ensures that @Output() is on the EventEmitter.
  it("emits on selection change (with TestComponent)", () => {
    const orderItems: OrderItem[] = [
      {
        id: 1,
        type: {
          id: 0,
          name: "Jelly Donut"
        },
        quantity: OrderQuantity.Single
      }
    ];
    testComponent.list.selectionChanged(orderItems);
    expect(testComponent.selected).toBe(orderItems);
  });

  // how would you do items change?
});
