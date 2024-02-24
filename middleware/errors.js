const error = (err, req, res, next) => {
    const error = err?.message || 'Something went wrong'
    res.status(404).json({ success: false, msg: error })
}

module.exports = error
