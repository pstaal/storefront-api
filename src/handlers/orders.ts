import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import dotenv from 'dotenv';

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
}


export default order_routes;