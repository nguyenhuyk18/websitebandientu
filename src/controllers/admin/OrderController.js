const order = require('../../services/OrderService');
const order_item = require('../../services/OrderItemService');
const product = require('../../services/ProductService');
const district = require('../../services/DistrictService');
const ward = require('../../services/WardService');
const province = require('../../services/ProvinceService');
const transport = require('../../services/TransportService');
const customer = require('../../services/CustomerService');
const status = require('../../services/StatusService');
const dayjs = require('dayjs');

class OrderController {
    // Liệt kê các đơn hàng
    static index = async (req, res) => {
        const message = req.session.message;
        delete req.session.message;
        const mOrder = new order();
        const listOrder = await mOrder.getAll();
        // console.log(listOrder);
        return res.render('admin/order/index', { message: message, listOrder: listOrder });
    }

    static new_order = async (req, res) => {
        const mOrder = new order();
        const cond = ` WHERE order_status_id = 1 ORDER BY created_date DESC`
        const listOrder = await mOrder.getAll(cond);
        return res.render('admin/order/new_order', { listOrder: listOrder });
    }



    // tìm sản phẩm theo ID
    static findProductByID = async (req, res) => {
        const id = req.params.id;
        const mProduct = new product();
        // console.log(id)
        const pro = await mProduct.findByID(id);

        if (pro) {
            // console.log(pro)
            if (pro.is_delete == 0) {
                // console.log('Sản phẩm đã bị xóa');
                res.json(false);
                return;
            }

            const tmp = {
                id: pro.id,
                product_name: pro.product_name,
                price: pro.sale_price,
                image: pro.image,
                // is_delete: pro.is_delete
            }
            res.json(tmp);
            return;
        }

        // console.log('Không tìm thấy sản phẩm có id là: ', id);
        const rs = false;
        res.json(rs);
    }

    static detail = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // tìm kiếm order
        // console.log('id', id);

        // Khai báo
        const mDistrict = new district();
        const mWard = new ward();
        const mProvince = new province();
        const mOrder = new order();
        const mStatus = new status();
        const mOrderItem = new order_item();
        const mProduct = new product();
        const mCustomer = new customer();

        const ord = await mOrder.find(id);


