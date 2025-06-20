const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const ContactController = require('../controllers/client/ContactController');
const CartController = require('../controllers/client/CartController');
const AuthController = require('../controllers/client/AuthController');
const CustomerController = require('../controllers/client/CustomerController');
const DistrictController = require('../controllers/client/DistrictController');
const WardController = require('../controllers/client/WardController');
const PaymentController = require('../controllers/client/PaymentController');

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

// đăng ký
router.post('/dang-ky', AuthController.register);

// xác thực email 
router.get('/xac-thuc.html', AuthController.setActiveAccount);


// đăng nhập
router.post('/dang-nhap', AuthController.login);


// đăng xuất 
router.get('/dang-xuat.html', AuthController.logout);


// trang thông tin cá nhân
router.get('/thong-tin-ca-nhan.html', CustomerController.index);

// cập nhật thông tin khách hàng
router.post('/cap-nhat-thong-tin-khach-hang', AuthController.changInformationOfCustomer);

// router gửi email đến khách hàng
router.post('/quen-mat-khau', AuthController.sendChangePassEmail);

// form đổi mật khẩu
router.get('/doi-mat-khau.html', AuthController.changePasswordByMail);

// đổi mật khẩu
router.post('/doi-mat-khau', AuthController.changepassword);

// trang liên hệ
router.get('/lien-he.html', ContactController.index);

// gửi thông tin liên hệ
router.post('/lien-he/gui-email', ContactController.sendInformation);

// Địa chỉ giao hàng mặc định
router.get('/dia-chi-giao-hang-mac-dinh.html', CustomerController.shippingDefault);


// xem district theo id province
router.get('/district.html/:id_province', DistrictController.getAll);


// Lưu trữ shipping default
router.post('/dia-chi-giao-hang-mac-dinh', CustomerController.changeShippingDefault);


// checkout
router.get('/checkout.html', PaymentController.index);

// ward 
// xem ward theo id district
router.get('/ward.html/:id_district', WardController.getAll);



router.get('/getShippingFee.html/:id_province', PaymentController.getShippingFee);


// lưu sản phẩm vào db
router.post('/payment/checkout', PaymentController.storeOrder);

module.exports = router;