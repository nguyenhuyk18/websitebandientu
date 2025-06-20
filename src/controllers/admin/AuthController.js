const auth = require('../../services/AuthService');
const permission = require('../../services/PermissionService');
const action = require('../../services/ActionService');
const role = require('../../models/role');
// const { io, server } = require('../../app');

class AuthController {
    static index = (req, res) => {
        const message = req.session.message;
        delete req.session.message;
        return res.render('admin/login/index', { message: message });
    }

    static returnRoleID = async (req, res) => {
        const username = req.query['username'];
        const mAuth = new auth();
        const staff = await mAuth.findByUsername(username);
        return res.json({
            role_id: staff.role_id
        });
    }

    static login = async (req, res) => {
        const data = req.body;

        const mAuth = new auth();
        const mPermission = new permission();
        const mAction = new action();

        // Kiểm tra username
        // console.log(await mAuth.login(data.username, data.password));
        const staff = await mAuth.login(data.username, data.password);



        if (staff) {

            if (staff.is_active === 0) {
                req.session.message = {
                    mess: `Tài khoản đã bị vô hiệu hóa, liên hệ ADMIN để biết thêm thông tin chi tiết !!!`,
                    type: 'danger'
                };

                req.session.save(() => {
                    res.redirect('/admin/login.html');
                });
                return;
            }
            const listAction = [];
            // req.session.user = await mAuth.login(data.username, data.password);
            const list = await mPermission.findByRoleID(staff.role_id);





            for (const action of list) {
                const name_action = await mAction.find(action.action_id);
                listAction.push(name_action.name_action);
            }

            // console.log(staff.role_id);
            // io.emit('login-admin', staff.role_id);

            req.session.login = {
                role_id: staff.role_id,
                username: staff.username,
                name: staff.name,
                name_role: listAction,
            };

            req.session.message = {
                mess: `Đăng nhập thành công !!`,
                type: 'success'
            };

            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }



        req.session.message = {
            mess: `Đăng nhập thất bại !! Tên đăng nhập hoặc mật khẩu không đúng`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/login.html');
        });
    }

    static logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Không thể xóa session');
            }
        });
        // console.log(1)
        res.redirect('/admin/login.html');
        return;
    }

}

module.exports = AuthController