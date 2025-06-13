class ward {
    id = null;
    name = null;
    type = null;
    district_id = null;

    constructor(id = null, name = null, type = null, district_id = null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.district_id = district_id;
    }
}

module.exports = ward;