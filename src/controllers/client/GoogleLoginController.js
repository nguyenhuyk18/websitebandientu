class GoogleLoginController {
    static login = async (req, res) => {
        const data = req.body;
        const mCustomer = new customerModels();

        const user = await mCustomer.findByUsername(data.username);
        if (!user) {
            req.session.message = {
                mess: `Username không tồn tại`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        if (!user.status) {
            req.session.message = {
                mess: `Tài khoản chưa được kích hoạt, vui lòng kiểm tra email để kích hoạt tài khoản hoặc liên hệ với quản trị viên`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        if (!bcrypt.compareSync(data.password, user.password)) {
            req.session.message = {
                mess: `Mật khẩu không đúng`,
                type: 'danger'
            };

            req.session.save(() => {
                res.redirect('/');
            });
            return;
        }

        req.session.user = user;
        req.session.message = {
            mess: `Đăng nhập thành công`,
            type: 'success'
        };

        req.session.save(() => {
            res.redirect('/');
        });
    }
}