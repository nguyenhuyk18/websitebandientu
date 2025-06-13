const pool = require('../database/client');
const order = require('../models/order');


class OrderService {
    getAll = async (cond = null) => {
        let sql = `SELECT
                    \`order\`.id,
                    \`order\`.created_date,
                    \`order\`.order_status_id,
                    \`order\`.shipping_fullname,
                    \`order\`.shipping_mobile,
                    \`order\`.payment_method,
                    \`order\`.shipping_ward_id,
                    \`order\`.shipping_housenumber_street,
                    \`order\`.shipping_fee,
                    \`order\`.delivered_date,
                    \`order\`.staff_id,
                    \`order\`.customer_id,
                    customer.\`username\` as 'name_customer',
                    staff.\`name\` as 'name_staff',
                    \`status\`.\`description\` as 'name_order_status'
                    FROM
                    \`order\`
                    LEFT JOIN staff ON \`order\`.staff_id = \`staff\`.id
                    INNER JOIN customer ON \`order\`.customer_id = customer.id
                    INNER JOIN \`status\` ON \`order\`.order_status_id = \`status\`.id
                    `;

        if (cond) {
            sql += cond;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new order(
                    row.id,
                    row.created_date,
                    row.order_status_id,
                    row.shipping_fullname,
                    row.shipping_mobile,
                    row.payment_method,
                    row.shipping_ward_id,
                    row.shipping_housenumber_street,
                    row.shipping_fee,
                    row.delivered_date,
                    row.staff_id,
                    row.customer_id,
                    row.name_customer,
                    row.name_staff,
                    row.name_order_status
                )
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    update = async (data) => {
        // console.log(data);
        const sql = `UPDATE \`order\` SET 
            order_status_id = ?, 
            shipping_fullname = ?, 
            shipping_mobile = ?, 
            payment_method = ?, 
            shipping_ward_id = ?, 
            shipping_housenumber_street = ?, 
            shipping_fee = ?,
            staff_id = ?,
            customer_id = ?
            WHERE id = ?`;

        const values = [
            data.order_status_id,
            data.shipping_fullname,
            data.shipping_mobile,
            data.payment_method,
            data.shipping_ward_id,
            data.shipping_housenumber_street,
            data.shipping_fee,
            // data.delivered_date,
            data.staff_id,
            data.customer_id,
            data.id_order
        ];

        try {
            const [result] = await pool.execute(sql, values);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }


    save = async (data) => {
        const sql = `INSERT INTO \`order\` (
            created_date, 
            order_status_id, 
            shipping_fullname, 
            shipping_mobile, 
            payment_method, 
            shipping_ward_id, 
            shipping_housenumber_street, 
            shipping_fee,
            staff_id, 
            customer_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            data.created_date,
            data.order_status_id,
            data.shipping_fullname,
            data.shipping_mobile,
            data.payment_method,
            data.shipping_ward_id,
            data.shipping_housenumber_street,
            data.shipping_fee,
            // data.delivered_date,
            data.staff_id,
            data.customer_id
        ];

        try {
            const [result] = await pool.execute(sql, values);
            return result.insertId;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    destroy = async (id) => {
        try {
            const result = await pool.execute('DELETE FROM `order` WHERE id = ?', [id]);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    find = async (id) => {
        const cond = ` WHERE \`order\`.id = ${id}`;
        const tmp = await this.getAll(cond);
        if (!tmp.length) {
            return false;
        }
        return tmp[0];
    }

    findByCustomerID = async (id) => {
        const cond = ` WHERE \`order\`.customer_id = ${id}`;
        const tmp = await this.getAll(cond);
        if (!tmp.length) {
            return false;
        }
        return true;
    }


}

module.exports = OrderService;