const error = (err, req, res, next) => {
    res.status(404).json({ success: false, msg: err })
}

module.exports = error
