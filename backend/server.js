import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './congif/db.js'
import usersRouter from './routes/usersRoute.js';
import addtocartRouter from './routes/productsRoute.js'

const app = express();

app.use(express.json())
app.use(cors())
dotenv.config();

app.use('/users', usersRouter);
app.use('/addtoproduct', addtocartRouter);


connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`app is listening in port ${process.env.PORT}`)
})


