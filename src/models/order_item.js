const productAllModels = require('../services/ProductAllServices');

class order_item {
    id = null;
    product_id = null;
    order_id = null;
    qty = null;
    unit_price = null;
    total_price = null;

    constructor(id = null,
        product_id = null,
        order_id = null,
        qty = null,
        unit_price = null,
        total_price = null) {
        this.id = id;
        this.product_id = product_id;
        this.order_id = order_id;
        this.qty = qty;
        this.unit_price = unit_price;
        this.total_price = total_price;
    }

    getProductList = async () => {
        const mProduct = new productAllModels();
        return await mProduct.find(this.product_id);
    }
}

module.exports = order_item;