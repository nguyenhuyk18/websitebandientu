const customerModels = require('../../services/CustomerService');
const wardModels = require('../../services/WardService');
const districtModels = require('../../services/DistrictService');
const provinceModels = require('../../services/ProvinceService');
const transportModels = require('../../services/TransportService');
const orderModels = require('../../services/OrderService');
const productModels = require('../../services/ProductAllServices');
const orderItemModels = require('../../services/OrderItemService');
const { ioInstance } = require('../../util/socket');
const order = require('../../models/order');
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay')
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

class PaymentController {

    static getShippingFee = async (req, res) => {
        const province_id = req.params['id_province'];
        // console.log('province_id', province_id);
        const mTransport = new transportModels();
        const transport = await mTransport.findByProvince(province_id);
        // console.log('transport', transport);
        res.json(transport.price);
    }

    static index = async (req, res) => {
        // Chưa đăng nhập mà đã ấn thanh toán vào checkout
        if (!req.session.user) {
            req.session.message = {
                mess: `Vui lòng đăng nhập trước khi thanh toán !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        // kh có giỏ hàng mà vào đặt hàng như thật
        if (typeof req.cookies.cart == 'undefined') {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        const data = JSON.parse(req.cookies.cart);
        // console.log(data);
        const productAmount = data.product?.length || 0
        // đơn hàng đã tạo mà xóa hết sản phẩm rồi ấn đặt hàng 
        if (productAmount === 0) {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        const mCustomer = new customerModels();
        const mWard = new wardModels();
        const mDistrict = new districtModels();
        const mProvince = new provinceModels();
        const mTransport = new transportModels();

        const provinces = await mProvince.getAll();
        let districts = [];
        let wards = [];
        let ward = null;
        let district = null;
        let province = null;
        let shipping_fee = 0;
        const dataParse = data;
        const cus = await mCustomer.find(req.session.user.id);
        if (cus.ward_id) {
            // lấy thông tin tỉnh, quận, phường của khách hàng
            ward = await mWard.find(cus.ward_id);
            district = await mDistrict.find(ward.district_id);
            province = await mProvince.find(district.province_id);

            const tmp = await mTransport.findByProvince(province.id);
            shipping_fee = tmp.price;
            //liệt kê quận mà tỉnh đó có
            districts = await mDistrict.findByProvinceID(province.id);
            //liệt kê phường mà quận đó có
            wards = await mWard.findByDistrictID(district.id);
        }
        return res.render('client/payment/index', {
            provinces: provinces,
            districts: districts,
            wards: wards,
            ward: ward,
            district: district,
            province: province,
            customer: cus,
            data: dataParse,
            shipping_fee: shipping_fee
        });
    }


    static storeOrder = async (req, res) => {
        const mprod = new productModels();
        const data = req.body;

        const mTransport = new transportModels();
        const mOrder = new orderModels();
        const mOrderItem = new orderItemModels();
        const mCustomer = new customerModels();
        const cart = req.cookies.cart;
        if (!cart || cart.length === 0) {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/');
            }
            );
            return;
        }

        const cartData = JSON.parse(cart);
        // kiểm tra các sản phẩm còn qty không
        for (const item of cartData.product) {
            const column = Object.keys(item);
            const values = Object.values(item);
            const prodFound = await mprod.find(column[0]);
            if (prodFound.stock_quantity < values[0].qty) {
                req.session.message = {
                    mess: `${prodFound.product_name} số lượng chỉ còn lại ${prodFound.stock_quantity} sản phẩm`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                });
                return;
            }
        }

        // lấy shipping_fee
        const tmp = await mTransport.findByProvince(data.province_id);
        let shipping_fee = tmp.price;

        // thêm dữ liệu vào order
        const orderData = {
            created_date: new Date(),
            order_status_id: 1, // Assuming 1 is the status for 'Pending'
            shipping_fullname: data.shipping_fullname,
            shipping_mobile: data.shipping_mobile,
            payment_method: data.payment_method,
            shipping_ward_id: data.shipping_ward_id,
            shipping_housenumber_street: data.shipping_housenumber_street,
            shipping_fee: shipping_fee,
            staff_id: null, // Assuming the staff is the logged-in user
            customer_id: req.session.user.id, // Assuming the customer is the logged-in user
            delivered_date: null
        };
        const cus = await mCustomer.find(req.session.user.id);
        const order_id = await mOrder.save(orderData);
        if (order_id == null) {
            req.session.message = {
                mess: `Đặt hàng không thành công, vui lòng thử lại sau !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/');
            });
        }

