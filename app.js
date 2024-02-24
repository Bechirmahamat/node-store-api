require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const error = require('./middleware/errors')
const notFound = require('./middleware/not-found')
const router = require('./routes/router')

const port = process.env.PORT || 3000

// ______routes
app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use(express.json())
app.use('/api/v1/products', router)

// ______middlewares

app.use(error)
app.use(notFound)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log('Connect to DB')
        app.listen(port, () =>
            console.log(`Server is listening on port : ${port} ....`)
        )
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

start()
