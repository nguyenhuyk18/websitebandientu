const pool = require('../database/client');
const staff = require('../models/staff');

class StaffService {
    getAll = async (cond = null) => {
        let sql = 'SELECT * FROM `staff`';
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [result, fields] = await pool.execute(sql);
            return result.map(row => {
                return new staff(
                    row.id,
                    row.role_id,
                    row.name,
                    row.mobile,
                    row.username,
                    row.password,
                    row.email,
                    row.is_active
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    save = async (data) => {
        // console.log(data);
        const sql = 'INSERT INTO `staff` (role_id, name, mobile, username, password, email, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await pool.execute(sql, [
                data.role_id,
                data.name,
                data.mobile,
                data.username,
                data.password,
                data.email,
                data.is_active
            ]);
            return result.insertId;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    update = async (data) => {
        const sql = 'UPDATE `staff` SET role_id = ?, name = ?, mobile = ?, username = ?, password = ?, email = ?, is_active = ? WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [
                data.role_id,
                data.name,
                data.mobile,
                data.username,
                data.password,
                data.email,
                data.is_active,
                data.id
            ]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    delete = async (id) => {
        const sql = 'DELETE FROM `staff` WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    find = async (id) => {
        const sql = 'SELECT * FROM `staff` WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [id]);
            if (result.length > 0) {
                const row = result[0];
                return new staff(
                    row.id,
                    row.role_id,
                    row.name,
                    row.mobile,
                    row.username,
                    row.password,
                    row.email,
                    row.is_active
                );
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    findByUsername = async (username) => {
        // console.log('Finding staff by username:', username);
        const sql = 'SELECT * FROM `staff` WHERE username = ?';
        try {
            const [result] = await pool.execute(sql, [username]);
            if (result.length > 0) {
                const row = result[0];
                return new staff(
                    row.id,
                    row.role_id,
                    row.name,
                    row.mobile,
                    row.username,
                    row.password,
                    row.email,
                    row.is_active
                );
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    findByEmail = async (email) => {
        const sql = 'SELECT * FROM `staff` WHERE email = ?';
        try {
            const [result] = await pool.execute(sql, [email]);
            if (result.length > 0) {
                const row = result[0];
                return new staff(
                    row.id,
                    row.role_id,
                    row.name,
                    row.mobile,
                    row.username,
                    row.password,
                    row.email,
                    row.is_active
                );
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

module.exports = StaffService