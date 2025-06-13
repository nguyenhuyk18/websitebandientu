class district {
    id = null;
    name = null;
    type = null;
    province_id = null;

    constructor(id = null, name = null, type = null, province_id = null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.province_id = province_id;
    }

}

module.exports = district;
