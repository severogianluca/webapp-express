const express = require('express');
const router = express.Router(); 
const movieController = require('../controllers/moviesController');

// Rotte definite con il controller
router.get('/', movieController.getList);
router.get('/:id', movieController.getById);
router.post('/:id/reviews', movieController.insertReviews);

module.exports = router;
