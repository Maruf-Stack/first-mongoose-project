import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { Studentroute } from './app/modules/students/student.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/student', Studentroute)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
