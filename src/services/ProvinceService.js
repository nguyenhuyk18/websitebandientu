const province = require('../models/province');
const pool = require('../database/client');

class ProvinceService {
    getAll = async (cond = null) => {
        try {
            let query = `SELECT * FROM province`;
            if (cond) {
                query += cond;
            }
            const [result, fields] = await pool.execute(query);
            return result.map(row => {
                return new province(
                    row.id,
                    row.name,
                    row.type
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id) => {
        // console.log(id)
        const cond = ` WHERE  id = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const provinceItem = tmp[0];
        return provinceItem;
    }
}

module.exports = ProvinceService;