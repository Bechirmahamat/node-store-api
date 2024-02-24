const Product = require('../models/model')
const getProducts = async (req, res) => {
    const { feature, company } = req.query
    const queryParam = {}
    if (feature) {
        queryParam.feature = feature === 'true' ? true : false
    }
    if (company) {
        queryParam.company = company
    }
    console.log(queryParam)
    const products = await Product.find(queryParam)
    res.status(200).json({
        success: true,
        data: products,
        nbHits: products.length,
    })
}
const createProduct = async (req, res) => {
    // console.log(req.body)
    const product = await Product.create(req.body)
    res.status(200).json({ success: true, data: product })
}
const getStaticProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
}

module.exports = { getProducts, getStaticProducts, createProduct }
