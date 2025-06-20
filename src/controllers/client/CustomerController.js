const customerModels = require('../../services/CustomerService');
const wardModels = require('../../services/WardService');
const districtModels = require('../../services/DistrictService');
const provinceModels = require('../../services/ProvinceService');


class CustomerController {
    static index = async (req, res) => {
        if (!req.session.user) {
            req.session.message = {
                mess: `Vui lòng không truy cập vào đây vì bạn chưa đăng nhập !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            // return;
            // res.redirect('/');
            return;
        }
        const mCustomer = new customerModels();
        const id = req.session.user.id;

        const message = req.session.message;
        delete req.session.message;

        const customer = await mCustomer.find(id);


        return res.render('client/customer/index', { customer: customer, message: message });
    }

    static shippingDefault = async (req, res) => {
        if (!req.session.user) {
            req.session.message = {
                mess: `Vui lòng không truy cập vào đây vì bạn chưa đăng nhập !!!`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }
        const mCustomer = new customerModels();
        const id = req.session.user.id;

        const message = req.session.message;
        delete req.session.message;

        const customer = await mCustomer.find(id);

        const mWard = new wardModels();
        const mDistrict = new districtModels();
        const mProvince = new provinceModels();

        const provinces = await mProvince.getAll();
        let districts = [];
        let wards = [];
        let ward = null;
        let district = null;
        let province = null;

        if (customer.ward_id) {
            // lấy thông tin tỉnh, quận, phường của khách hàng
            ward = await mWard.find(customer.ward_id);
            district = await mDistrict.find(ward.district_id);
            province = await mProvince.find(district.province_id);

            //liệt kê quận mà tỉnh đó có
            districts = await mDistrict.findByProvinceID(province.id);
            //liệt kê phường mà quận đó có
            wards = await mWard.findByDistrictID(district.id);
        }

        // console.log(province);





        return res.render('client/customer/shippingDefault', { customer: customer, message: message, provinces: provinces, districts: districts, wards: wards, ward: ward, district: district, province: province });
    }

    static changeShippingDefault = async (req, res) => {
        const data = req.body;
        const mCustomer = new customerModels();
        const user = await mCustomer.find(data.id);


        const updatedData = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            ward_id: data.ward_id,
            housenumber_street: data.housenumber_street,
            shipping_name: data.shipping_name,
            shipping_mobile: data.shipping_mobile,
            status: 1,
            id: data.id,
            password: user.password, // giữ nguyên mật khẩu cũ nếu không thay đổi
            username: user.username // giữ nguyên username cũ nếu không thay đổi
        };

        if (await mCustomer.update(updatedData)) {
            req.session.message = {
                mess: `Cập nhật địa chỉ giao hàng thành công !!!`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/dia-chi-giao-hang-mac-dinh.html');
            });
            return;
        }

        req.session.message = {
            mess: `Cập nhật địa chỉ giao hàng thất bại !!!`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/dia-chi-giao-hang-mac-dinh.html');
        });
        return;
    }
}

module.exports = CustomerController;