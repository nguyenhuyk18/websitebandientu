const pool = require('../database/client');
const keyboard = require('../models/keyboard');
class KeyboardService {
    getAll = async (cond = null, sort = null, limit = null) => {
        let sql = `SELECT * FROM view_keyboard`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        if (sort) {
            sql += ` ORDER BY ${sort}`;
        }

        if (limit) {
            sql += ` LIMIT ${limit}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new keyboard(
                    row.id,
                    row.product_name,
                    row.price,
                    row.id_category,
                    row.stock_quantity,
                    row.description,
                    row.id_brand,
                    row.key_durability,
                    row.weight,
                    row.size,
                    row.image,
                    row.discount,
                    row.discount_from_date,
                    row.discount_to_date,
                    row.name_brand,
                    row.name_category,
                    row.sale_price
                );
            });
        }
        catch {
            return [];
        }
    }

    find = async (id) => {
        const cond = ` id = ${id}`;
        const tmp = await this.getAll(cond, null, null);
        if (tmp.length == 0) {
            return false;
        }
        const product = tmp[0];
        return product
    }

    save = async (data) => {
        try {
            const [result] = await pool.execute('INSERT INTO `product` (`product_name`, `price`, `id_category`, `stock_quantity`, `description`, `image`, `discount`, `discount_from_date`, `discount_to_date` , `is_delete` , `created_date` , `id_brand`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ?)',
                [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.is_delete, data.created_date, data.id_brand]);

            const idProduct = result.insertId;

            const [result1] = await pool.execute('INSERT INTO `keyboard` (`id`, `key_durability`, `weight`, `size`) VALUES (?, ?, ?, ?)',
                [idProduct, data.key_durability, data.weight, data.size]);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    update = async (data) => {
        try {
            const [result] = await pool.execute('UPDATE `product` SET `product_name` = ?, `price` = ?, `id_category` = ?, `stock_quantity` = ?, `description` = ?, `image` = ?, `discount` = ?, `discount_from_date` = ?, `discount_to_date` = ?, `id_brand` = ? WHERE id = ?',
                [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.id_brand, data.id]);

            const [result1] = await pool.execute('UPDATE `keyboard` SET  `key_durability` = ?, `weight` = ?, `size` = ? WHERE id = ?',
                [data.key_durability, data.weight, data.size, data.id]);
            if (result.affectedRows === 0 || result1.affectedRows === 0) {
                return false; // No rows updated
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    destroy = async (id) => {
        try {
            const [result] = await pool.execute('UPDATE `product` SET `is_delete` = 0 WHERE id = ?', [id]);
            // const [result1] = await pool.execute('DELETE FROM `keyboard` WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = KeyboardService