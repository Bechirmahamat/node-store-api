const Product = require('../models/model')
const getProducts = async (req, res) => {
    const {
        feature,
        company,
        name,
        sort,
        selectOnly,
        page,
        limit,
        numericFilters,
    } = req.query
    const queryParam = {}
    let sortList = ''
    let selectOnlyList = ''
    const pageNumber = Number(page) || 1
    let limitPerPage = Number(limit) || 10
    let skip = (pageNumber - 1) * limitPerPage
    if (feature) {
        queryParam.feature = feature === 'true' ? true : false
    }
    if (company) {
        queryParam.company = company
    }
    if (name) {
        queryParam.name = { $regex: name, $options: 'i' }
    }
    if (sort) {
        sortList = sort.split(',').join(' ')
    } else {
        sortList = 'createdAt'
    }
    if (selectOnly) {
        selectOnlyList = selectOnly.split(',').join(' ')
    }
    if (numericFilters) {
        const temp = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        }

        numericFilters.split(',').forEach((filter) => {
            const [key, value] = filter.split(/[<>]=?/)
            const operator = filter.match(/[<>]=?/)[0]
            queryParam[key.trim()] = { [temp[operator]]: Number(value) }
        })
    }
    // console.log(queryParam)
    const products = await Product.find(queryParam)
        .sort(sortList)
        .select(selectOnlyList)
        .limit(limitPerPage)
        .skip(skip)
    res.status(200).json({
        success: true,
        meta: {
            nbHits: products.length,
            pagination: pageNumber,
        },
        data: products,
    })
}
const createProduct = async (req, res) => {
    // console.log(req.body)
    const product = await Product.create(req.body)
    res.status(200).json({ success: true, data: product })
}
const getStaticProducts = async (req, res) => {
    const { page, limit } = req.query
    const limitPerPage = Number(limit) || 10
    const skip = ((Number(page) || 1) - 1) * limitPerPage
    const products = await Product.find({})
        .sort('createAt')
        .limit(limitPerPage)
        .skip(skip)
    res.status(200).json({
        success: true,
        meta: { nbHits: products.length, currentPage: +page || 1 },
        data: products,
    })
}

module.exports = { getProducts, getStaticProducts, createProduct }