        // Lưu các sản phẩm trong giỏ hàng vào bảng order_item
        for (const item of cartData.product) {
            const column = Object.keys(item);
            const values = Object.values(item);
            const orderItemData = {
                order_id: order_id,
                product_id: column[0],
                qty: values[0].qty,
                unit_price: values[0].price,
                total_price: values[0].total
            };

            const prodFound = await mprod.find(column[0]);
            if (prodFound.stock_quantity < values[0].qty) {
                req.session.message = {
                    mess: `${prodFound.product_name} số lượng chỉ còn lại ${prodFound.stock_quantity} sản phẩm`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                });
                return;
            }
            prodFound.stock_quantity -= values[0].qty;
            await mprod.updateQuantityProduct(prodFound);

            if (!(await mOrderItem.save(orderItemData))) {
                req.session.message = {
                    mess: `Lưu sản phẩm trong giỏ hàng không thành công, vui lòng thử lại sau !!!`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                });
                return;
            }
        }


        const dataSocket = {
            id_order: order_id,
            name_customer: cus.username,
            payment: data.payment_method,
            name_order_status: 'Đã đặt hàng',
            phone: cus.shipping_mobile
        }
        req.io.to('nhanthongbaodathang').emit('order-notification', dataSocket);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        res.clearCookie('cart');
        req.session.message = {
            mess: `Đặt hàng thành công, vui lòng chờ xác nhận từ chúng tôi !!!`,
            type: 'success'
        };
        req.session.save(() => {
            res.redirect('/');
        });

    }

    static createURLVNpay = async (req, res) => {
        // kiểm tra giỏ hàng coi có sản phẩm nào hết hàng chưa
        const cart = req.cookies.cart;
        const data = req.body;
        const mTransport = new transportModels();
        const mprod = new productModels();


        if (!cart || cart.length === 0) {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/');
            }
            );
            return;
        }

        const datacart = JSON.parse(cart);

        for (const item of datacart.product) {
            const column = Object.keys(item);
            const values = Object.values(item);
            const prodFound = await mprod.find(column[0]);
            if (prodFound.stock_quantity < prodFound.qty) {
                req.session.message = {
                    mess: `${prodFound.product_name} chỉ còn lại ${prodFound.stock_quantity} sản phẩm !!!`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                }
                );
                return;
            }
        }

        const username = req.session.user.username;
        const idod = username + uuidv4();

        // lưu dữ liệu vào session để lác một hồi lấy ra dùng bên storeorder
        req.session.data_order = {
            data: data
        }
        req.session.save();

        // lấy shipping_fee
        const tmp = await mTransport.findByProvince(data.province_id);
        let shipping_fee = datacart.total_price + tmp.price;

        const vnpay = new VNPay({
            // ⚡ Cấu hình bắt buộc
            tmnCode: process.env.VNP_TMN_CODE,
            secureSecret: process.env.VNP_HASH_SECRET,
            vnpayHost: 'https://sandbox.vnpayment.vn',

            // 🔧 Cấu hình tùy chọn
            testMode: true,                     // Chế độ test
            hashAlgorithm: 'SHA512',           // Thuật toán mã hóa
            // enableLog: true,                   // Bật/tắt log
            loggerFn: ignoreLogger,            // Custom logger
        })

        const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: Number(datacart.total_price) + Number(shipping_fee),                    // 100,000 VND
            vnp_IpAddr: '127.0.0.1',
            vnp_ReturnUrl: `${process.env.DOMAIN}/store-order-vnpay`,
            vnp_TxnRef: idod,
            vnp_OrderInfo: 'Thanh Toán Đơn Hàng',
            vnp_Locale: VnpLocale.VN,
        });

        // res.status(201).json(vnpayResponse);
        // console.log(vnpayResponse);

        res.redirect(vnpayResponse)
    }

    static storeOrderVNPay = async (req, res) => {
        const cart = req.cookies.cart;

        const mTransport = new transportModels();
        const mprod = new productModels();
        const mOrderItem = new orderItemModels();
        const mCustomer = new customerModels();

        if (!cart || cart.length === 0) {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/');
            }
            );
            return;
        }

        const cus = await mCustomer.find(req.session.user.id);

        let verify;
        const vnpay = new VNPay({
            // ⚡ Cấu hình bắt buộc
            tmnCode: process.env.VNP_TMN_CODE,
            secureSecret: process.env.VNP_HASH_SECRET,
            vnpayHost: 'https://sandbox.vnpayment.vn',

            testMode: true,                     // Chế độ test
            hashAlgorithm: 'SHA512',           // Thuật toán mã hóa
            loggerFn: ignoreLogger,            // Custom logger
        })
        try {
            // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ hoặc thiếu dữ liệu
            verify = vnpay.verifyReturnUrl(req.query);
            if (!verify.isVerified) {
                req.session.message = {
                    mess: `Thanh Toán Thất Bại`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                }
                );
                return;
            }
            if (!verify.isSuccess) {
                req.session.message = {
                    mess: `Thanh Toán Thất Bại`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/');
                }
                );
                return;
            }
        } catch (error) {
            console.log(error)
            req.session.message = {
                mess: `Thanh Toán Thất Bại`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/');
            }
            );
            return;
        }

        const data = req.session.data_order.data;
        const tmp = await mTransport.findByProvince(data.province_id);
        let shipping_fee = tmp.price;


        const mOrder = new orderModels();
        const orderData = {
            created_date: new Date(),
            order_status_id: 1, // Assuming 1 is the status for 'Pending'
            shipping_fullname: data.shipping_fullname,
            shipping_mobile: data.shipping_mobile,
            payment_method: data.payment_method,
            shipping_ward_id: data.shipping_ward_id,
            shipping_housenumber_street: data.shipping_housenumber_street,
            shipping_fee: shipping_fee,
            staff_id: null, // Assuming the staff is the logged-in user
            customer_id: req.session.user.id, // Assuming the customer is the logged-in user
            delivered_date: null
        };
        const order_id = await mOrder.save(orderData);


        // Lưu các sản phẩm trong giỏ hàng vào bảng order_item
        const cartData = JSON.parse(cart);

        for (const item of cartData.product) {
            const column = Object.keys(item);
            const values = Object.values(item);
            const orderItemData = {
                order_id: order_id,
                product_id: column[0],
                qty: values[0].qty,
                unit_price: values[0].price,
                total_price: values[0].total
            };
            const prodFound = await mprod.find(column[0]);
            prodFound.stock_quantity -= values[0].qty;
            await mprod.updateQuantityProduct(prodFound);
            await mOrderItem.save(orderItemData)
        }

        const dataSocket = {
            id_order: order_id,
            name_customer: cus.username,
            payment: data.payment_method,
            name_order_status: 'Đã đặt hàng',
            phone: cus.shipping_mobile
        }
        req.io.to('nhanthongbaodathang').emit('order-notification', dataSocket);

        res.clearCookie('cart');
        req.session.message = {
            mess: `Thanh Toán Thành Công`,
            type: 'success'
        };
        req.session.save(() => {
            res.redirect('/');
        }
        );
        return;
    }
}

module.exports = PaymentController;