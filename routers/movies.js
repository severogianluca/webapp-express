const express = require('express');
const router = express.Router();  // <-- Attento alla "R" maiuscola
const movieController = require('../controllers/moviesController');

// Rotte definite con il controller
router.get('/', movieController.getList);
router.get('/:id', movieController.getById);

module.exports = router;
