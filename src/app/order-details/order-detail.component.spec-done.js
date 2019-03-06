import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from '../order/order.service';
import { Subject } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  // service
  // params
  let subject: Subject<Params>;
  let orderService: OrderService;
  // let getOrderSpy;

  beforeEach(async(() => {
    // This is the mock for ActivatedRoute.Params
    subject = new Subject<Params>();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        OrderService,
        {
          provide: ActivatedRoute,
          useValue: { params: subject } // Here is where we provide the mock
        }
      ],
      declarations: [OrderDetailComponent],
      // isolate
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService);
    // getOrderSpy = spyOn(orderService, 'getOrder').and.callFake...
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should be blank by default
  it('should be blank by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toBe('Items:\nName:\nStatus:');
  });

  // can respond to new route params
  it('responds to router params changing', () => {
    const spy = spyOn(orderService, 'getOrder');
    fixture.detectChanges();
    subject.next({
      id: 42
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(42);
    subject.next({
      id: 1
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
