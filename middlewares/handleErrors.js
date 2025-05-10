function handleErrors(err, req, res, next){
    res.status(500)
    res.json({
        errorStatus: 500,
        message: err.message
    })
}

module.exports = handleErrors