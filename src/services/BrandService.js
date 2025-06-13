const pool = require('../database/client');
const brand = require('../models/brand');

class BrandService {
    getAll = async (cond = null) => {
        let sql = `SELECT * FROM brand`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql);
            return result.map(row => {
                return new brand(row.id, row.name_brand);
            });
        } catch (err) {
            console.log(err);
            return [];
        }

    }

    save = async (data) => {
        const { name_brand } = data;

        try {
            const result = await pool.execute('INSERT INTO `brand` (name_brand) VALUES (?)', [name_brand]);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    destroy = async (id) => {
        try {
            const result = await pool.execute('DELETE FROM  `brand` WHERE `id` = ?', [id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    find = async (id) => {
        const cond = ` id = ${id}`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const brand = tmp[0];
        return brand;
    }

    update = async (data) => {
        const { id, name_brand } = data;
        try {
            const result = await pool.execute('UPDATE `brand` SET `name_brand` = ? WHERE `id` = ?', [name_brand, id]);

            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = BrandService;