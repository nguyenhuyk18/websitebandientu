class transport {
    id = null;
    province_id = null;
    price = null;

    constructor(id = null, province_id = null, price = null) {
        this.id = id;
        this.province_id = province_id;
        this.price = price;
    }
}

module.exports = transport;