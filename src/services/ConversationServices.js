const pool = require('../database/client');
const conversation = require('../models/conversation');

class ConversationServices {
    all = async (cond = null) => {
        let query = 'SELECT * FROM conversation';
        if (cond) {
            query += ` WHERE ${cond}`;
        }
        try {
            const [rows] = await pool.query(query);
            return rows.map(row => {
                return new conversation(
                    row.id,
                    row.customer_id,
                    row.created_at,
                    row.id_room,
                    row.is_read_customer,
                    row.is_read_admin
                );
            });
        } catch (error) {
            console.error('Error fetching conversations:', error);
            return [];
        }
    }

    find = async (id) => {
        const query = 'SELECT * FROM conversation WHERE id = ?';
        try {
            const [rows] = await pool.query(query, [id]);
            if (rows.length > 0) {
                const row = rows[0];
                return new conversation(
                    row.id,
                    row.customer_id,
                    row.created_at,
                    row.id_room,
                    row.is_read_customer,
                    row.is_read_admin
                );
            }
            return false;
        } catch (error) {
            console.error('Error finding conversation:', error);
            return false;
        }
    }

    update = async (conversationData) => {
        const query = 'UPDATE conversation SET is_read_customer = ?, is_read_admin = ? WHERE id = ?';
        try {
            const [result] = await pool.query(query, [
                // conversationData.customer_id,
                // conversationData.created_at,
                // conversationData.id_room,
                conversationData.is_read_customer,
                conversationData.is_read_admin,
                conversationData.id
            ]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating conversation:', error);
            return false;
        }
    }

    save = async (conversationData) => {
        const query = 'INSERT INTO conversation (customer_id, created_at, id_room, is_read_customer, is_read_admin) VALUES (?, ?, ?, ?  , ?)';
        try {
            const [result] = await pool.query(query, [conversationData.customer_id, conversationData.created_at, conversationData.id_room, conversationData.is_read_customer, conversationData.is_read_admin]);
            return new conversation(
                result.insertId,
                conversationData.customer_id,
                conversationData.created_at,
                conversationData.id_room,
                conversationData.is_read_customer,
                conversationData.is_read_admin
            );
        } catch (error) {
            console.error('Error saving conversation:', error);
            return false;
        }
    }


}

module.exports = new ConversationServices();