const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
    },
    price: {
        type: Number,
        required: [true, 'Must provide a price'],
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: '{values} is not supported',
        },
    },
    feature: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Product', productsSchema)
