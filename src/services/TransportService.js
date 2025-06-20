const transport = require('../models/transport');
const pool = require('../database/client');

class TransportService {
    getAll = async (cond = null) => {
        let query = `SELECT * FROM transport`;
        if (cond) {
            query += `  ${cond}`;
        }
        try {
            // const query = ;
            const [result, fields] = await pool.execute(query);
            return result.map(row => {
                return new transport(
                    row.id,
                    row.province_id,
                    row.price
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    update = async (data) => {
        try {
            const [result] = await pool.execute('UPDATE transport SET price = ? WHERE id = ?', [data.price, data.id]);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }


    find = async (id) => {
        // console.log(id)
        const cond = ` WHERE id = ${id}`;
        const tmp = await this.getAll(cond, null, null);
        if (tmp.length == 0) {
            return false;
        }
        const transportItem = tmp[0];
        return transportItem;
    }

    findByProvince = async (id) => {
        // console.log(id);
        const cond = ` WHERE province_id = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const rs = tmp[0];
        return rs;
    }


}

module.exports = TransportService;