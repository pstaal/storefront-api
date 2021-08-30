import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();


const getCurrent = async (req: Request, res: Response) => {
  const order = await store.currentOrderUser(req.params.id);
  res.json(user);
}

const getCompleted = async (req: Request, res: Response) => {
  const users = await store.completedOrderUser(req.params.id);
  res.json(users);
}

const order_routes = (app: express.Application) => {
  app.get('/currentorder/:id', getCurrent);
  app.get('/completedorders/:id', getCompleted);
}


export default order_routes;