import { Product, ProductStore } from "../product";

const store = new ProductStore();


describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a products by category method', () => {
    expect(store.productsByCategory).toBeDefined();
  });


  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'chair',
      price: 250,
      category: 'furniture'
    });
    expect(result).toEqual({
      id: 1,
      name: 'chair',
      price: 250,
      category: 'furniture'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      name: 'chair',
      price: 250,
      category: 'furniture'
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: 'chair',
      price: 250,
      category: 'furniture'
    });
  });

  it('products by catagory method should return the list of products in that category', async () => {
    const result = await store.productsByCategory("Furniture");
    expect(result).toEqual([{
      id: 1,
      name: 'chair',
      price: 250,
      category: 'furniture'
    }]);
  });

});