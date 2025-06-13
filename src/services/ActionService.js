const action = require('../models/action');
const pool = require('../database/client');
class ActionService {
    getAll = async (cond = null) => {
        let sql = "SELECT * FROM `action`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new action(row.id, row.name_action, row.description);
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id) => {
        const sql = "SELECT * FROM `action` WHERE id = ?";
        try {
            const [result, fields] = await pool.execute(sql, [id]);
            if (result.length > 0) {
                return new action(result[0].id, result[0].name_action, result[0].description);
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

module.exports = ActionService