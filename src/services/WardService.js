const ward = require('../models/ward');
const pool = require('../database/client');
class WardService {
    getAll = async (cond = null) => {
        try {
            let query = `SELECT * FROM ward`;
            if (cond) {
                query += cond;
            }
            // console.log(query);
            const [result, fields] = await pool.execute(query);
            return result.map(row => {
                return new ward(
                    row.id,
                    row.name,
                    row.type,
                    row.district_id
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // tìm kiếm tất cả phường xã với điều kiện
    find = async (id) => {
        const cond = ` WHERE id = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const wardItem = tmp[0];
        return wardItem;
    }

    findByDistrictID = async (id) => {
        const cond = ` WHERE \`district_id\` = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        // const wardItem = tmp[0];
        return tmp;
    }


}

module.exports = WardService;
