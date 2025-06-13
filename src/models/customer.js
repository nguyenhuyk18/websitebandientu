class customer {
    id = null;
    name = null;
    phone = null;
    email = null;
    ward_id = null;
    created_date = null;
    status = null;
    housenumber_street = null;
    shipping_name = null;
    shipping_mobile = null;
    password = null;
    username = null;

    constructor(id = null, name = null, phone = null, email = null, ward_id = null, created_date = null, status = null, housenumber_street = null, shipping_name = null, shipping_mobile = null, password = null, username = null) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.ward_id = ward_id;
        this.created_date = created_date;
        this.status = status;
        this.housenumber_street = housenumber_street;
        this.shipping_name = shipping_name;
        this.shipping_mobile = shipping_mobile;
        this.password = password;
        this.username = username;
    }
}

module.exports = customer;