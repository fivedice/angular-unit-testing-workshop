import { QuantityPipe } from './quantity.pipe';

describe('QuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
  });

  // can transform OrderQuantity

  // returns zero for unknown OrderQuantity

  // is the spec-done.js way better?
});
