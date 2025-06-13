const staff = require('../services/StaffService');

checkPermisson = (requiredAction) => {
    return function (req, res, next) {
        const roleUser = req.session.login.name_role || null;
        const mStaff = new staff();
        // console.log('Checking permissions for user:', req.session.login);

        if (!roleUser) {
            req.session.message = {
                mess: `Bạn không có thẩm quyền để truy cập vào chức năng này !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        mStaff.findByUsername(req.session.login.username).then((staff) => {
            if (staff && staff.is_active === 0) {
                req.session.destroy(() => {
                    res.redirect('/admin/login.html');
                });
                return;
            }
            // Chỉ đến đây nếu staff active
            if (roleUser.includes(requiredAction)) {
                next();
            } else {
                req.session.message = {
                    mess: `Bạn không có thẩm quyền để truy cập vào chức năng này !!!`,
                    type: 'danger'
                };
                req.session.save(() => {
                    res.redirect('/admin/dashboard.html');
                });
            }
        }).catch((err) => {
            console.error('Error checking staff status:', err);
            req.session.message = {
                mess: `Đã có lỗi xảy ra khi kiểm tra tài khoản của bạn !!!`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/admin/login.html');
            });
        });
    };
};

module.exports = checkPermisson