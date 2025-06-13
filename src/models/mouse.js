const product = require('./product');

class mouse extends product {
    connection_type = null;
    led = null;
    warranty = null;
    // id_brand = null;
    color = null;
    weight = null;
    DPI = null;



    constructor(
        id = null,
        product_name = null,
        price = 0,
        id_category = null,
        stock_quantity = 0,
        description = null,
        connection_type = null,
        led = null,
        warranty = null,
        id_brand = null,
        color = null,
        weight = null,
        DPI = null,
        image = null,
        discount = 0,
        discount_from_date = null,
        discount_to_date = null,
        name_brand = null,
        name_category = null,
        sale_price = 0,
        is_delete = 1,
        created_date = null
    ) {
        super(
            id,
            product_name,
            price,
            id_category,
            stock_quantity,
            description,
            discount,
            discount_from_date,
            discount_to_date,
            image,
            name_brand,
            name_category,
            sale_price,
            is_delete,
            created_date,
            id_brand
        );
        this.connection_type = connection_type;
        this.led = led;
        this.warranty = warranty;
        this.color = color;
        this.weight = weight;
        this.DPI = DPI;
        this.id_brand = id_brand;
    }
}

module.exports = mouse;