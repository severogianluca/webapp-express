function notFound(req, res, next){
    
    res.status(404)
    res.json({
        errorStatus: 404,
        message: "resourse not found"
    })

}

module.exports = notFound();