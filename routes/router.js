const express = require('express')
const { getAll } = require('../controllers/controllers')

const router = express.Router()

router.route('/').get(getAll).post()

module.exports = router
