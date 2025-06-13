const action = require('../../services/ActionService');
const permission = require('../../services/PermissionService');
// const RoleService = require('../../services/RoleService');
const role = require('../../services/RoleService');

class PermissionController {
    static index = async (req, res) => {
        const id = req.params.id;

        const mAction = new action();
        const mPermission = new permission();
        const mRole = new role();

        const message = req.session.message;
        delete req.session.message;



        const rol = await mRole.find(id);
        if (!rol) {
            req.session.message = {
                mess: `Vai Trò Này Không Tồn Tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }


        const listAction = await mAction.getAll();
        const listPermission = await mPermission.findByRoleID(id);

        const id_action_of_role = []
        for (const tmp of listPermission) {
            id_action_of_role.push(tmp.action_id);
        }

        return res.render('admin/permission/index', { message: message, id_role: id, listAction: listAction, id_action_of_role: id_action_of_role });
    }

    static store = async (req, res) => {
        const data = req.body;
        const idrol = data.role_id;
        // console.log(data.role_id)
        // console.log(data);
        const mPermission = new permission();
        const mRole = new role();
        const id_action_new = [];

        // Khi user chỉ chọn 1 dữ liệu
        if (typeof data.action_id == 'string') {
            id_action_new.push(data.action_id);
        }
        // Khi user chọn nhiều dữ liệu
        else if (typeof data.action_id == 'object') {
            for (const tmp of data.action_id) {
                id_action_new.push(tmp);
            }
        }
        // Khi user không chọn dũ liệu nào
        else {
            id_action_new.push();
        }

        // tìm kiếm role 
        const rol = await mRole.find(data.role_id);

        // Xóa role trước khi thêm mới 
        if (!(await mPermission.deleteByRoleID(data.role_id))) {
            req.session.message = {
                mess: `Thêm quyền cho role ${rol.name_role} thất bại 1`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect(`/admin/permission.html/${rol.id}`);
            })
            return;
        }

        // bắt đầu thêm mới
        if (id_action_new.length) {
            for (const tmp1 of id_action_new) {
                const data1 = {
                    role_id: idrol,
                    action_id: tmp1
                }
                // console.log(tmp1)
                // console.log(data1);
                const rs = await mPermission.save(data1)
                // console.log(rs);
                if (rs == false) {
                    req.session.message = {
                        mess: `Thêm quyền cho role ${rol.name_role} thất bại 2`,
                        type: 'danger'
                    }
                    req.session.save(() => {
                        res.redirect(`/admin/permission.html/${rol.id}`);
                    })
                    return;
                }
            }
        }

        req.session.message = {
            mess: `Thêm quyền cho role ${rol.name_role} thành công`,
            type: 'success'
        }
        req.session.save(() => {
            res.redirect(`/admin/permission.html/${rol.id}`);
        })
        return;

    }
}

module.exports = PermissionController