class DashboardController {
    static index = (req, res) => {
        const message = req.session.message
        delete req.session.message;

        // console.log(req.session.login);

        return res.render('admin/dashboard/index', { message: message });
    }
}

module.exports = DashboardController;