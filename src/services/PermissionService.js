const permission = require('../models/permission');
const pool = require('../database/client');

class PermissionService {
    getAll = async (cond = null) => {
        let sql = "SELECT * FROM `action_role`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        // console.log(sql)
        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new permission(row.role_id, row.action_id);
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    findByRoleID = async (id_role) => {
        const cond = ` role_id = ${id_role}`;
        const tmp = await this.getAll(cond);
        // console.log(tmp)
        if (!tmp.length) {
            return [];
        }
        return tmp;
    }


    save = async (data) => {
        // console.log(data)
        // console.log(data);
        try {
            const [result, fields] = await pool.execute('INSERT INTO `action_role` (role_id, action_id) VALUES (?, ?)', [data.role_id, data.action_id]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    deleteByRoleID = async (id) => {
        try {
            const [result, fields] = await pool.execute('DELETE FROM `action_role` WHERE role_id = ?', [id]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

module.exports = PermissionService;
