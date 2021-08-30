import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User {
  id: Number,
  firstName: String,
  lastName: String,
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

  async authenticate(firstName: string, lastName: string, password: string): Promise<User | null> {

    const sql = 'SELECT password FROM users WHERE firstName=($1) AND lastName=($2)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [firstName, lastName]);

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
    try {
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn
        .query(sql, [u.firstName, u.lastName, hash])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`)
    }
  }

};