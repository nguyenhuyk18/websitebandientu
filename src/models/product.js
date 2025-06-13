class product {
    id = null;
    product_name = null;
    price = null;
    id_category = null;
    stock_quantity = null;
    description = null;
    image = null;
    discount = null;
    discount_from_date = null;
    discount_to_date = null;
    name_category = null;
    name_brand = null;
    sale_price = null;
    is_delete = null;
    created_date = null;

    id_brand = null;


    constructor(id = null,
        product_name = null,
        price = null,
        id_category = null,
        stock_quantity = null,
        description = null, discount = null,
        discount_from_date = null,
        discount_to_date = null, image = null, name_brand = null, name_category = null, sale_price = null, is_delete = 1, created_date = null, id_brand = null) {
        this.id_brand = id_brand;
        this.created_date = created_date;
        this.is_delete = is_delete;
        this.sale_price = sale_price;
        this.name_category = name_category;
        this.name_brand = name_brand;
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.id_category = id_category;
        this.stock_quantity = stock_quantity;
        this.description = description;
        this.image = image;
        this.discount = discount;
        this.discount_from_date = discount_from_date;
        this.discount_to_date = discount_to_date;
    }
}

module.exports = product;