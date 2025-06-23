const customerModels = require('../../services/CustomerService');
const orderModels = require('../../services/OrderService');
const orderItemModels = require('../../services/OrderItemService');
const wardModels = require('../../services/WardService');
const districtModels = require('../../services/DistrictService');
const provinceModels = require('../../services/ProvinceService');

class OrderController {
    static orderDetail = async (req, res) => {
        if (!req.session.user) {
            req.session.message = {
                mess: `Vui lòng đăng nhập để xem lịch sử đơn hàng !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }


        const id = req.params['id'];
        const mOrder = new orderModels();
        const order = await mOrder.find(id);
        //khởi tạo model

        const mOrderItem = new orderItemModels();
        const mWard = new wardModels();
        const mDistrict = new districtModels();
        const mProvince = new provinceModels();

        // Lấy thông tin địa chỉ giao hàng
        const shippingWard = await mWard.find(order.shipping_ward_id);
        const shippingDistrict = await mDistrict.find(shippingWard.district_id);
        const shippingProvince = await mProvince.find(shippingDistrict.province_id);

        // Tìm thông tin đơn hàng

        const listOrderItem = await mOrderItem.findByOrderID(id);

        const listOrderItemNew = await Promise.all(listOrderItem.map(async (item) => {
            // Lấy thông tin sản phẩm từ chi tiết đơn hàng
            const product = await item.getProductList();
            return {
                id: item.id,
                product_id: item.product_id,
                quantity: item.qty,
                price: item.unit_price,
                total: item.total_price,
                product: product
            };
        }));

        res.render('client/customer/orderDetail', {
            order: order,
            listOrderItem: listOrderItemNew,
            shippingWard: shippingWard,
            shippingDistrict: shippingDistrict,
            shippingProvince: shippingProvince
        });
    }


    static index = async (req, res) => {
        if (!req.session.user) {
            req.session.message = {
                mess: `Vui lòng đăng nhập để xem lịch sử đơn hàng !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }
        const id = req.session.user.id;

        // const mCustomer = new customerModels();
        const mOrder = new orderModels();
        const mOrderItem = new orderItemModels();

        // Tìm thông tin đơn hàng
        const listOrder = await mOrder.findByCustomerID(id);
        let endResult = [];
        for (const order of listOrder) {
            // Tìm thông tin chi tiết đơn hàng
            const listOrderItem = await mOrderItem.findByOrderID(order.id);
            const listOrderItemNew = await Promise.all(listOrderItem.map(async (item) => {
                // Lấy thông tin sản phẩm từ chi tiết đơn hàng
                const product = await item.getProductList();

                return {
                    id: item.id,
                    product_id: item.product_id,
                    quantity: item.qty,
                    price: item.unit_price,
                    total: item.total_price,
                    product: product
                };
            }));
            console.log('listOrderItemNew', listOrderItemNew);
            const listProduct = [];
            // Lấy thông tin sản phẩm từ chi tiết đơn hàng
            // for (const item of listOrderItem) {
            //     const product = await item.getProductList();
            //     listProduct.push(product);
            // }
            let tmp = {
                id: order.id,
                created_date: order.created_date,
                order_status_id: order.order_status_id,
                shipping_fullname: order.shipping_fullname,
                shipping_mobile: order.shipping_mobile,
                payment_method: order.payment_method,
                shipping_ward_id: order.shipping_ward_id,
                shipping_housenumber_street: order.shipping_housenumber_street,
                shipping_fee: order.shipping_fee,
                delivered_date: order.delivered_date,
                staff_id: order.staff_id,
                customer_id: order.customer_id,
                name_customer: order.name_customer,
                name_staff: order.name_staff,
                name_order_status: order.name_order_status,
                listOrderItem: listOrderItemNew,
                // listProduct: listProduct
            }
            endResult.push(tmp);
        }


        res.render('client/customer/historyOrder', { listOrder: endResult });
    }
}

module.exports = OrderController;