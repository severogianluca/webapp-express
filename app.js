const express = require('express')
const app = express()
const port = process.env.PORT || 4000
//import notfound
const notFound = require('./middlewares/notFound.js')
const handleErrors = require('./middlewares/handleErrors.js')
//roouter
const moviesRouter = require('./routers/movies.js')
//cors import
const cors = require('cors')


app.use(cors({
    origin: process.env.FE_APP
}));

//use per visualizzare img nel folder public(asset statici)
app.use(express.static('public'))
//middlewares che permette la lettura di un body(post, put)
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome in our homepage')
})

app.use('/movies', moviesRouter)


//use middlewares 404
app.use(notFound);
//use middlewares 500
app.use(handleErrors)

app.listen(port, () =>{
    console.log(`web-app in ascolto nella porta ${port}`)
})