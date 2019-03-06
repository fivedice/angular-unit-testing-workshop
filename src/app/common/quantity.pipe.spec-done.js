import { QuantityPipe } from './quantity.pipe';
import { OrderQuantity } from '../models/order-quantity.enum';

describe('QuantityPipe', () => {
  const pipe = new QuantityPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // can transform OrderQuantity
  it('can transform OrderQuantity', () => {
    expect(pipe.transform(OrderQuantity.Single)).toBe(1);
    expect(pipe.transform(OrderQuantity.HalfDozen)).toBe(6);
    expect(pipe.transform(OrderQuantity.OneDozen)).toBe(12);
    expect(pipe.transform(OrderQuantity.TwoDozen)).toBe(24);
  });

  // returns zero for unknown OrderQuantity
  it('returns zero for unknown OrderQuantity', () => {
    expect(pipe.transform(42)).toBe(0);
  });

  it('returns zero on undefined', () => {
    expect(pipe.transform(undefined)).toBe(0);
  });
});
