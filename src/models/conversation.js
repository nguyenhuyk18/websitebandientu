class conversation {
    constructor(id = null,
        customer_id = null,
        created_at = null,
        id_room = '',
        is_read_customer = null, // 1: đã đọc, 2: chưa đọc
        is_read_admin = null) {
        this.id = id;                         // int, khóa chính
        this.customer_id = customer_id;       // int
        this.created_at = created_at;         // datetime
        this.id_room = id_room;               // varchar
        this.is_read_customer = is_read_customer; // tinyint
        this.is_read_admin = is_read_admin;
    }
}

module.exports = conversation;