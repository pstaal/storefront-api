import client from "../database";


export type Order {
  id: Number,
  product_id: Number,
  quantity: Number,
  user_id: Number,
  status: String
};

export class OrderStore {

  async currentOrderUser(user_id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status="active"'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find an order for user with id ${user_id}. Error: ${err}`)
    }
  }

  async completedOrderUser(user_id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status="complete"'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find any completed orders for user with id ${user_id}. Error: ${err}`)
    }
  }

};