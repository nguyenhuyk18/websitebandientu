const commentModels = require('../services/CommentService');
const imageItemModels = require('../services/ImageItemService');


class productall {
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
    name_brand = null;
    name_category = null;
    sale_price = null;
    is_delete = 1;
    created_date = null;
    id_brand = null;
    connection_type = null;
    led = null;
    warranty = null;
    color = null;
    weight_laptop = null;
    DPI = null;
    weight_mouse = null;
    weight_keyboard = null;
    key_durability = null;
    size = null;
    cpu = null;
    ram = null;
    graphics_card = null;
    screen_size = null;
    screen_solution = null;
    operating_system = null;
    release_year = null;




    constructor(id = null,
        product_name = null,
        price = null,
        id_category = null,
        stock_quantity = null,
        description = null,
        image = null,
        discount = null,
        discount_from_date = null,
        discount_to_date = null,
        name_brand = null,
        name_category = null,
        sale_price = null,
        is_delete = 1,
        created_date = null,
        id_brand = null,
        connection_type = null,
        led = null,
        warranty = null,
        color = null,
        weight_laptop = null,
        DPI = null,
        weight_mouse = null,
        weight_keyboard = null,
        key_durability = null,
        size = null,
        cpu = null,
        ram = null,
        graphics_card = null,
        screen_size = null,
        screen_solution = null,
        operating_system = null,
        release_year = null) {
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
        this.name_brand = name_brand;
        this.name_category = name_category;
        this.sale_price = sale_price;
        this.is_delete = is_delete;
        this.created_date = created_date;
        this.id_brand = id_brand;
        this.connection_type = connection_type;
        this.led = led;
        this.warranty = warranty;
        this.color = color;
        this.weight_laptop = weight_laptop;
        this.DPI = DPI;
        this.weight_mouse = weight_mouse;
        this.weight_keyboard = weight_keyboard;
        this.key_durability = key_durability;
        this.size = size;
        this.cpu = cpu;
        this.ram = ram;
        this.graphics_card = graphics_card;
        this.screen_size = screen_size;
        this.screen_solution = screen_solution;
        this.operating_system = operating_system;
        this.release_year = release_year;

    }

    getComments = async () => {
        const mComment = new commentModels();
        const listComment = await mComment.findByProductID(this.id);
        return listComment;
    }

    getImageItem = async () => {
        // const 
        const mImageItem = new imageItemModels();

        const listImageItem = await mImageItem.findImageItemByProductID(this.id);

        return listImageItem;
    }
}

module.exports = productall;