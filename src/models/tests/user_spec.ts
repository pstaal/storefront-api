import { User, UserStore } from "../user";

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
    expect(result).toEqual({
      id: 1,
      firstname: 'peter',
      lastname: 'staal',
      password: 'peterstaal'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      firstname: 'peter',
      lastname: 'staal',
      password: 'peterstaal'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: 'peter',
      lastname: 'staal',
      password: 'peterstaal'
    });
  });

});