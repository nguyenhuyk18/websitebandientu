const product = require('./product');

class laptop extends product {
    cpu = null;
    ram = null;
    graphics_card = null;
    screen_size = null;
    screen_solution = null;
    operating_system = null;
    weight = null;
    release_year = null;
    // id_brand = null;

    constructor(id = null,
        product_name = null,
        price = null,
        id_category = null,
        stock_quantity = null,
        description = null,
        cpu = null,
        ram = null,
        graphics_card = null,
        screen_size = null,
        screen_solution = null,
        operating_system = null,
        weight = null,
        release_year = null,
        id_brand = null, image = null,
        discount = null,
        discount_from_date = null,
        discount_to_date = null, name_brand = null, name_category = null, sale_price = null, is_delete = 1, created_date = null
    ) {
        super(id, product_name, price, id_category, stock_quantity, description, discount, discount_from_date, discount_to_date, image, name_brand, name_category, sale_price, is_delete, created_date, id_brand);
        this.id_brand = id_brand;
        this.cpu = cpu;
        this.ram = ram;
        this.graphics_card = graphics_card;
        this.screen_size = screen_size;
        this.screen_solution = screen_solution;
        this.operating_system = operating_system;
        this.weight = weight;
        this.release_year = release_year;
    }
}

module.exports = laptop;