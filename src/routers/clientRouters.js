const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const ContactController = require('../controllers/client/ContactController');
const CartController = require('../controllers/client/CartController');

router.get('/', HomeController.index);

router.get('/san-pham.html', ProductController.index);

router.get('/san-pham/:slug-:id.html', ProductController.detail);

router.post('/san-pham/store-comment', ProductController.storeComment);


router.get('/thuong-hieu/:slug-:id.html', ProductController.index);

// thêm sản phẩm vào giỏ hàng
router.get('/them-gio-hang.html', CartController.addCart);

// xóa sản phẩm khỏi giỏ hàng
router.get('/xoa-san-pham-tu-gio-hang-:id.html', CartController.deleteCart);

// cập nhật qty trong giỏ hàng
router.get('/cap-nhat-so-luong-trong-gio-hang.html', CartController.updateCart);



router.get('/lien-he.html', ContactController.index);
router.post('/lien-he/gui-email', ContactController.sendInformation);
module.exports = router;