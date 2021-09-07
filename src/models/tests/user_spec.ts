import { User, UserStore } from "../user";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const pepper: string = process.env.BCRYPT_PASSWORD!;
const saltRounds: string = process.env.SALT_ROUNDS!;

const store = new UserStore();

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'peter',
      lastname: 'staal',
      password: 'peterstaal'
    });
    const check = result.firstname

    expect(check).toEqual('peter');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    const check = result[0].firstname

    expect(check).toEqual('peter');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    const check = result.firstname
  
    expect(check).toEqual('peter');
  });

});