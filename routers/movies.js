const express = require('express');
const router = express.Router(); 
const movieController = require('../controllers/moviesController');
const upload = require('../middlewares/multer')

// Rotte definite con il controller
router.get('/', movieController.getList);
router.get('/:id', movieController.getById);

router.post('/', upload.single('image'), movieController.insertMovie)
router.post('/:id/reviews', movieController.insertReviews);

module.exports = router;
