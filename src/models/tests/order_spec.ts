
import { Order, OrderStore } from '../order'
import { Product, ProductStore } from '../product';
import { User, UserStore } from '../user';
import client from '../../database'

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
    orderstore.create({product_id: "2", quantity: 1, user_id: "1", status: "active"});
  });

  afterAll( async function() {
    const conn = await client.connect();
    const sql =
      'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });

  
  it('should have an current order method', () => {
    expect(orderstore.currentOrderUser).toBeDefined();
  });

  it('should return the current orders of this user', async () => {
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

  it('should return all the completed orders of this user', async () => {
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