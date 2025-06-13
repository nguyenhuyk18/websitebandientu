class brand_category {
    id_brand = null;
    id_category = null;
    name_category = null;
    name_brand = null;

    constructor(id_brand = null, id_category = null, name_category = null, name_brand = null) {
        this.id_brand = id_brand;
        this.id_category = id_category;
        this.name_category = name_category;
        this.name_brand = name_brand;
    }
}

module.exports = brand_category;