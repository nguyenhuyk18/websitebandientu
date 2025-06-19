const customerModels = require('../../services/CustomerService');

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
}

module.exports = CustomerController;