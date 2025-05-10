//INDEX
function getList(req, res) {
    res.send('index');  
}
//SHOW
function getById(req, res) {
    res.send('show');  
}

module.exports = { getList, getById }