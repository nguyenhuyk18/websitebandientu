// const staff = require('../services/StaffService');
checklogin = (req, res, next) => {
    if (!req.session.login) {
        // console.log(1111)
        res.redirect('/admin/login.html');
        return;
    }
    next();
}

module.exports = checklogin;