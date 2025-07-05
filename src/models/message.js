class message {
    constructor(conversation_id = null,
        sender_type = '',
        send_at = null,
        sender_id = null,
        mess = '',
        is_delete = 0) {
        this.conversation_id = conversation_id; // int
        this.sender_type = sender_type;         // varchar
        this.send_at = send_at;                 // datetime
        this.sender_id = sender_id;             // int
        this.mess = mess;                       // varchar
        this.is_delete = is_delete;

    }


}

module.exports = message;