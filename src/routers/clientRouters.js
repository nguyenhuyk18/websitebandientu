const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController')

router.get('/', HomeController.index);

router.get('/san-pham.html', ProductController.index);

router.get('/san-pham/:slug-:id.html', ProductController.detail)

module.exports = router;