class comment {
    id = null;
    product_id = null;
    email = null;
    fullname = null;
    star = null;
    created_date = null;
    description = null;
    name_product = null;

    constructor(id = null, product_id = null, email = null, fullname = null, star = null, created_date = null, description = null, name_product = null) {
        this.id = id;
        this.product_id = product_id;
        this.email = email;
        this.fullname = fullname;
        this.star = star;
        this.created_date = created_date;
        this.description = description;
        this.name_product = name_product;
    }

}

module.exports = comment;