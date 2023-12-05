import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { notfound } from './app/middlewares/notFound'
import router from './routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//error handler
app.use(globalErrorHandler)
app.use(notfound)
export default app
