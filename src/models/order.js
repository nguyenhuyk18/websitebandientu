const orderItemModels = require('../services/OrderItemService');
class order {
    id = null;
    created_date = null;
    order_status_id = null;
    shipping_fullname = null;
    shipping_mobile = null;
    payment_method = null;
    shipping_ward_id = null;
    shipping_housenumber_street = null;
    shipping_fee = null;
    delivered_date = null;
    staff_id = null;
    customer_id = null;
    name_customer = null;
    name_staff = null;
    name_order_status = null;

    constructor(id = null, created_date = null, order_status_id = null, shipping_fullname = null, shipping_mobile = null, payment_method = null, shipping_ward_id = null, shipping_housenumber_street = null, shipping_fee = null, delivered_date = null, staff_id = null, customer_id = null, name_customer = null, name_staff = null, name_order_status = null) {
        this.id = id;
        this.created_date = created_date;
        this.order_status_id = order_status_id;
        this.shipping_fullname = shipping_fullname;
        this.shipping_mobile = shipping_mobile;
        this.payment_method = payment_method;
        this.shipping_ward_id = shipping_ward_id;
        this.shipping_housenumber_street = shipping_housenumber_street;
        this.shipping_fee = shipping_fee;
        this.delivered_date = delivered_date;
        this.staff_id = staff_id;
        this.customer_id = customer_id;
        this.name_customer = name_customer;
        this.name_staff = name_staff;
        this.name_order_status = name_order_status;

    }


    getOrderItem = async () => {
        const mOrderItemModels = new orderItemModels();
        return await mOrderItemModels.findByOrderID(this.id);
    }

}

module.exports = order