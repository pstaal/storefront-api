import client from "../database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async topFivePopularProducts(): Promise<{id: number, name: string, category: string, volume: number, orders_placed: number}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT p.id, p.name, p.category, SUM(op.quantity) volume,COUNT(op.order_id) orders_placed FROM (products p INNER JOIN orders_products op on p.id=op.product_id) GROUP BY p.id ORDER BY volume DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get top five products: ${err}`)
    } 
  }
}