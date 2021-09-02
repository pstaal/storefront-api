import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/top_five_products', topFivePopularProducts)
}

const dashboard = new DashboardQueries()

const topFivePopularProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.topFivePopularProducts()
  res.json(products)
}

export default dashboardRoutes