        if (ord == false) {
            req.session.message = {
                mess: `Đơn Hàng Không Tồn Tại VUI LÒNG KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }


        const cus = await mCustomer.find(ord.customer_id);




        // tìm kiếm ward 
        const wa = await mWard.find(ord.shipping_ward_id);

        // tìm kiếm quận 
        const dist = await mDistrict.find(wa.district_id);

        // tìm kiếm tỉnh thành 
        const prov = await mProvince.find(dist.province_id);

        // Lấy toàn bộ province
        const listProvince = await mProvince.getAll();
        // Lấy toàn bộ district
        const listDistrict = await mDistrict.findByProvinceID(prov.id);
        // lấy toàn bộ ward
        const listWard = await mWard.findByDistrictID(dist.id);
        // lấy toàn bộ status
        const listStatus = await mStatus.getAll();
        // lấy toàn bộ sản phẩm của order đó
        const listOrderItem = await mOrderItem.findByOrderID(id);
        // Lấy toàn bộ sản phẩm
        let listProduct = [];

        for (const tmp of listOrderItem) {
            // const 
            if (!tmp.product_id) continue;
            const rs = await mProduct.findByID(tmp.product_id);
            // if (rs != false) {
            const product = {
                id: rs.id,
                product_name: rs.product_name,
                image: rs.image,
                price: Number(rs.sale_price),
                qty: tmp.qty,
                total_price: Number(rs.sale_price) * Number(tmp.qty)
            };
            listProduct.push(product);
            // }
        }


        return res.render('admin/order/detailorder', { order: ord, listProvince: listProvince, listDistrict: listDistrict, listWard: listWard, wa: wa, dist: dist, prov: prov, listStatus: listStatus, listProduct: listProduct, cus: cus });
    }

    static chooseCustomer = async (req, res) => {
        const mCustomer = new customer();
        const listCustomer = await mCustomer.getAll();
        const message = req.session.message;
        delete req.session.message;
        // const message = req.session.message;
        // delete req.session.message
        // console.log(listCustomer);
        return res.render('admin/order/create_view', { listCustomer: listCustomer, message: message })
    }

    // trang tạo order
    static create = async (req, res) => {
        const id_customer = req.params.id;

        const mProvince = new province();
        const mCustomer = new customer();
        const mProduct = new product();
        const mStatus = new status();

        const cus = await mCustomer.find(id_customer);

        if (cus == false) {
            req.session.message = {
                mess: `Tài khoản không tồn tại !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            });
            return;
        }


        if (cus.status == 0) {
            req.session.message = {
                mess: `Tài khoản chưa kích hoạt, không được phép sửa hay thêm đơn hàng !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            });
            return;
        }

        const listProvince = await mProvince.getAll();
        const listStatus = await mStatus.getAll();


        return res.render('admin/order/create', { listProvince: listProvince, cus: cus, listStatus: listStatus });
    }


    // thêm order mới
    static store = async (req, res) => {
        const data = req.body;

        // khởi tạo
        const mCustomer = new customer();
        const mTransport = new transport();
        const mOrder = new order();
        const mOrderItem = new order_item();
        const mProduct = new product();

        // Set up dữ liệu
        const trans = await mTransport.findByProvince(data.province_id);
        const cus = await mCustomer.find(data.customer_id);

        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        data.shipping_fee = trans.price;

        data.staff_id = data.staff_id || null;

        // Thêm đơn hàng
        const insertid = await mOrder.save(data);

        if (!insertid) {
            req.session.message = {
                mess: `Thêm đơn hàng cho khách hàng ${cus.name} thất bại !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/order/create/view');
            });
            return;
        }

        if (typeof data.id != 'string') {
            for (const tmp in data.qty) {
                const searchProduct = await mProduct.findByID(data.id[tmp]);
                // console.log(searchProduct)
                const orderitm = {
                    product_id: Number(data.id[tmp]),
                    order_id: insertid,
                    qty: Number(data.qty[tmp]),
                    unit_price: Number(searchProduct.sale_price),
                    total_price: Number(data.qty[tmp]) * Number(searchProduct.sale_price)
                };
                if (!(await mOrderItem.save(orderitm))) {
                    req.session.message = {
                        mess: `Thêm đơn hàng cho khách hàng ${cus.name} thất bại !!!`,
                        type: 'danger'
                    };
                    req.session.save(() => {
                        res.redirect('/admin/order/create/view');
                    });
                    return;
                }
            }
            // Nếu khách hàng chỉ đặt 1 sản phẩm
        } else {
            const searchProduct = await mProduct.findByID(data.id);
            // console.log(typeof data.id)
            const orderitm = {
                product_id: Number(data.id),
                order_id: insertid,
                qty: Number(data.qty),
                unit_price: Number(searchProduct.sale_price),
                total_price: Number(data.qty) * Number(searchProduct.sale_price)
            };
            if (!(await mOrderItem.save(orderitm))) {
                req.session.message = {
                    mess: `Thêm đơn hàng cho khách hàng ${cus.name} thất bại !!!`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/admin/order/create/view');
                });
                return;
            }
        }

        req.session.message = {
            mess: `Thêm đơn hàng cho khách hàng ${cus.name} thành công !!!`,
            type: 'success'
        }
        req.session.save(() => {
            res.redirect('/admin/order.html');
        });
        return;
    }

    static edit = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // tìm kiếm order
        // console.log('id', id);

        // Khai báo
        const mDistrict = new district();
        const mWard = new ward();
        const mProvince = new province();
        const mOrder = new order();
        const mStatus = new status();
        const mOrderItem = new order_item();
        const mProduct = new product();
        const mCustomer = new customer();

        const ord = await mOrder.find(id);
        if (!ord) {
            req.session.message = {
                mess: `Đơn Hàng Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        const cus = await mCustomer.find(ord.customer_id);
        if (cus.status == 0) {
            req.session.message = {
                mess: `Tài khoản chưa kích hoạt, không được phép sửa hay thêm đơn hàng !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            });
            return;
        }
        // check
        const checkOrder = await mOrder.findByCustomerID(cus.id);
        // console.log('số lượng', checkOrder, ' ', cus);
        if (!(checkOrder)) {
            req.session.message = {
                mess: `Tài khoản này chưa có đơn hàng nào, nên không thể sửa !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            });
            return;
        }




        // tìm kiếm ward 
        const wa = await mWard.find(ord.shipping_ward_id);

        // tìm kiếm quận 
        const dist = await mDistrict.find(wa.district_id);

        // tìm kiếm tỉnh thành 
        const prov = await mProvince.find(dist.province_id);

        // Lấy toàn bộ province
        const listProvince = await mProvince.getAll();
        // Lấy toàn bộ district
        const listDistrict = await mDistrict.findByProvinceID(prov.id);
        // lấy toàn bộ ward
        const listWard = await mWard.findByDistrictID(dist.id);
        // lấy toàn bộ status
        const listStatus = await mStatus.getAll();
        // lấy toàn bộ sản phẩm của order đó
        const listOrderItem = await mOrderItem.findByOrderID(id);
        // Lấy toàn bộ sản phẩm
        let listProduct = [];

        for (const tmp of listOrderItem) {
            // const 
            if (!tmp.product_id) continue;
            const rs = await mProduct.findByID(tmp.product_id);
            // if (rs != false) {
            const product = {
                id: rs.id,
                product_name: rs.product_name,
                image: rs.image,
                price: Number(rs.sale_price),
                qty: tmp.qty,
                total_price: Number(rs.sale_price) * Number(tmp.qty),
                is_delete: rs.is_delete
            };
            listProduct.push(product);
            // }
        }


        return res.render('admin/order/edit', { order: ord, listProvince: listProvince, listDistrict: listDistrict, listWard: listWard, wa: wa, dist: dist, prov: prov, listStatus: listStatus, listProduct: listProduct });
    }

    static update = async (req, res) => {
        const data = req.body;
        const id_order = data.id_order;

        // Khởi tạo
        const mCustomer = new customer();
        const mTransport = new transport();
        const mOrder = new order();
        const mOrderItem = new order_item();
        const mProduct = new product();

        // Lấy ra  shipping fee
        const trans = await mTransport.findByProvince(data.province_id);
        const cus = await mCustomer.find(data.customer_id);

        // data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        data.shipping_fee = trans.price;

        data.staff_id = data.staff_id || null;

        // cập nhật bảng order
        if (!(await mOrder.update(data))) {
            req.session.message = {
                mess: `Cập nhật đơn hàng có mã là ${id_order} thất bại !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/order.html');
            });
            return;
        }
        // Xóa hết order item cũ
        if (!(await mOrderItem.deleteOrderItem(id_order))) {
            req.session.message = {
                mess: `Cập nhật đơn hàng có mã là ${id_order} thất bại  !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/admin/order.html');
            });
            return;
        }


        // Cập nhật order item mới
        // Khi nhiều sản phẩm vào order
        if (typeof data.id != 'string') {
            for (const tmp in data.qty) {
                const searchProduct = await mProduct.findByID(data.id[tmp]);
                // if(searchProduct.is_delete == 0) continue;
                // console.log(typeof data.id)
                const orderitm = {
                    product_id: Number(data.id[tmp]),
                    order_id: data.id_order,
                    qty: Number(data.qty[tmp]),
                    unit_price: Number(searchProduct.sale_price),
                    total_price: Number(data.qty[tmp]) * Number(searchProduct.sale_price)
                };
                if (!(await mOrderItem.save(orderitm))) {
                    req.session.message = {
                        mess: `Cập nhật đơn hàng có mã là ${id_order} thất bại !!!`,
                        type: 'danger'
                    };
                    req.session.save(() => {
                        res.redirect('/admin/order.html');
                    });
                    return;
                }
            }
        }
        // Khi chỉ thêm 1 sản phẩm vào order
        else {
            const searchProduct = await mProduct.findByID(data.id);
            // console.log(typeof data.id)
            const orderitm = {
                product_id: Number(data.id),
                order_id: data.id_order,
                qty: Number(data.qty),
                unit_price: Number(searchProduct.sale_price),
                total_price: Number(data.qty) * Number(searchProduct.sale_price)
            };
            if (!(await mOrderItem.save(orderitm))) {
                req.session.message = {
                    mess: `Cập nhật đơn hàng có mã là ${id_order} thất bại !!!`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/admin/order.html');
                });
                return;
            }
        }


        req.session.message = {
            mess: `Cập nhật đơn hàng có mã là ${id_order} thành công !!!`,
            type: 'success'
        }
        req.session.save(() => {
            res.redirect('/admin/order.html');
        });


        // x.log(data);
        // res.redirect('/admin/order.html')
    }

    static delete = async (req, res) => {
        const id = req.params.id;
        const mOrder = new order();

        const tmp = await mOrder.find(id);

        if (tmp == false) {
            req.session.message = {
                mess: `Đơn hàng này không tồn tại VUI LÒNG KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        if (await mOrder.destroy(id)) {
            req.session.message = {
                mess: `Xóa đơn hàng có mã ${id} thành công !!!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/order.html');
            });
            return;
        }

        req.session.message = {
            mess: `Xóa đơn hàng có mã ${id} thất bại !!!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/order.html');
        });


    }


}

module.exports = OrderController;


//         {
//   shipping_fullname: 'Duc Huy Nguyen',
//   shipping_mobile: '0772661005',
//   payment_method: '1',
//   province_id: '04',
//   district_id: '048',
//   ward_id: '01537',
//   shipping_housenumber_street: '15/ đường t6/ phường Tây Thạnh/ Quận Tân Phú',
//   staff_id: '',
//   customer_id: '6',
//   product_id: '',
//   qty: [ '4', '3' ],
//   id: [ '15', '20' ],
//   created_date: '2025-06-02 13:26:37'
// }