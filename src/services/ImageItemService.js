const pool = require('../database/client');
const image_item = require('../models/image_item')

class ImageItemService {
    getAll = async (cond = null) => {
        let sql = "SELECT * FROM image_item";

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);

            return result.map(row => {
                return new image_item(row.id, row.product_id, row.name_image);
            });

        } catch (err) {
            console.error(err);
            return [];
        }

    }

    save = async (data) => {
        try {
            const result = await pool.execute("INSERT INTO `image_item` (`product_id`, `name_image`) VALUES (? , ?)", [data.product_id, data.name_image]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    destroy = async (id) => {
        try {
            const result = await pool.execute('DELETE FROM `image_item` WHERE id = ?', [id]);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    findImageItemByProductID = (id_product) => {
        const cond = ` product_id = ${id_product}`;
        const listProduct = this.getAll(cond);
        return listProduct;
    }

    findByID = async (id) => {
        const sql = "SELECT * FROM image_item WHERE id = ?";
        try {
            const [result, fields] = await pool.execute(sql, [id]);
            if (result.length > 0) {
                return new image_item(result[0].id, result[0].product_id, result[0].name_image);
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

module.exports = ImageItemService;