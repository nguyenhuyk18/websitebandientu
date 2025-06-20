const customerModels = require('../../services/CustomerService');
const wardModels = require('../../services/WardService');
const districtModels = require('../../services/DistrictService');
const provinceModels = require('../../services/ProvinceService');
const transportModels = require('../../services/TransportService');
const orderModels = require('../../services/OrderService');
const orderItemModels = require('../../services/OrderItemService');
const { ioInstance } = require('../../util/socket');

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
        const data = req.cookies.cart;


        if (!data || data.length === 0) {
            req.session.message = {
                mess: `Giỏ hàng của bạn đang trống !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

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

        const mCustomer = new customerModels();
        const mWard = new wardModels();
        const mDistrict = new districtModels();
        const mProvince = new provinceModels();
        const mTransport = new transportModels();


        // console.log('data', data.product);

        const provinces = await mProvince.getAll();
        let districts = [];
        let wards = [];
        let ward = null;
        let district = null;
        let province = null;
        let shipping_fee = 0;
        const dataParse = JSON.parse(data);
        // console.log('dataParse', dataParse);

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

        const data = req.body;

        const mTransport = new transportModels();
        const mOrder = new orderModels();
        const mOrderItem = new orderItemModels();
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

        const tmp = await mTransport.findByProvince(data.province_id);
        let shipping_fee = tmp.price;
        // created_date, 
        // order_status_id, 
        // shipping_fullname, 
        // shipping_mobile, 
        // payment_method, 
        // shipping_ward_id, 
        // shipping_housenumber_street, 
        // shipping_fee,
        // staff_id, 
        // customer_id
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
            customer_id: req.session.user.id // Assuming the customer is the logged-in user
        };
        const order_id = await mOrder.save(orderData)
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
        console.log('order_id', req.io);
        req.io.to('nhanthongbaodathang').emit('order-notification');

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
}

module.exports = PaymentController;