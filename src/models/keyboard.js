const product = require('./product');

class keyboard extends product {

    // id_brand = null;
    key_durability = null;
    weight = null;
    size = null;

    constructor(id = null,
        product_name = null,
        price = null,
        id_category = null,
        stock_quantity = null,
        description = null,
        id_brand = null,
        key_durability = null,
        weight = null,
        size = null, image = null, discount = null,
        discount_from_date = null,
        discount_to_date = null, name_brand = null, name_category = null, sale_price = null, is_delete = 1, created_date = null) {
        super(id, product_name, price, id_category, stock_quantity, description, discount, discount_from_date, discount_to_date, image, name_brand, name_category, sale_price, is_delete, created_date, id_brand);
        this.key_durability = key_durability;
        this.weight = weight;
        this.id_brand = id_brand;
        this.size = size;
    }
}

module.exports = keyboard