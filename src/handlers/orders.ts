import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

const store = new OrderStore();

dotenv.config();

const getCurrent = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  const order = await store.currentOrderUser(req.params.id);
  res.json(order);
}

const create = async (req: Request, res: Response) => {
  try {
      const order: Order = {
          product_id: req.params.productID,
          quantity: req.body.quantity,
          user_id: req.params.userID,
          status: 'active'
      }

      const newOrder= await store.create(order)
      res.json(newOrder)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const getCompleted = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  const orders = await store.completedOrderUser(req.params.id);
  res.json(orders);
}

const order_routes = (app: express.Application) => {
  app.get('/currentorder/:id', getCurrent);
  app.get('/completedorders/:id', getCompleted);
  app.delete('/orders/:id', destroy);
  app.post('/orders/:userID/:productID', create)
}


export default order_routes;