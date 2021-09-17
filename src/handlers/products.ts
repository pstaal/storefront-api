import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

const store = new ProductStore();

dotenv.config();

const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
}

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
}

const create = async (req: Request, res: Response) => {

  try {
    const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret;
    //const authorizationHeader = req.headers.authorization
    const authorizationHeader = (req.headers.authorization as unknown) as string;
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, TOKEN_SECRET)
} catch(err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
}


  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    }

    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const showCategory = async (req: Request, res: Response) => {
  const product = await store.productsByCategory(req.params.category);
  res.json(product);
}

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('products/:id', show);
  app.post('/products', create);
  app.get('/products/category/:category', showCategory);
  app.delete('/products/:id', destroy);
}


export default product_routes;