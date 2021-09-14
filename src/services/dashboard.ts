import client from "../database";

export type OrderProducts = {
  id?: number,
  name: string,
  category: string,
  volume: number,
  orders_placed: number
};

export class DashboardQueries {
  // Get all products that have been included in orders
  async topFivePopularProducts(): Promise<OrderProducts[]> {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT p.id, p.name, p.category, CAST (SUM(op.quantity) AS INTEGER) volume, CAST(COUNT(op.order_id) AS INTEGER) orders_placed FROM (products p INNER JOIN order_products op on p.id=op.product_id) GROUP BY p.id ORDER BY volume DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get top five products: ${err}`)
    } 
  }
}