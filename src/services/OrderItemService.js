const order_item = require('../models/order_item');
const pool = require('../database/client');
// const order = require('../models/order');
class OrderItemService {
    save = async (data) => {
        // console.log(data)
        const sql = `INSERT INTO order_item (
            order_id, 
            product_id, 
            qty, 
            unit_price,
            total_price
        ) VALUES (?, ?, ?, ?, ?)`;

        const values = [
            data.order_id,
            data.product_id,
            data.qty,
            data.unit_price,
            data.total_price
        ];

        console.log('values', values);

        try {
            const [result, fields] = await pool.execute(sql, values);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    deleteOrderItem = async (id_order) => {
        try {
            // console.log(id_order);
            // return true;
            const [result, fields] = await pool.execute('DELETE FROM `order_item` WHERE `order_id` = ?', [id_order]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    findByOrderID = async (id) => {
        try {
            const [result, fields] = await pool.execute('SELECT * FROM `order_item` WHERE order_id = ?', [id]);
            return result.map((row) => {
                return new order_item(
                    row.id,
                    row.product_id,
                    row.order_id,
                    row.qty,
                    row.unit_price,
                    row.total_price
                )
            });
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = OrderItemService