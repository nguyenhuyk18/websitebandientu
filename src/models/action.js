class action {
    id = null;
    name_action = null;
    description = null;

    constructor(id = null, name_action = null, description = null) {
        this.id = id;
        this.name_action = name_action;
        this.description = description;
    }
}

module.exports = action;
