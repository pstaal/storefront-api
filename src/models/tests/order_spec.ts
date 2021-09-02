
import { Order, OrderStore } from '../order'
import { Product, ProductStore } from '../product';
import { User, UserStore } from '../user';

const orderstore = new OrderStore();
const userstore = new UserStore();
const productstore = new ProductStore();


describe("Order Model", () => {

  beforeAll(function() {
    userstore.create({firstname: "peter", lastname: "staal", password: "test"});
    userstore.create({firstname: "wietske", lastname: "de lange", password: "test2"});
    productstore.create({name: "chair", price: 25, category: "furniture"});
    productstore.create({name: "table", price: 50, category: "furniture"});
    orderstore.create({product_id: "1", quantity: 5, user_id: "1", status: "complete"});
    orderstore.create({product_id: "2", quantity: 1, user_id: "1", status: "active"};)
  });

  afterAll(function() {
   userstore.delete("1");
   userstore.delete("2");
   productstore.delete("1");
   productstore.delete("2");
   orderstore.delete("1");
   orderstore.delete("2");
  });

  
  it('should have an current order method', () => {
    expect(orderstore.currentOrderUser).toBeDefined();
  });

  it('should return the current orders of this user', () => {
    const result = await orderstore.currentOrderUser("1");
    expect(result).toEqual({
      id: 2,
      product_id: '2',
      quantity: 1,
      user_id: "1",
      status: 'active'
    });
  });

  it('should have a method that gives a list of completed orders', () => {
    expect(orderstore.completedOrderUser).toBeDefined();
  });

  it('should return all the completed orders of this user', () => {
    const result = await orderstore.completedOrderUser("1");
    expect(result).toEqual([{
      id: 1,
      product_id: '1',
      quantity: 5,
      user_id: "1",
      status: 'complete'
    }]);
  });


});