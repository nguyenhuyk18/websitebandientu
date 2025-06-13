class image_item {
    id = null;
    product_id = null;
    name_image = null;

    constructor(id = null, product_id = null, name_image = null) {
        this.id = id;
        this.product_id = product_id;
        this.name_image = name_image;
    }
}

module.exports = image_item