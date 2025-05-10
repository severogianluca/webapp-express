const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Welcome in our homepage')
})

app.listen(port, () =>{
    console.log(`web-app in ascolto nella porta ${port}`)
})