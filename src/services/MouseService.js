const pool = require('../database/client');
const mouse = require('../models/mouse');

class MouseService {
    getAll = async (cond = null, sort = null, limit = null) => {
        let sql = `SELECT * FROM view_mouse`;

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
            // console.log(result)
            return result.map(row => {
                return new mouse(
                    row.id,
                    row.product_name,
                    row.price,
                    row.id_category,
                    row.stock_quantity,
                    row.description,
                    row.connection_type,
                    row.led,
                    row.warranty,
                    row.id_brand,
                    row.color,
                    row.weight,
                    row.DPI,
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
            const [result] = await pool.execute('INSERT INTO `product` (`product_name`, `price`, `id_category`, `stock_quantity`, `description`, `image`, `discount`, `discount_from_date`, `discount_to_date` , `is_delete` , `created_date` , `id_brand`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ?)',
                [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.is_delete, data.created_date, data.id_brand]);

            const idProduct = result.insertId;

            await pool.execute('INSERT INTO `mouse` (`id`, `connection_type`, `led`, `warranty`, `color`, `weight`, `DPI`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [idProduct, data.connection_type, data.led, data.warranty, data.color, data.weight, data.DPI]);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    destroy = async (id) => {
        try {
            const [result] = await pool.execute('UPDATE `product` SET `is_delete` = 0 WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return false; // No rows deleted, product not found
            }
            // const [result1] = await pool.execute('DELETE FROM `mouse` WHERE id = ?', [id]);
            // if (result1.affectedRows === 0) {
            //     return false; // No rows deleted, mouse not found
            // }

            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    update = async (data) => {
        // console.log(data);
        try {
            const [result] = await pool.execute('UPDATE `product` SET `product_name` = ?, `price` = ?, `id_category` = ?, `stock_quantity` = ?, `description` = ?, `image` = ?, `discount` = ?, `discount_from_date` = ?, `discount_to_date` = ?, id_brand = ? WHERE id = ?',
                [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.id_brand, data.id]);

            if (result.affectedRows === 0) {
                return false; // No rows updated
            }

            const [result1] = await pool.execute('UPDATE `mouse` SET `connection_type` = ?, `led` = ?, `warranty` = ?, `color` = ?, `weight` = ?, `DPI` = ? WHERE id = ?',
                [data.connection_type, data.led, data.warranty, data.color, data.weight, data.DPI, data.id]);

            if (result1.affectedRows === 0) {
                return false; // No rows updated
            }

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = MouseService;

