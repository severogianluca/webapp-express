//INDEX
function getList(req, res) {
    res.send('index');  // <--- qui ho cambiato in res.send()
}

//SHOW
function getById(req, res) {
    res.send('show');  // <--- qui ho cambiato in res.send()
}

module.exports = { getList, getById }