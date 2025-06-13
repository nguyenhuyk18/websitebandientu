const status = require('../models/status');
const pool = require('../database/client');

class StatusService {
    getAll = async () => {
        try {
            const [result, fields] = await pool.execute('SELECT * FROM status');
            return result.map(row => {
                return new status(
                    row.id,
                    row.name,
                    row.description
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id) => {
        const cond = ` id = ${id}`;
        const tmp = await this.getAll(cond, null, null);
        if (tmp.length == 0) {
            return false;
        }
        const statusItem = tmp[0];
        return statusItem;
    }

}

module.exports = StatusService;