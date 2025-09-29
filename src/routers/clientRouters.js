const express = require('express');
const passport = require('passport');
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
const OrderController = require('../controllers/client/OrderController');
const ChatController = require('../controllers/ChattingController');


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


// lịch sử đơn hàng
router.get('/lich-su-don-hang.html', OrderController.index);
router.get('/lich-su-don-hang-api/html', OrderController.indexApi);
router.get('/lich-su-don-hang-socket.html', OrderController.indexAPISocket);


// Chi tiết đơn hàng
router.get('/chi-tiet-don-hang/:id', OrderController.orderDetail);


// lưu sản phẩm vào db
router.post('/payment/checkout', PaymentController.storeOrder);




// lấy lịch sử trò truyện
router.get('/get-all-message.html/:slug', ChatController.getGetMessageByIDConversation);


// order vnpay
router.post('/payment-vnpay-checkout', PaymentController.createURLVNpay);
router.get('/store-order-vnpay', PaymentController.storeOrderVNPay);


// Login with google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failer/login',
        session: false
    }),
    async (req, res) => {
        // req.session.user = req.user;
        const { email, name } = req.user._json;

        if (email) {
            const rs = await AuthController.findEmailCustomer(email, name);
            req.session.user = {
                ...rs
            }
            req.session.save(() => {
                res.redirect('/')
            })
        } else {
            req.session.message = {
                mess: `Email không hợp lệ thử lại sau !!!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/')
            })
        }
    }
);

// // xem đơn hàng mới
// router.get('/auth/success/login', (req, res) => {
//     // const data = req.user;
//     // console.log('sdsdsdsdsdsdsdsdsdsdsdsdsdsd', 'success');

//     res.redirect('/')
// })

router.get('/auth/failer/login', (req, res) => {
    req.session.message = {
        mess: `Đăng nhập với gmail thất bại, thử lại sau !!!`,
        type: 'danger'
    }
    req.session.save(() => {
        res.redirect('/')
    })
})

module.exports = router;