const staff = require('../../services/StaffService');
const role = require('../../services/RoleService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class StaffController {
    static index = async (req, res) => {
        const mStaff = new staff();
        const mRole = new role();
        const tmp = await mStaff.getAll();
        const message = req.session.message;
        delete req.session.message
        const listStaff = [];
        for (const sta of tmp) {
            const tmpRole = await mRole.find(sta.role_id);
            if (tmpRole) {
                sta.role_name = tmpRole.name_role;
            } else {
                sta.role_name = 'Chưa phân quyền';
            }
            const tmp1 = {
                id: sta.id,
                role_id: sta.role_id,
                name: sta.name,
                mobile: sta.mobile,
                username: sta.username,
                email: sta.email,
                is_active: sta.is_active,
                role_name: sta.role_name
            }
            listStaff.push(tmp1);
        }
        return res.render('admin/staff/index', { listStaff: listStaff, message: message });
    }

    static create = async (req, res) => {
        const mRole = new role();

        const listRole = await mRole.getAll();
        // const list

        return res.render('admin/staff/create', { listRole: listRole });
    }

    static store = async (req, res) => {
        const data = req.body;

        const mStaff = new staff();

        // Kiểm tra username
        const check = await mStaff.findByUsername(data.username);
        if (check) {
            req.session.message = {
                mess: `Tên đăng nhập ${data.username} đã tồn tại`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/admin/staff.html');
            });
            return;
        }
        //kiểm tra email
        const checkEmail = await mStaff.findByEmail(data.email);
        if (checkEmail) {
            req.session.message = {
                mess: `Email ${data.email} đã tồn tại`,
                type: 'danger'
            };
            req.session.save(() => {
                res.redirect('/admin/staff.html');
            });
            return;
        }

        // mã hóa mật khẩu
        const password = '111';
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash;

        //thêm dữ liệu
        if (await mStaff.save(data)) {
            req.session.message = {
                mess: `Thêm nhân viên ${data.name} thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/staff.html');
            });
            return;
        }

        req.session.message = {
            mess: `Thêm nhân viên ${data.name} thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/staff.html');
        });
        return;

    }

    static edit = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // Khởi tạo
        const mRole = new role();
        const mStaff = new staff();

        // liệt kê role
        const listRole = await mRole.getAll();


        // lấy dữ liệu củ
        const sta = await mStaff.find(id);
        return res.render('admin/staff/edit', { staff: sta, listRole: listRole });
    }

    static update = async (req, res) => {
        const data = req.body;

        const mStaff = new staff();
        const oldData = await mStaff.find(data.id);
        // console.log(oldData);
        // console.log(data);

        if (data.username != oldData.username || data.email != oldData.email) {
            // kiểm tra username
            // console.log(await mStaff.findByUsername(data.username));
            if (data.username != oldData.username) {
                if (await mStaff.findByUsername(data.username)) {
                    req.session.message = {
                        mess: `Tên đăng nhập ${data.username} đã tồn tại`,
                        type: 'danger'
                    };
                    req.session.save(() => {
                        res.redirect('/admin/staff.html');
                    });
                    return;
                }
            }

            // console.log(await mStaff.findByEmail(data.email));
            // kiểm tra email
            if (data.email != oldData.email) {
                if (await mStaff.findByEmail(data.email)) {
                    req.session.message = {
                        mess: `gmail ${data.email} đã tồn tại`,
                        type: 'danger'
                    };
                    req.session.save(() => {
                        res.redirect('/admin/staff.html');
                    });
                    return;
                }
            }
        }

        const password = '111';
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash;


        // cập nhật dữ liệu
        if (await mStaff.update(data)) {
            req.session.message = {
                mess: `Cập nhật nhân viên ${data.name} thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/staff.html');
            });
            return;
        }

        req.session.message = {
            mess: `Cập nhật nhân viên ${data.name} thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/staff.html');
        });
    }

    static delete = async (req, res) => {
        const id = req.params.id;

        const mStaff = new staff();

        // xóa dữ liệu
        if (await mStaff.delete(id)) {
            req.session.message = {
                mess: `Xóa nhân viên thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/staff.html');
            });
            return;
        }

        req.session.message = {
            mess: `Xóa nhân viên thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/staff.html');
        });
    }
}

// Kiểm tra username
// mStaff.findByUsername(data.username).then(check => {
//     if (check) {
//         req.session.message = {
//             mess: `Tên đăng nhập ${data.username} đã tồn tại`,
//             type: 'danger'
//         };
//         req.session.save(() => {
//             res.redirect('/admin/staff.html');
//         });
//         return;
//     }
// });
// //kiểm tra email
// mStaff.findByEmail(data.email).then(checkEmail => {
//     if (checkEmail) {
//         req.session.message = {
//             mess: `Email ${data.email} đã tồn tại`,
//             type: 'danger'
//         };
//         req.session.save(() => {
//             res.redirect('/admin/staff.html');
//         });
//         return;
//     }
// });


module.exports = StaffController