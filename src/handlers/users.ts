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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('users/:id', show);
  app.post('/users', create);
  app.post('/authenticate', authenticate);
}


export default user_routes;