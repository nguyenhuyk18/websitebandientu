const role = require('../../services/RoleService');

class RoleController {
    static index = async (req, res) => {
        const mRole = new role();

        const listRole = await mRole.getAll();

        const message = req.session.message;
        delete req.session.message

        return res.render('admin/role/index', { listRole: listRole, message: message });
    }

    static create = (req, res) => {
        return res.render('admin/role/create');
    }

    static edit = async (req, res) => {
        const id = req.params.id;
        const mRole = new role();
        const oldData = await mRole.find(id);

        if (!oldData) {
            req.session.message = {
                mess: `Vai Trò Này Không Tồn Tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        return res.render('admin/role/edit', { role: oldData });
    }

    static store = async (req, res) => {
        const data = req.body;

        const mRole = new role();

        if (await mRole.save(data)) {
            req.session.message = {
                mess: `Thêm vai trò ${data.name_role} thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/role.html');
            });
            return;
        }

        req.session.message = {
            mess: `Thêm vai trò ${data.name_role} thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/role.html');
        });
    }


    static update = async (req, res) => {
        const data = req.body;

        const mRole = new role();
        const oldData = await mRole.find(data.id);

        if (await mRole.update(data)) {
            req.session.message = {
                mess: `cập nhật vai trò ${oldData.name_role} sang ${data.name_role} thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/role.html');
            });
            return;
        }

        req.session.message = {
            mess: `cập nhật vai trò ${oldData.name_role} sang ${data.name_role} thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/role.html');
        });
        return;
    }

    static delete = async (req, res) => {
        const id = req.params.id;

        // const mRole = new role();
        const mRole = new role();
        const oldData = await mRole.find(id);

        if (!oldData) {
            req.session.message = {
                mess: `Vai Trò Này Không Tồn Tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        if (await mRole.destroy(id)) {
            req.session.message = {
                mess: `Xóa vai trò ${oldData.name_role} thành công`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/role.html');
            });
            return;
        }
        req.session.message = {
            mess: `Xóa vai trò ${oldData.name_role} thất bại`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/role.html');
        });
        return;


    }
}

module.exports = RoleController;