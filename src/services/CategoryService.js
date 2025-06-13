const pool = require('../database/client');
const category = require('../models/category');

class CategoryService {
    getAll = async (cond = null) => {
        let sql = `SELECT * FROM \`category\``;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql);
            return result.map(row => {
                return new category(row.id, row.name_category);
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    save = async (data) => {
        const { name_category } = data;

        try {
            const result = await pool.execute("INSERT INTO `category` (name_category) VALUES (?) ", [name_category]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    destroy = async (id) => {
        try {
            const result = await pool.execute('DELETE FROM  `category` WHERE id = ?', [id]);
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
        const { id, name_category } = data;
        try {
            const result = await pool.execute('UPDATE `category` SET `name_category` = ? WHERE id = ?', [name_category, id]);

            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

}

module.exports = CategoryService;