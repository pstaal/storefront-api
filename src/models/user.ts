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