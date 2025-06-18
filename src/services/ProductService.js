const product = require('../models/product');
const pool = require('../database/client');


class ProductService {
    getAll = async (cond = null) => {
        let sql = `SELECT * FROM view_product`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new product(
                    row.id,
                    row.product_name,
                    row.price,
                    row.id_category,
                    row.stock_quantity,
                    row.description,
                    row.discount,
                    row.discount_from_date,
                    row.discount_to_date,
                    row.image,
                    null,
                    row.name_category,
                    row.sale_price
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    findByID = async (id) => {
        const sql = `SELECT
                    product.id,
                    product.product_name,
                    product.price,
                    product.id_category,
                    product.stock_quantity,
                    product.description,
                    product.image,
                    product.discount,
                    product.discount_from_date,
                    product.discount_to_date,
                    category.name_category,
                    product.is_delete,
                    ROUND(

                            IF(product.discount IS NULL || 
                                DATE(product.discount_from_date) > CURRENT_DATE || 
                                DATE(product.discount_to_date) < CURRENT_DATE , 
                                product.price, 
                            product.price * (1-discount/100)) , -3) AS sale_price
                    FROM
                    product
                    INNER JOIN category ON product.id_category = category.id
                    WHERE product.id = ?`;
        try {
            const [result, fields] = await pool.execute(sql, [id]);
            if (result.length > 0) {
                const row = result[0];
                return new product(
                    row.id,
                    row.product_name,
                    row.price,
                    row.id_category,
                    row.stock_quantity,
                    row.description,
                    row.discount,
                    row.discount_from_date,
                    row.discount_to_date,
                    row.image,
                    null, // Assuming brand is not needed here
                    row.name_category,
                    row.sale_price,
                    row.is_delete
                );
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }


    updateDiscount = async (discount, from_date, to_date, id) => {
        // console.log('hello');
        const sql = `UPDATE \`product\` 
                     SET discount = ?, 
                         discount_from_date = ?, 
                         discount_to_date = ? 
                     WHERE id = ?`;
        try {
            const [result, fields] = await pool.execute(sql, [discount, from_date, to_date, id]);
            // console.log(result, ' ', id);
            return true;
        } catch (err) {
            console.log('Lỗi SQL:', err.sqlMessage || err.message);;
            return false;
        }
    }
}

module.exports = ProductService