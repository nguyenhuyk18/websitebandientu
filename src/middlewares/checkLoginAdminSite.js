// const staff = require('../services/StaffService');
checklogin = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/admin/login.html');
        return;
    }
    next();
}

module.exports = checklogin;