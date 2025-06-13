const customer = require('../../services/CustomerService');
const province = require('../../services/ProvinceService');
const district = require('../../services/DistrictService');
const ward = require('../../services/WardService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class CustomerController {
    static index = async (req, res) => {
        const mCustomer = new customer();
        const listCustomer = await mCustomer.getAll();

        const message = req.session.message;
        delete req.session.message
        // console.log(listCustomer);
        return res.render('admin/customer/index', { listCustomer: listCustomer, message: message })
    }

    static detail = async (req, res) => {
        const id = req.params.id;
        const mCustomer = new customer();
        const cus = await mCustomer.find(id);
        if (!cus) {
            req.session.message = {
                mess: `Không tìm thấy khách hàng với id ${id}`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }
        const mProvince = new province();
        const mDistrict = new district();
        const mWard = new ward();
        // lấy ra tỉnh thành, quận, phường id của người dùng
        const id_ward = cus.ward_id;
        const war = await mWard.find(id_ward);
        const dis = await mDistrict.find(war.district_id);
        const pro = await mProvince.find(dis.province_id);
        // lấy ra danh sách province
        // const listProvince = await mProvince.getAll();
        // // laays ra danh sach district
        // const listDistrict = await mDistrict.findByProvinceID(pro.id);
        // // lay ra danh sach phuong
        // const listWard = await mWard.findByDistrictID(dis.id);
        return res.render('admin/customer/detailcustomer', { customer: cus, id_ward: id_ward, id_district: war.district_id, id_province: pro.id, province: pro.name, district: dis.name, ward: war.name });
    }

    static delete = async (req, res) => {
        const id = req.params.id;
        const mCustomer = new customer();

        const cus = await mCustomer.find(id);
        const name = cus.name;
        if (!cus) {
            req.session.message = {
                mess: `Không tìm thấy khách hàng với id ${id}`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }

        if (await mCustomer.destroy(id)) {
            req.session.message = {
                mess: `Xóa khách hàng ${name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }
        req.session.message = {
            mess: `Xóa khách hàng ${name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/customer.html');
        })
        return;
    }

    static edit = async (req, res) => {
        const id = req.params.id;

        const mCustomer = new customer();
        const cus = await mCustomer.find(id);

        if (!cus) {
            req.session.message = {
                mess: `Không tìm thấy khách hàng với id ${id}`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }


        const mProvince = new province();
        const mDistrict = new district();
        const mWard = new ward();

        // lấy ra tỉnh thành, quận, phường id của người dùng
        const id_ward = cus.ward_id;
        const war = await mWard.find(id_ward);
        const dis = await mDistrict.find(war.district_id);
        const pro = await mProvince.find(dis.province_id);



        // lấy ra danh sách province
        const listProvince = await mProvince.getAll();
        // laays ra danh sach district
        const listDistrict = await mDistrict.findByProvinceID(pro.id);
        // lay ra danh sach phuong
        const listWard = await mWard.findByDistrictID(dis.id);
        // console.log(pro.id);

        return res.render('admin/customer/edit', { customer: cus, listProvince: listProvince, listDistrict: listDistrict, listWard: listWard, id_ward: id_ward, id_district: war.district_id, id_province: pro.id });
    }

    static update = async (req, res) => {
        const data = req.body;
        const mCustomer = new customer();

        const password = '111';
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash;
        const oldData = await mCustomer.find(req.body.id);

        if (oldData.username != req.body.username || oldData.email != req.body.email) {
            if (oldData.username != req.body.username) {
                if (await mCustomer.findByUsername(req.body.username)) {
                    req.session.message = {
                        mess: `Sửa khách hàng ${req.body.name} không được do trùng username`,
                        type: 'danger'
                    }
                    req.session.save(() => {
                        res.redirect('/admin/customer.html');
                    })
                    return;
                }
            }

            if (oldData.email != req.body.email) {
                if (await mCustomer.findByEmail(req.body.email)) {
                    req.session.message = {
                        mess: `Sửa khách hàng ${req.body.name} không được do trùng email`,
                        type: 'danger'
                    }
                    req.session.save(() => {
                        res.redirect('/admin/customer.html');
                    })
                    return;
                }
            }

        }

        if (await mCustomer.update(data)) {
            req.session.message = {
                mess: `Cập nhật khách hàng ${req.body.name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }

        req.session.message = {
            mess: `Cập nhật khách hàng ${req.body.name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/customer.html');
        });
        return;
    }

    static create = async (req, res) => {
        const mProvince = new province();

        const listProvince = await mProvince.getAll()


        return res.render('admin/customer/create', { listProvince: listProvince });
    }

    static store = async (req, res) => {
        const data = req.body;
        const mCustomer = new customer();
        // kiểm tra có trùng tên đăng nhập 
        if (await mCustomer.findByUsername(req.body.username)) {
            req.session.message = {
                mess: `Thêm khách hàng ${req.body.name} không được do trùng username`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }

        if (await mCustomer.findByEmail(req.body.email)) {
            req.session.message = {
                mess: `Thêm khách hàng ${req.body.name} không được do trùng email`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }

        const created_date = new Date();
        data.created_date = created_date.toISOString().slice(0, 19).replace('T', ' ');

        // set mk mặc định
        const password = '111';
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash;

        if (await mCustomer.save(data)) {
            req.session.message = {
                mess: `Thêm khách hàng ${req.body.name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/customer.html');
            })
            return;
        }
        req.session.message = {
            mess: `Thêm khách hàng ${req.body.name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/customer.html');
        });
        return;
    }

}

module.exports = CustomerController;