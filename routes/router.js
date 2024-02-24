const express = require('express')
const {
    getStaticProducts,
    createProduct,
    getProducts,
} = require('../controllers/controllers')

const router = express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/static').get(getStaticProducts)

module.exports = router
