const district = require('../models/district');
const pool = require('../database/client');
class DistrictService {
    getAll = async (cond = null) => {
        try {
            let query = `SELECT * FROM district`;

            if (cond) {
                query += cond;
            }
            // console.log(query);
            const [result, fields] = await pool.execute(query);
            return result.map(row => {
                return new district(
                    row.id,
                    row.name,
                    row.type,
                    row.province_id
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // tìm kiếm tất cả quận huyện với điều kiện
    find = async (id) => {
        const cond = ` WHERE id = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const districtItem = tmp[0];
        return districtItem;
    }

    findByProvinceID = async (id) => {
        const cond = ` WHERE \`province_id\` = '${id}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        // const districtItem = tmp[0];
        return tmp;
    }
}

module.exports = DistrictService;
