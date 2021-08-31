import { Order, OrderStore } from '../order'

const store = new OrderStore();


describe("Order Model", () => {
  
  it('should have an current order method', () => {
    expect(store.currentOrderUser).toBeDefined();
  });

  it('should have a method that gives a list of completed orders', () => {
    expect(store.completedOrderUser).toBeDefined();
  });




});