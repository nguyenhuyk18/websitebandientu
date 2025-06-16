const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const ContactController = require('../controllers/client/ContactController')

router.get('/', HomeController.index);

router.get('/san-pham.html', ProductController.index);

router.get('/san-pham/:slug-:id.html', ProductController.detail);

router.post('/san-pham/store-comment', ProductController.storeComment);


router.get('/lien-he.html', ContactController.index);
router.post('/lien-he/gui-email', ContactController.sendInformation);
module.exports = router;