const express = require('express')

const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.send('Hello World')
    })
    .post()

module.exports = router
