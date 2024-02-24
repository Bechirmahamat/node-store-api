require('dotenv').config()
const connectDB = require('./db/connection')
const Product = require('./models/model')
const products = require('./products.json')
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany()
        const data = await Product.create(products)
        console.log(data)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
