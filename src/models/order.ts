import client from "../database";


export type Order = {
  id?: Number,
  product_id: string,
  quantity: Number,
  user_id: string,
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

  async create(o: Order): Promise<Order> {
    try {
  const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn
      .query(sql, [o.product_id, o.quantity, o.user_id, o.status])

  const order = result.rows[0]

  conn.release()

  return order
    } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`)
    }
}

  async delete(id: string): Promise<Order> {
    try {
  const sql = 'DELETE FROM orders WHERE id=($1)'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn.query(sql, [id])

  const order = result.rows[0]

  conn.release()

  return order
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
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