import express from 'express'
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import cors from 'cors'

const app = express();
mongoose.set('strictQuery', true); //to remove mongoose deprecation mongoose error

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router)
app.use("/api/blog", blogRouter)

const connectDB = async () => {
    try {
        await mongoose.connect('')
        console.log('connected to db successfully')
    } catch (error) {
        console.log(error)
    }
}

connectDB().then(() => {
    try {
        app.listen('5000', (req, res) => {
            console.log('server running at port 5000')
        })

    } catch (error) {
        console.log('could not connect to server')
    }
})

app.use('/api', (req, res) => {
    res.send('hello world');
})
