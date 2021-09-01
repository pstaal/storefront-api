import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const store = new UserStore();

dotenv.config();


const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  const users = await store.index();
  res.json(users);
}

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  const user = await store.show(req.params.id);
  res.json(user);
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const u = await store.authenticate(req.body.firstName, req.body.lastName, req.body.password)
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const create = async (req: Request, res: Response) => {

  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }

    const newUser = await store.create(user)
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.orderID
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)
  const userId: string =_req.params.userID

  try {
    const addedProduct = await store.addProduct(quantity, userId, orderId, productId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('users/:id', show);
  app.post('/users', create);
  app.post('/authenticate', authenticate);
  app.post('/users/:userID/orders/:orderID/products', addProduct);
  app.delete('/users/:id', destroy);
}


export default user_routes;