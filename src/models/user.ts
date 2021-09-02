import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const pepper: string = process.env.BCRYPT_PASSWORD!;
const saltRounds: string = process.env.SALT_ROUNDS!;

export type User = {
  id?: Number,
  firstname: String,
  lastname: String,
  password: String
}

export type OrderProduct = {
 id?: Number,
 quantity: Number,
 user_id: String,
 order_id: String,
 product_id: String
}

export class UserStore {

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    }
    catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
  const sql = 'DELETE FROM users WHERE id=($1)'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn.query(sql, [id])

  const user = result.rows[0]

  conn.release()

  return user
    } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
}


  async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {

    const sql = 'SELECT * FROM users WHERE firstName=($1) AND lastName=($2)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [firstname, lastname]);

    conn.release();

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user
      }
    }
    return null;
  }

  async addProduct(quantity: number, userId: string, productId: string, orderId: string): Promise<OrderProduct> {
    try {
      const sql = 'INSERT INTO order_products (quantity, user_id, order_id, product_id) VALUES($1, $2, $3, $4) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, userId, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    // try {
      const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
    //   // @ts-ignore
      const conn = await client.connect();
    //   const hash = bcrypt.hashSync(
    //     u.password + pepper,
    //     parseInt(saltRounds)
    //   );

      const result = await conn
        .query(sql, [u.firstname, u.lastname, u.password])

      const user = result.rows[0]

      conn.release()

      return user
    // } catch (err) {
    //   throw new Error(`Could not add new user. Error: ${err}`)
    // }
  }

};