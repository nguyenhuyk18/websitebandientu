const role = require('../models/role');
const pool = require('../database/client');
class RoleService {
    getAll = async (cond = null) => {
        let sql = "SELECT * FROM `role`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new role(row.id, row.name_role);
            })
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id) => {
        const cond = `id = ${id}`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp[0];

    }


    save = async (data) => {
        try {
            const [result, fields] = await pool.execute('INSERT INTO `role` (name_role) VALUES (?)', [data.name_role]);
            return result.insertId;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    destroy = async (id) => {
        try {
            const [result, fields] = await pool.execute('DELETE FROM `role` WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    update = async (data) => {
        try {
            const [result, fields] = await pool.execute('UPDATE `role` SET name_role = ? WHERE id = ?', [data.name_role, data.id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

module.exports = RoleService;