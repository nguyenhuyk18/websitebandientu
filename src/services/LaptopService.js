const pool = require('../database/client');
const laptop = require('../models/laptop');
// const product = require('../models/product');

class LaptopService {
    getAll = async (cond = null, sort = null, limit = null) => {
        let sql = `SELECT * FROM view_laptop`;

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
                return new laptop(
                    row.id,
                    row.product_name,
                    row.price,
                    row.id_category,
                    row.stock_quantity,
                    row.description,
                    row.cpu,
                    row.ram,
                    row.graphics_card,
                    row.screen_size,
                    row.screen_solution,
                    row.operating_system,
                    row.weight,
                    row.release_year,
                    row.id_brand,
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
        // console.log(data);
        // return false;
        try {
            const [result] = await pool.execute('INSERT INTO `product` (`product_name` , `price` , `id_category` , `stock_quantity` , `description` , `image` , `discount` , `discount_from_date`,  `discount_to_date`, `is_delete` , `created_date` , `id_brand`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.is_delete, data.created_date, data.id_brand]);

            const idProduct = result.insertId;
            // console.log(idProduct);

            const [result1] = await pool.execute('INSERT INTO `laptop` (`id`,`cpu`,`ram`,`graphics_card`,`screen_size`,`screen_solution`,	`operating_system`,	`weight`,	`release_year`) VALUES (?,?,?,?,?,?,?,?,?)', [idProduct, data.cpu, data.ram, data.graphics_card, data.screen_size, data.screen_solution, data.operating_system, data.weight, data.release_year]);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    update = async (data) => {
        // console.log(data);
        // return false;
        try {
            const [result] = await pool.execute('UPDATE `product` SET `product_name` = ?, `price` = ?, `id_category` = ?, `stock_quantity` = ?, `description` = ?, `image` = ?, `discount` = ?, `discount_from_date` = ?, `discount_to_date` = ?, `id_brand` = ? WHERE id = ?', [data.product_name, data.price, data.id_category, data.stock_quantity, data.description, data.image, data.discount, data.discount_from_date, data.discount_to_date, data.id_brand, data.id]);
            if (result.affectedRows === 0) {
                return false; // No rows updated
            }

            const [result1] = await pool.execute('UPDATE `laptop` SET `cpu`=?,`ram`=?,`graphics_card`=?,`screen_size`=?,`screen_solution`=?,	`operating_system`=?,	`weight`=?,	`release_year`=? WHERE id=?', [data.cpu, data.ram, data.graphics_card, data.screen_size, data.screen_solution, data.operating_system, data.weight, data.release_year, data.id]);

            if (result1.affectedRows === 0) {
                return false; // No rows updated
            }

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    destroy = async (id) => {
        // console.log(id)
        try {
            const [result] = await pool.execute('UPDATE `product` SET `is_delete` = 0 WHERE id = ?', [id]);
            // const [result1] = await pool.execute('DELETE FROM `laptop` WHERE id = ?', [id]);
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

module.exports = LaptopService;