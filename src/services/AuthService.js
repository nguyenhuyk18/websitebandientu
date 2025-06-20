const staff = require('../models/staff');
const pool = require('../database/client');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class AuthService {
    login = async (username, password) => {
        const sql = 'SELECT * FROM staff WHERE username = ?';
        try {
            const [rows] = await pool.execute(sql, [username]);
            if (rows.length > 0) {
                const user = rows[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return new staff(
                        user.id,
                        user.role_id,
                        user.name,
                        user.mobile,
                        user.username,
                        user.password,
                        user.email,
                        user.is_active
                    );
                }
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    findByUsername = async (username) => {
        const sql = 'SELECT * FROM staff WHERE username = ?';
        try {
            const [rows] = await pool.execute(sql, [username]);
            if (rows.length > 0) {
                const user = rows[0];
                return new staff(
                    user.id,
                    user.role_id,
                    user.name,
                    user.mobile,
                    user.username,
                    user.password,
                    user.email,
                    user.is_active
                );
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

module.exports = AuthService;