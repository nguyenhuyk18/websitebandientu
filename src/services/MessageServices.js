const pool = require('../database/client');
const message = require('../models/message');
class MessageServices {
    all = async (cond = null) => {
        let query = 'SELECT * FROM message';
        if (cond) {
            query += ` WHERE ${cond}`;
        }
        try {
            const [rows] = await pool.query(query);
            return rows.map(row => {
                return new message(
                    row.conversation_id,
                    row.sender_type,
                    row.send_at,
                    row.sender_id,
                    row.mess,
                    row.is_delete
                );
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    }

    save = async (messageData) => {
        const query = 'INSERT INTO message (conversation_id, sender_id, sender_type, send_at , mess, is_delete) VALUES (?, ?, ?, ? , ?, ?)';
        try {
            const [result] = await pool.query(query, [messageData.conversation_id, messageData.sender_id, messageData.sender_type, messageData.sent_at, messageData.mess, messageData.is_delete]);
            return new message(
                result.insertId,
                messageData.conversation_id,
                messageData.sender_id,
                messageData.sender_type,
                messageData.sent_at,
                messageData.mess,
                messageData.is_delete
            );
        } catch (error) {
            console.error('Error saving message:', error);
            return false;
        }
    }

}

module.exports = new MessageServices();
