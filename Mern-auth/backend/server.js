import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
const port = process.env.PORT || 5000; 
import userRoutes from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js';
import {connectDB} from '../connection/connection.js'



const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRouter)



app.get('/',(req,res)=>res.send('server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on ${port}`))
