import { DashboardQueries, OrderProducts } from "../dashboard";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";
import { OrderStore } from "../../models/order";
import client from '../../database'

const dashboard = new DashboardQueries();
const orderstore = new OrderStore();
const productstore = new ProductStore();
const userstore = new UserStore();

describe("Dashboard methods", () => {

  beforeAll(async function() {
    await userstore.create({firstname: "peter", lastname: "staal", password: "test"});
    await userstore.create({firstname: "wietske", lastname: "de lange", password: "test2"});
    await userstore.create({firstname: "joppe", lastname: "staal", password: "test3"});
    await userstore.create({firstname: "noud", lastname: "staal", password: "test4"});
    await productstore.create({name: "chair", price: 25, category: "furniture"});
    await productstore.create({name: "table", price: 50, category: "furniture"});
    await productstore.create({name: "computer", price: 1000, category: "technology"});
    await productstore.create({name: "smartphone", price: 800, category: "technology"});
    await orderstore.create({product_id: '1', quantity: 5, user_id: '1', status: 'complete'});
    await orderstore.create({product_id: '2', quantity: 1, user_id: '1', status: 'active'});
    await orderstore.create({product_id: '3', quantity: 1, user_id: '2', status: 'complete'});
    await orderstore.create({product_id: '4', quantity: 10, user_id: '3', status: 'complete'});
    await orderstore.create({product_id: '1', quantity: 12, user_id: '1', status: 'complete'});
    await orderstore.create({product_id: '2', quantity: 1, user_id: '4', status: 'complete'});
    await userstore.addProduct( 5, '1', '1', '1');
    await userstore.addProduct( 1, '1', '2', '2');
    await userstore.addProduct( 1, '2', '3', '3');
    await userstore.addProduct( 10, '3', '4', '4');
    await userstore.addProduct( 12, '1', '1', '5');
    await userstore.addProduct( 1, '4', '2', '6');
  });

  afterAll( async function() {
    const conn = await client.connect();
    const sql = 'DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1; DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM products;  ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });

  
  it('should have an top five products method', () => {
    expect(dashboard.topFivePopularProducts).toBeDefined();
  });

  it('should return a top five most popular products', async () => {
    const result = await dashboard.topFivePopularProducts();
    expect(result).toEqual([
      {id: 1, 
      name: 'chair', 
      category: 'furniture', 
      volume: 17, 
      orders_placed: 2},
      {id: 4, 
      name: 'computer', 
      category: 'technology', 
      volume: 10, 
      orders_placed: 1},
      {id: 2, 
      name: 'chair', 
      category: 'furniture', 
      volume: 2, 
      orders_placed: 2},
      {id: 3, 
      name: 'table', 
      category: 'furniture', 
      volume: 1, 
      orders_placed: 1}
     ]);
  });


});

