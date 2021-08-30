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

const showCategory = async (req: Request, res: Response) => {
  const product = await store.productsByCategory(req.params.category);
  res.json(product);
}

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('products/:id', show);
  app.post('/products', create);
  app.get('/products/category/:category', showCategory);
}


export default product_routes;