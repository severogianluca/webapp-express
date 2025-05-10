const express = require('express')
const app = express()
const port = 4000
//import notfound
const notFound = require('./middlewares/notFound.js')
const handleErrors = require('./middlewares/handleErrors.js')

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('Welcome in our homepage')
})

//use middlewares 404
app.use(notFound);
//use 500
app.use(handleErrors)

app.listen(port, () =>{
    console.log(`web-app in ascolto nella porta ${port}`)
})